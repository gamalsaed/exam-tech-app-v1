"use client";
import { createContext, useState } from "react";
import {
  type Answers,
  type Question,
  CorrectedQuestions as CorrectedQuestionsType,
} from "@/lib/types/data";

type ExamType = {
  questions: Question[];
  CorrectedQuestions?: CorrectedQuestionsType;
  progress: number;
  currentIndex: number;
  answers: Answers[];
  isFinished: boolean;
};

type ExamContextType = {
  exam: ExamType;
  injectAnswer: (answer: Answers) => void;
  handleQuestion: (value: "next" | "prev") => void;
  handleFinish: () => void;
  reset: () => void;
  setExam: React.Dispatch<React.SetStateAction<ExamType>>;
};

export const ExamContext = createContext<ExamContextType | null>(null);

export function ExamProvider({ children }: { children: React.ReactNode }) {
  const [exam, setExam] = useState<ExamType>({
    questions: [],
    CorrectedQuestions: undefined,
    progress: 0,
    currentIndex: 0,
    answers: [],
    isFinished: false,
  });

  // Allows you to put the answer into answers's array
  function injectAnswer({ questionId, correct }: Answers) {
    setExam((prev) => {
      const newArr = [...prev.answers];
      newArr[prev.currentIndex] = { questionId, correct };
      return {
        ...prev,
        answers: newArr,
      };
    });
  }

  // to fill the unanswered questions
  function handleFinish() {
    setExam((prev) => {
      const finalAnswers = prev.questions.map((answer, i) =>
        prev.answers[i] === undefined
          ? { questionId: prev.questions[i]._id, correct: "A" }
          : prev.answers[i]
      );

      return {
        ...prev,
        answers: finalAnswers,
        isFinished: true,
      };
    });
  }

  // Set the question number
  function handleQuestion(value: "next" | "prev") {
    setExam((prev) => {
      return {
        ...prev,
        currentIndex:
          value === "next" ? prev.currentIndex + 1 : prev.currentIndex - 1,
      };
    });
  }

  function reset() {
    localStorage.removeItem("exam-start-time");
    setExam({
      questions: [],
      CorrectedQuestions: undefined,
      progress: 0,
      currentIndex: 0,
      answers: [],
      isFinished: false,
    });
  }

  return (
    <ExamContext.Provider
      value={{
        exam,
        injectAnswer,
        handleQuestion,
        handleFinish,
        setExam,
        reset,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}
