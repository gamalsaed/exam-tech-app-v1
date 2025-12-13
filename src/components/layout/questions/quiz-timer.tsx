"use client";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
export default function TimerCircle({
  quizTime,
  timesUp,
  result,
}: {
  quizTime: number;
  timesUp: () => void;
  result: boolean;
}) {
  const storageKey = "exam-start-time";
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedStart = localStorage.getItem(storageKey);

    if (!savedStart) {
      localStorage.setItem(storageKey, String(Date.now()));
      setTime(quizTime);
    } else {
      const diffInSeconds = Math.floor(
        (Date.now() - Number(savedStart)) / 1000
      );

      if (diffInSeconds >= quizTime) {
        // in this case i'll make a function to call it here to end the exam
        localStorage.removeItem(storageKey);
        return;
      }

      if (quizTime - diffInSeconds > 0) {
        setTime(quizTime - diffInSeconds);
      }
    }
  }, [quizTime]);

  useEffect(() => {
    if (result) return;
    if (time !== null && time <= 0) {
      localStorage.removeItem(storageKey);
      timesUp();
      return;
    }
    const timer = setInterval(() => {
      setTime((t) => {
        if (t === null) return t;
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  if (time === null) return <Spinner className="size-8 w-full mx-auto" />;

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / quizTime) * circumference;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120" className="rotate-[-90deg]">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#E3E8FF"
          fill="none"
          strokeWidth="14"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#2563FF"
          fill="none"
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-300"
        />
      </svg>
      <p className="absolute text-sm font-mono">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
