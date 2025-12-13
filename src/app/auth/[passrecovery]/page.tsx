import React from "react";
import EmailForm from "@/components/layout/auth/email-form";
import Verification from "@/components/layout/auth/verification";
import ResetPassword from "@/components/layout/auth/reset-password";
import { notFound } from "next/navigation";

type ForgetPasswordProps = {
  searchParams?: {
    error?: string;
    email?: string;
  };
  params: { passrecovery: string };
};

export default function page({ params, searchParams }: ForgetPasswordProps) {
  const param = params.passrecovery;

  // First Step
  if (param === "forget-password") {
    return (
      <EmailForm error={searchParams?.error} email={searchParams?.email} />
    );
  }

  // 2nd Step
  if (param === "verification") {
    return <Verification data={{ ...searchParams }} />;
  }

  // 3rd step
  if (param === "reset-password") {
    return <ResetPassword email={searchParams?.email} />;
  }

  return notFound();
}
