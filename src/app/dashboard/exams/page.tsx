import React from "react";
import { getToken } from "@/lib/utils/get-token";
import ServerErrorMessage from "@/components/shared/server-error-message";
import ExamSkeleton from "@/components/skeletons/exam.skeleton";
import { ExamsApi } from "@/lib/types/data";
import Link from "next/link";
import slugify from "slugify";
import Checker from "@/components/layout/questions/checker";

export default async function page() {
  const jwt = await getToken();
  const response = await fetch(`https://exam.elevateegy.com/api/v1/exams`, {
    headers: {
      token: jwt?.accessToken!,
    },
  });
  if (!response.ok) {
    return (
      <div>
        <ServerErrorMessage message="Something went wrong" />;
      </div>
    );
  }
  const data: ExamsApi = await response.json();

  return (
    <div className="flex flex-col gap-4">
      {data.exams.map((exam) => {
        return (
          <Link
            key={exam.title}
            href={`/dashboard/exams/${slugify(exam.title)}/questions?id=${
              exam._id
            }`}
          >
            <ExamSkeleton
              quizName={exam.title}
              questions={exam.numberOfQuestions}
              duration={exam.duration}
            />
          </Link>
        );
      })}
      <Checker />
    </div>
  );
}
