"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useTimer() {
  const [timerState, setTimerState] = useState<number>(0);
  const [triggerTime, setTriggerTime] = useState(0);
  const router = useRouter();
  const email = new URL(window.location.href).searchParams.get("email");

  async function resend() {
    const response = await fetch(
      `https://exam.elevateegy.com/api/v1/auth/forgotPassword`,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      router.push(
        `/auth/forget-password?email=${email}&error=Something went wrong`
      );
    }
    setTriggerTime((prev) => prev + 1);
  }

  useEffect(() => {
    const timer = localStorage.getItem("timer");
    const now = Math.floor(Date.now() / 1000);

    if (!timer) {
      localStorage.setItem("timer", `${now}`);
      setTimerState(60);
    } else {
      const residual = now - parseInt(timer, 10);

      if (residual < 60) {
        setTimerState(60 - residual);
      }

      if (residual > 60) {
        localStorage.setItem("timer", `${now}`);
        setTimerState(60);
      }
    }
    if (triggerTime > 0) {
      setTimerState(60);
    }
  }, [triggerTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerState((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    Timer: timerState,
    resend,
  };
}
