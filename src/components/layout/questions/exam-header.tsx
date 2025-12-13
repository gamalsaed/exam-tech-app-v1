"use client";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { useExam } from "@/hooks/use-exam";
export default function ExamHeader() {
  const { exam } = useExam();

  if (exam.questions.length !== 0) {
    const title = exam.questions![0].exam.title;
    const answersArray = exam.answers.filter((item) => item !== undefined);

    return (
      <>
        {" "}
        <div className="text-gray-500 font-mono text-sm flex justify-between mb-1.5">
          <h3>Frontend Development - {title}</h3>
          <div>
            Question{" "}
            <span className="text-blue-600 font-bold">
              {exam.currentIndex + 1}
            </span>{" "}
            of {exam.questions.length}
          </div>
        </div>
        <Progress
          value={(answersArray.length * 100) / exam.questions.length}
          className="w-full mb-10"
        />
      </>
    );
  }
}
