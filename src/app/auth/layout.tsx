import React from "react";
import AuthIntro from "@/components/layout/auth/auth-intro";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white items-center">
      <AuthIntro />
      {children}
    </div>
  );
}
