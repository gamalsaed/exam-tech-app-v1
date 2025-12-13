import React from "react";
import Quiz from "@/components/layout/questions/quiz";
import { getToken } from "@/lib/utils/get-token";
import { notFound } from "next/navigation";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { ExamApi } from "@/lib/types/data";
import ExamHeader from "@/components/layout/questions/exam-header";
type PageProps = {
  searchParams: {
    id: string;
  };
};

export default async function page({ searchParams }: PageProps) {
  if (!searchParams.id) {
    notFound();
  }

  const jwt = await getToken();
  const response = await fetch(
    `${process.env.API}/questions?exam=${searchParams.id}`,
    {
      headers: {
        token: jwt?.accessToken!,
      },
    }
  );

  const result: ExamApi = await response.json();

  if (!response.ok) {
    <ServerErrorMessage message={result.message} />;
  }

  if (result.questions.length === 0) {
    return (
      <h1 className="bg-blue-50 p-4 text-center font-mono text-2xl text-blue-600">
        Sorry, The teacher didn't finish the exam yet, Please check back later.
      </h1>
    );
  }

  return (
    <div>
      <ExamHeader />
      <Quiz exam={result.questions} token={jwt?.accessToken!} />
    </div>
  );
}
