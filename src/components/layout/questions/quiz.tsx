"use client";
import { useEffect } from "react";
import TimerCircle from "./quiz-timer";
import { type Question } from "@/lib/types/data";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SingleQuestion from "./single-question";
import { checkAnswersApi } from "@/lib/services/exam.service";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { useExam } from "@/hooks/use-exam";
import { useRouter } from "next/navigation";
export default function Quiz({
  exam,
  token,
}: {
  exam: Question[];
  token: string;
}) {
  // Correction API
  const {
    data: correctedAnswers,
    isPending,
    error,
    mutate: checkAnswersMutate,
  } = useMutation({
    mutationFn: checkAnswersApi,
    mutationKey: [exam[0].exam._id, "correct exam"],
  });

  const router = useRouter();

  // Context Provides Questions, User Answers, Progress, Current Question, Corrected Question and isFinished or not.
  const {
    injectAnswer,
    handleQuestion,
    handleFinish,
    exam: ExamContextValue,
    setExam,
  } = useExam();

  // When we find that the user has finished that exam or we got the corrected answer.
  useEffect(() => {
    if (correctedAnswers && ExamContextValue.isFinished) {
      setExam((prev) => {
        return {
          ...prev,
          CorrectedQuestions: correctedAnswers,
        };
      });
      router.push("/dashboard/exams/result");
    }

    if (ExamContextValue.isFinished) {
      localStorage.removeItem("exam-start-time");
      checkAnswersMutate({
        Qanswers: ExamContextValue.answers,
        accessToken: token,
      });
    }

    if (exam && ExamContextValue.questions.length === 0) {
      setExam((prev) => {
        return {
          ...prev,
          questions: exam,
        };
      });
    }
  }, [exam, ExamContextValue.isFinished, correctedAnswers]);

  if (isPending || ExamContextValue.questions.length === 0) {
    return <Spinner className="size-8 w-full mx-auto" />;
  }

  if (error) {
    return (
      <ServerErrorMessage message="Something went wrong, please try again later" />
    );
  }

  return (
    <div className="bg-white p-6">
      <div id="exam">
        <SingleQuestion
          key={ExamContextValue.currentIndex}
          answers={exam[ExamContextValue.currentIndex].answers}
          setAnswer={injectAnswer}
          question={exam[ExamContextValue.currentIndex].question}
          questionId={exam[ExamContextValue.currentIndex]._id}
          correct={
            ExamContextValue.answers[ExamContextValue.currentIndex]
              ? ExamContextValue.answers[ExamContextValue.currentIndex].correct
              : undefined
          }
        />
        <div className="flex items-center max-sm:flex-col">
          <Button
            onClick={() => handleQuestion("prev")}
            disabled={ExamContextValue.currentIndex === 0}
            className="w-full px-5 text-sm flex items-center"
          >
            <ChevronLeft />
            <span>Previous</span>
          </Button>
          <TimerCircle
            timesUp={handleFinish}
            result={isPending || correctedAnswers ? true : false}
            quizTime={ExamContextValue.questions[0].exam.duration * 60}
          />
          {ExamContextValue.currentIndex !==
            ExamContextValue.questions.length - 1 && (
            <Button
              className="w-full px-5 flex items-center"
              onClick={() => handleQuestion("next")}
            >
              <span>Next</span>
              <ChevronRight />
            </Button>
          )}
          {ExamContextValue.currentIndex ===
            ExamContextValue.questions.length - 1 && (
            <Button
              onClick={handleFinish}
              className="w-full px-5 flex items-center"
            >
              <span>Finish</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
