"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
export default function BarLink({
  children,
  href,
  name,
}: {
  children: React.ReactNode;
  href: string;
  name?: string;
}) {
  const pathname = usePathname();

  const home = name === "home" && pathname.startsWith("/dashboard/exams");
  const firstTwoSeg = pathname.split("/").slice(1, 3).join("/");
  const hrefFirstTwoSeg = href.split("/").slice(1, 3).join("/");

  return (
    <Link href={href}>
      <Button
        variant="outline"
        className={`flex bg-!none  hover:bg-blue-100 hover:text-blue-700 items-center justify-start gap-3 w-full py-6 border border-blue-50 text-lg text-gray-500 hover:border hover:border-blue-500 ${
          firstTwoSeg === hrefFirstTwoSeg || home
            ? "text-blue-700 bg-blue-100 border-blue-500"
            : ""
        }`}
      >
        {children}
      </Button>
    </Link>
  );
}
