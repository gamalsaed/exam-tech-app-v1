"use client";

import { useTimer } from "@/hooks/use-timer";

// This components controlls re-send code timer
export default function VerifyTimer() {
  const { resend, Timer } = useTimer();
  return (
    <div className="font-mono w-full text-center">
      {Timer !== 0
        ? "You can request another code in: "
        : "Your can sned a new code now "}
      <span className={`${Timer === 0 && "hidden"}`}>{Timer}s</span>
      <p
        onClick={resend}
        className={`${Timer > 0 && "hidden"} text-blue-600 cursor-pointer`}
      >
        Resend
      </p>
    </div>
  );
}
