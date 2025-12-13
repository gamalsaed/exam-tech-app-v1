import { ExamContext } from "@/components/providers/exam.provider";
import { useContext } from "react";

export function useExam() {
  const context = useContext(ExamContext);
  if (!context) throw new Error("useExam must be used inside ExamProvider");
  return context;
}
