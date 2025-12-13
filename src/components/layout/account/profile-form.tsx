"use client";

import React, { useState, useEffect } from "react";
import CustomInput from "@/components/shared/custom-input";
import { PhoneInput } from "@/components/shared/phone-input";
import { Button } from "@/components/ui/button";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { UserInfo } from "@/lib/types/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDirtyFieldsValues } from "@/lib/utils/utils.fn";
import { updateProfileAction } from "@/lib/actions/auth-action";
import z from "zod";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { DeleteDialog } from "./delete-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/components/providers/react-query.provider";
import { deleteAccount } from "@/lib/services/account";
import { signOut } from "next-auth/react";
import { userInfoSchema } from "@/lib/schemes/zod.schema";
import { useToast } from "@/hooks/use-toast";
import { getUserService } from "@/lib/services/account";

type UserInfoInputs = z.infer<typeof userInfoSchema>;

export default function ProfileForm() {
  const [serverError, setServerError] = useState<string>();
  const { toast } = useToast();

  // Get User Info
  const { data, error: userError } = useQuery({
    queryKey: ["userinfo"],
    queryFn: getUserService,
  });

  // Delete Account
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      signOut();
    },
  });

  // Form Controller (React Hook Form)
  const { register, control, formState, handleSubmit, reset } =
    useForm<UserInfoInputs>({
      resolver: zodResolver(userInfoSchema),
    });

  // Form Handler
  const submitHandler: SubmitHandler<UserInfo> = async (value) => {
    const dirtyValues = getDirtyFieldsValues(value, formState.dirtyFields);
    const result = await updateProfileAction(dirtyValues);
    if (!result.success) {
      setServerError(result?.message);
    }
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["userinfo"] });
      reset({ ...data.user, phone: `+2${data.user.phone}` });
      toast({
        variant: "success",
        description: "Your Info has been updated.",
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset({ ...data.user, phone: `+2${data.user.phone}` });
    }
  }, [data]);

  return (
    <form
      className="text-base font-semibold text-gray-800 flex flex-col gap-4"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex gap-2.5">
        <CustomInput
          label="First name"
          {...register("firstName")}
          type="text"
          errorMessage={formState.errors?.firstName?.message || undefined}
        />

        <CustomInput
          label="Last name"
          {...register("lastName")}
          type="text"
          errorMessage={formState.errors?.lastName?.message || undefined}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <CustomInput
          label="Username"
          {...register("username")}
          type="text"
          errorMessage={formState.errors?.username?.message || undefined}
        />
        <CustomInput
          label="Email"
          {...register("email")}
          type="email"
          errorMessage={formState.errors?.email?.message || undefined}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              defaultCountry="EG"
              value={field.value}
              onChange={field.onChange}
              errorMessage={formState.errors.phone?.message || undefined}
            />
          )}
        />
      </div>
      <div className="my-5">
        {serverError && <ServerErrorMessage message={serverError} />}
        {userError && <ServerErrorMessage message={userError.message} />}
      </div>
      <div className="w-full flex gap-4 ">
        <DeleteDialog
          isPending={isPending}
          deleteFn={mutate}
          errorMessage={isError ? { code: 401, message: error.message } : null}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!formState.isDirty || formState.isSubmitting}
        >
          {formState.isSubmitting ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
