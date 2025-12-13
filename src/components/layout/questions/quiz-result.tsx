"use client";

import React from "react";
import { type Question } from "@/lib/types/data";
import ShowAnswer from "./show-answer";
import DonutChart from "./pie-chart-analyst";
import { Button } from "@/components/ui/button";
import { useExam } from "@/hooks/use-exam";
import Link from "next/link";
import slugify from "slugify";
import { Spinner } from "@/components/ui/spinner";
import { notFound } from "next/navigation";
import ExamHeader from "@/components/layout/questions/exam-header";
import { FolderSearch, RotateCcw } from "lucide-react";
import { getResult } from "@/lib/utils/result-structure";

export default function QuizResult() {
  const { exam, setExam } = useExam();
  if (exam.questions.length === 0 && !exam.isFinished) {
    notFound();
  }
  // when we click on restart button this function will be called to reset everything
  function handleRestart() {
    setExam((prev) => {
      return {
        ...prev,
        CorrectedQuestions: undefined,
        currentIndex: 0,
        answers: [],
        isFinished: false,
      };
    });
    localStorage.removeItem("exam-start-time");
  }

  if (exam.CorrectedQuestions === undefined) {
    return <Spinner className="size-8" />;
  }
  // To Re-Structure the data
  const { wrong_result, correct_result } = getResult({
    questions: exam.questions,
    correctedQ: exam.CorrectedQuestions,
  });

  return (
    <div className="font-mono w-full">
      <ExamHeader />
      <div className="text-blue-600 font-semibold text-2xl mb-6">Results: </div>
      <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-5">
        <div className="flex-1">
          <DonutChart
            wrong={wrong_result?.length || 0}
            correct={correct_result?.length || 0}
          />
        </div>
        <div className="flex flex-col flex-grow gap-4 h-96 overflow-auto w-3/5 p-2.5 border border-gray-200">
          {wrong_result?.map((result, i) => {
            return (
              <div key={i} className="font-mono flex flex-col gap-2.5">
                <div>
                  <h1 className="mb-2 font-semibold text-blue-600 text-xl">
                    {result.Question}
                  </h1>
                  <p className="text-xs text-right">
                    {result.inCorrectAnswer.answer === "" &&
                      "You didn't answer this question, be careful next time"}
                  </p>
                </div>
                <ShowAnswer
                  title="bad"
                  correct={true}
                  label={result?.inCorrectAnswer?.answer}
                  id={`${i}`}
                />
                <ShowAnswer
                  title="fix"
                  correct={true}
                  label={result?.correctAnswer?.answer}
                  id="asd"
                />
              </div>
            );
          })}
          
          {correct_result?.map((answer) => {
            return (
              <div className="font-mono" key={answer.QID}>
                <div>
                  <h1 className="mb-2 font-semibold text-blue-600 text-xl">
                    {answer.Question}
                  </h1>
                  <p className="text-emerald-500 text-right">Correct Answer</p>
                </div>
                <ShowAnswer
                  title="good"
                  correct={true}
                  label={answer.correctAnswer?.answer}
                  id="asd"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 w-full mt-10">
        <Link
          className="w-full"
          onClick={handleRestart}
          href={`/dashboard/exams/${slugify(
            exam.questions[0].exam.title
          )}/questions?id=${exam.questions[0].exam._id}`}
        >
          <Button variant="secondary" className="w-full py-6">
            <RotateCcw />
            Restart
          </Button>
        </Link>
        <Link className="w-full " href="/dashboard/exams">
          <Button className="w-full py-6 ">
            <FolderSearch />
            Explore
          </Button>
        </Link>
      </div>
    </div>
  );
}
