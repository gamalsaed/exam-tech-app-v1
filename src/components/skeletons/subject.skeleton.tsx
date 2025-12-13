import React from "react";
import Image from "next/image";
import Link from "next/link";

type SubjectType = {
  _id?: string;
  name: string;
  icon: string;
  createdAt?: string;
};
export default function Subject({ name, icon, _id }: SubjectType) {
  return (
    <Link href={`/dashboard/exams?id=${_id}`}>
      <div className="relative h-[580px]">
        <Image
          src={icon}
          alt={name}
          width={336}
          height={580}
          className="object-cover h-full w-96"
        />
        <div className="absolute bottom-0 w-full p-2.5">
          <div className="text-2xl text-white font-mono  text-start px-4 py-5   bg-[#155DFC80]">
            {name}
          </div>
        </div>
      </div>
    </Link>
  );
}
