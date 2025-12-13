import Image from "next/image";
import { GraduationCap, UserRound } from "lucide-react";

import BarLink from "./bar-link";
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { type LoginResponse } from "@/lib/types/auth";
import DropDownMenu from "./drop-down-menu";
export default async function SideBar() {
  const session: LoginResponse | null = await getServerSession(authOption);
  return (
    <Sidebar>
      <SidebarContent className="bg-blue-50">
        <aside className=" bg-blue-50  p-10 ">
          <Image
            className="mb-2.5"
            src="/assets/images/Logo.svg"
            width={192}
            height={37}
            alt="LOGO"
          />
          <div className="font-semibold text-xl text-blue-600 flex mb-16 items-center gap-2.5">
            <Image
              src="/assets/icons/folder-code.svg"
              width={35}
              height={35}
              alt="LOGO"
            />
            Exam App
          </div>
          <div className="font-mono w-full flex flex-col gap-2.5">
            <BarLink href="/dashboard" name="home">
              <GraduationCap />
              <span>Diplomas</span>
            </BarLink>
            <BarLink href="/dashboard/account/profile">
              <UserRound />
              <span>Account Settings</span>
            </BarLink>
          </div>
          <div className=" absolute bottom-10 font-mono flex items-center gap-2.5">
            <Image
              src="/assets/images/Avatar.svg"
              width={54}
              height={54}
              alt="profile photo"
            />
            <div>
              <p className="text-blue-600 text-base font-medium">
                {session?.user?.firstName}
              </p>
              <p>{session?.user?.email}</p>
            </div>
            <DropDownMenu />
          </div>
        </aside>
      </SidebarContent>
    </Sidebar>
  );
}
