"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none m-0 pt-5">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuSeparator />
        <Link href="/dashboard/account/profile">
          <DropdownMenuItem className="p-4">Account</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="p-4 text-red-600"
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
