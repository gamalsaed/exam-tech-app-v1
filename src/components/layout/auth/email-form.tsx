"use client";

import React from "react";
import CustomInput from "@/components/shared/custom-input";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { forgetPasswordAction } from "@/lib/actions/auth-action";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/lib/schemes/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
export default function EmailForm({
  error,
  email,
}: {
  error?: string;
  email?: string;
}) {
  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(emailSchema),
  });
  
  // Form Hnadler
  const submitHandler = async (data: { email: string }) => {
    await forgetPasswordAction(data.email);
  };

  return (
    <div className="w-2/4 h-full flex justify-center items-center flex-col gap-8 max-md:w-full">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-3/5 w- flex flex-col gap-4"
      >
        <h1 className="font-bold text-3xl">Forgot Password</h1>
        <p className="text-gray-700 font-mono">
          Don’t worry, we will help you recover your account.
        </p>
        <CustomInput
          placeholder="user@example.com"
          label="Email"
          {...register("email")}
          type="email"
          defaultValue={email ? email : ""}
          errorMessage={formState.errors.email?.message}
        />
        {error && <ServerErrorMessage message={error || ""} />}
        <Button disabled={formState.isSubmitting}>
          Continue <MoveRight />
        </Button>
      </form>
      <p className="font-mono">
        Don’t have an account?{" "}
        <Link href="signup" className="text-blue-600">
          Create yours
        </Link>
      </p>
    </div>
  );
}
