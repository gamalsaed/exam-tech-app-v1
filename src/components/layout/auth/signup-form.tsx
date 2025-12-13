"use client";
import React, { useState } from "react";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CustomInput from "@/components/shared/custom-input";
import PasswordInput from "@/components/shared/password-input";
import { PhoneInput } from "@/components/shared/phone-input";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/lib/actions/auth-action";
import { signUpSchema } from "@/lib/schemes/zod.schema";
import ServerErrorMessage from "@/components/shared/server-error-message";

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string>();
  const { toast } = useToast();
  const router = useRouter();

  type SignUpInputs = z.infer<typeof signUpSchema>;

  const { register, handleSubmit, control, formState } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  // Form Handler
  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const result = await signUpAction(data);

    if (result.message.includes("required pattern")) {
      setServerError(
        "Your password must include any special char like ( @, #, $ ) and capital letter"
      );
    }

    if (!result.success) {
      setServerError(result.message);
    }

    if (result.success) {
      toast({
        variant: "success",
        description: "Your account has been created Successfully",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3/5 w- flex flex-col gap-4"
    >
      <h1 className="font-bold text-3xl">Create Account</h1>
      <div className="flex gap-2.5">
        <div className="w-full">
          <CustomInput
            placeholder="Gamal"
            label="First name"
            {...register("firstName")}
            type="text"
            errorMessage={formState.errors?.firstName?.message || undefined}
          />
        </div>
        <div className="w-full">
          <CustomInput
            placeholder="Saed"
            label="Last name"
            {...register("lastName")}
            type="text"
            errorMessage={formState.errors?.lastName?.message || undefined}
          />
        </div>
      </div>

      <CustomInput
        placeholder="user123"
        label="Username"
        {...register("username")}
        type="text"
        errorMessage={formState.errors?.username?.message || undefined}
      />

      <CustomInput
        placeholder="user@example.com"
        label="Email"
        {...register("email")}
        type="email"
        errorMessage={formState.errors?.email?.message || undefined}
      />

      <Controller
        name="phone"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            errorMessage={formState.errors?.phone?.message || undefined}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            defaultCountry="EG"
            placeholder="Enter phone number"
          />
        )}
      />

      <PasswordInput
        label="Password"
        {...register("password")}
        errorMessage={formState.errors.password?.message || undefined}
      />

      <PasswordInput
        label="Confirm Password"
        {...register("rePassword")}
        errorMessage={formState.errors.rePassword?.message || undefined}
      />

      {serverError && <ServerErrorMessage message={serverError} />}
      <Button disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Submitting..." : "Create Account"}
      </Button>
    </form>
  );
}
