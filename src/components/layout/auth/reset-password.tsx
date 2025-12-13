"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PasswordInput from "@/components/shared/password-input";
import { resetPasswordAction } from "@/lib/actions/auth-action";
import { useForm } from "react-hook-form";
import { newPasswordAuthSchema } from "@/lib/schemes/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type ResetProps = {
  email?: string;
};
type FormType = z.infer<typeof newPasswordAuthSchema>;

export default function ResetPassword({ email }: ResetProps) {
  const { register, formState, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(newPasswordAuthSchema),
  });

  const submitHandler = async (data: FormType) => {
    await resetPasswordAction({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-2/4 h-full flex justify-center items-center flex-col gap-8 max-md:w-full">
      <form
        className="w-3/5 w- flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="font-bold text-3xl">Create a New Password</h1>
        <p className="text-gray-700 font-mono">
          Create a new strong password for your account.
        </p>
        <input
          type="text"
          className="hidden"
          {...register("email")}
          defaultValue={email}
        />
        <PasswordInput
          placeholder="********"
          label="New Password"
          {...register("password")}
          errorMessage={formState.errors.password?.message}
        />
        <PasswordInput
          placeholder="********"
          label="Confirm New Password"
          {...register("rePassword")}
          errorMessage={formState.errors.rePassword?.message}
        />
        <Button disabled={formState.isSubmitting}>Reset Password</Button>
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
