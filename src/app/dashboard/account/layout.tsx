"use client";
import React from "react";
import AccountSideBar from "@/components/layout/account/account-sidebar";
import { SessionProvider } from "next-auth/react";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-lg:flex-col h-[76vh] font-mono gap-6">
      <AccountSideBar />
      <SessionProvider>
        <div className="h-full flex-grow bg-white p-6">{children}</div>
      </SessionProvider>
    </div>
  );
}
