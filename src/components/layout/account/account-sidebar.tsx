import React from "react";
import AccountLink from "./account-link";
import { CircleUserRound, Lock } from "lucide-react";
import Logout from "./logout";
export default function AccountSideBar() {
  return (
    <div className="p-6 bg-white w-96 h-full max-lg:w-full max-lg:h-fit flex flex-col max-sm:flex-col max-sm:gap-2.5 justify-between max-lg:flex-row">
      <div className="flex flex-col gap-2.5 max-lg:flex-row ">
        <AccountLink href="/dashboard/account/profile">
          <CircleUserRound width={24} height={24} />
          <span>Profile</span>
        </AccountLink>
        <AccountLink href="/dashboard/account/change-password">
          <Lock />
          <span>Change Password</span>
        </AccountLink>
      </div>
      <Logout />
    </div>
  );
}
