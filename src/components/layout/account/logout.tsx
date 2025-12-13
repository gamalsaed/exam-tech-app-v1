"use client";
import { LogOut } from "lucide-react";
import React from "react";
import { signOut } from "next-auth/react";
export default function Logout() {
  return (
    <div
      className="w-full max-lg:h-fit max-lg:w-fit py-2.5 px-4 bg-red-50 text-red-600 cursor-pointer flex gap-2.5"
      onClick={() => signOut()}
    >
      <LogOut />
      <span>Logout</span>
    </div>
  );
}
