"use client";

// UI Component

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type LinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function AccountLink({ children, href }: LinkProps) {
  const pathname = usePathname().split("/").slice(2).join("/");
  const path = href.split("/").slice(2).join("/");
  return (
    <Link
      href={href}
      className={`text-gray-500 max-lg:h-fit max-lg:w-fit flex gap-2.5 items-center text-base px-4 py-2.5  transition-colors duration-200 ${
        pathname === path && "bg-blue-50 !text-blue-600"
      } ${pathname !== path && "hover:bg-gray-50"}`}
    >
      {children}
    </Link>
  );
}
