"use client";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  BookOpenCheck,
  CircleQuestionMark,
  UserRound,
  ChevronLeft,
} from "lucide-react";

// All Paths
const paths = {
  dashboard: {
    title: "Diplomas",
    image: GraduationCap,
  },
  exams: {
    title: "Exams",
    image: BookOpenCheck,
  },
  questions: {
    title: "Questions",
    image: CircleQuestionMark,
    exam: "",
  },
  account: {
    title: "Account Settings",
    image: UserRound,
  },
  result: {
    title: "Exams",
    image: BookOpenCheck,
  },
};

type PathKeys = keyof typeof paths;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  let pathArray = pathname.split("/").slice(1);
  let key = pathArray[pathArray.length - 1] as PathKeys;

  if (pathArray[pathArray.length - 1] === "questions") {
    paths.questions.exam = pathArray[pathArray.length - 2].split("-").join(" ");
  }

  if (pathArray[1] === "account") key = "account";

  if (!paths[key]) {
    notFound();
  }

  const Icon = paths[key].image;
  pathArray[0] = "home";

  const backSteps = pathArray[pathArray.length - 1] === "questions" ? 2 : 1;
  function prevPath() {
    if (pathArray[1] === "account") {
      router.push(`/dashboard`);
    } else {
      router.push(
        `/dashboard/${pathArray
          .slice(1, pathArray.length - backSteps)
          .join("/")}`
      );
    }
  }

  return (
    <header>
      <div className="py-4 pl-4 bg-white text-gray-400 flex gap-5">
        <SidebarTrigger className=" md:hidden" />
        <div>
          {pathArray.map((item, i) => {
            return (
              <span key={item} className="capitalize">
                {" "}
                {i !== 0 && " / "} {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2.5 items-center px-6 pt-6">
        <div
          onClick={prevPath}
          className={`bg-white transition-colors border cursor-pointer hover:bg-blue-50 border-blue-600 flex-2 text-3xl text-blue-600 font-light flex gap-3 items-center py-5 ${
            pathArray.length === 1 && "hidden"
          }`}
        >
          <ChevronLeft strokeWidth={1} width={35} height={45} />
        </div>
        <div className="text-white pl-4 flex-1 text-3xl bg-blue-600 font-semibold flex gap-3 items-center py-5">
          <Icon width={45} height={45} />
          <span>
            {key === "questions" && <span>[{paths[key].exam}] </span>}
            <span>{paths[key].title}</span>
          </span>
        </div>
      </div>
    </header>
  );
}
