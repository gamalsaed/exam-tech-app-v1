"use client";
import React, { useEffect, useState } from "react";
import { useExam } from "@/hooks/use-exam";
export default function Checker() {
  const { setExam } = useExam();

  let path: string[];

  useEffect(() => {
    if (window) {
      path = window.location.pathname.split("/");
      if (path[path.length - 1] === "exams") {
        setExam(() => {
          return {
            questions: [],
            CorrectedQuestions: undefined,
            progress: 0,
            currentIndex: 0,
            answers: [],
            isFinished: false,
          };
        });
      }
    }
  }, []);

  return <div></div>;
}
