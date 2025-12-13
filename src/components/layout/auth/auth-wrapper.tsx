import React from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-2/4 h-full flex justify-center items-center flex-col gap-8">
      {children}
    </div>
  );
}
