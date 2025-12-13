"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { verificationAction } from "@/lib/actions/auth-action";
import Link from "next/link";
import VerifyTimer from "@/components/features/verify-timer";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetCodeSchema } from "@/lib/schemes/zod.schema";
import ValidationError from "@/components/shared/validation-error";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { type verificationApi } from "@/lib/types/auth";
type VerifyProps = {
  data: {
    error?: string;
    email?: string;
  };
};

export default function Verification({ data }: VerifyProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(resetCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  // Reset Code Handler
  const submitHnadler = async (data: { code: string }) => {
    const res: verificationApi = await verificationAction(data.code);
    if (res) {
      setServerError(res.message);
    }
  };

  return (
    <div className="w-2/4 h-full flex justify-center items-center flex-col gap-8 max-md:w-full">
      <form
        className="w-3/5 w- flex flex-col gap-4"
        onSubmit={handleSubmit(submitHnadler)}
      >
        <Link
          href="/auth/forget-password"
          className="border-2 border-gray-200 w-fit p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
        >
          <MoveLeft />
        </Link>
        <h1 className="font-bold text-3xl">Verify OTP</h1>
        <p className="text-gray-700 font-mono">
          Please enter the 6-digits code we have sent to: {data.email}.{" "}
          <Link
            className="text-blue-600 hover:underline"
            href={`/auth/forget-password?email=${data.email}`}
          >
            Edit
          </Link>
        </p>

        {/* OTP Input Controller */}
        <Controller
          control={control}
          name="code"
          render={({ field }) => {
            return (
              <InputOTP
                value={field.value || ""}
                onChange={field.onChange}
                maxLength={6}
                autoFocus={true}
                autoComplete="one-time-code"
              >
                <InputOTPGroup className="w-full flex gap-2 justify-center my-10">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            );
          }}
        />

        {/* Error */}
        <div className="w-full mx-auto flex justify-center">
          {formState.errors.code && (
            <ValidationError message={formState.errors.code.message} />
          )}
        </div>

        {/* The Timer */}
        <VerifyTimer />

        {serverError && <ServerErrorMessage message={serverError} />}
        <Button disabled={formState.isSubmitting}>Verify Code</Button>
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
