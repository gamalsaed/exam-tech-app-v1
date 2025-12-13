"use client";
import React from "react";
import { Timer } from "lucide-react";

type ExamProps = {
  quizName: string;
  questions: number;
  duration: number;
};

export default function ExamSkeleton({
  quizName,
  questions,
  duration,
}: ExamProps) {
  function handleClick() {
    window.localStorage.removeItem("exam-start-time");
  }

  return (
    <div
      onClick={handleClick}
      className="font-mono cursor-pointer transition-colors duration-300 hover:bg-blue-100 flex justify-between items-center bg-blue-50 p-4"
    >
      <div className="flex flex-col">
        <span className="font-semibold text-xl text-blue-600">{quizName}</span>
        <span className="text-gray-500">{questions} Questions</span>
      </div>
      <div className="flex items-center gap-2">
        <Timer className="text-gray-500" />
        <span>Duration: {duration} minutes</span>
      </div>
    </div>
  );
}
