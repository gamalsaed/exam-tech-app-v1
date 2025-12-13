import React from "react";
import { ExamProvider } from "@/components/providers/exam.provider";

type PageProps = {
  children: React.ReactNode;
};

export default async function layout({ children }: PageProps) {
  return (
    <div className="bg-white p-6">
      <ExamProvider>{children}</ExamProvider>
    </div>
  );
}
