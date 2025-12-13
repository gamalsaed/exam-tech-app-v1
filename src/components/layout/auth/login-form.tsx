"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/shared/custom-input";
import PasswordInput from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { LoginSchema } from "@/lib/schemes/zod.schema";
import { signIn } from "next-auth/react";
import ServerErrorMessage from "@/components/shared/server-error-message";
import ValidationError from "@/components/shared/validation-error";
export default function LoginForm() {
  const [serverError, setServerError] = useState<string>();

  type LoginInputs = z.infer<typeof LoginSchema>;

  const { register, handleSubmit, formState } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });

  // Form Hnadler
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.ok) {
      window.location.reload();
    } else {
      setServerError("Invalid email or password");
    }
  };

  return (
    <form
      className="w-3/5 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-3xl">Login</h1>
      <CustomInput
        placeholder="user@example.com"
        label="Email"
        type="text"
        errorMessage={
          formState.errors.email ? formState.errors.email.message : undefined
        }
        {...register("email")}
      />
      <PasswordInput
        label="Password"
        error={formState.errors.password ? true : false}
        {...register("password")}
      />

      <Link href="forget-password" className="text-right text-blue-600">
        Forgot your password?
      </Link>
      {serverError && <ServerErrorMessage message={serverError} />}

      <Button disabled={formState.isSubmitting}>Login</Button>
    </form>
  );
}
