"use client";

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema } from "@/lib/schemes/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { ChangePasswordInfo } from "@/lib/types/data";
import { changePasswordService } from "@/lib/services/account";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
export default function page() {
  const { update } = useSession();
  const { toast } = useToast();
  const { register, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  // Form Handler
  const submitHandler: SubmitHandler<ChangePasswordInfo> = async (value) => {
    setServerError(null);
    const res = await changePasswordService(value);
    if ("code" in res) {
      setServerError(res.message);
    }
    if ("token" in res) {
      reset();
      toast({
        variant: "success",
        description: "Your password has been updated.",
      });
      update({
        accessToken: res.token,
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={handleSubmit(submitHandler)}
    >
      <PasswordInput
        label="Current Password"
        {...register("oldPassword")}
        errorMessage={formState.errors.oldPassword?.message}
      />
      <div>
        <PasswordInput
          className="mb-4"
          label="New Password"
          {...register("password")}
          errorMessage={formState.errors.password?.message}
        />
        <PasswordInput
          label="Confirm New Password"
          {...register("rePassword")}
          errorMessage={formState.errors.rePassword?.message}
        />
      </div>
      {serverError && <ServerErrorMessage message={serverError} />}
      <Button disabled={formState.isSubmitting} className="w-full mt-8">
        {formState.isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
