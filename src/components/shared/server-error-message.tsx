import { CircleX } from "lucide-react";
import React from "react";

export default function ServerErrorMessage({ message }: { message: string }) {
  return (
    <span className="w-full py-2.5 flex flex-col justify-center items-center relative bg-red-50 text-red-600 border border-red-600 px-4 text-center">
      <CircleX className=" absolute -top-3 bg-white" />
      {message}
    </span>
  );
}
