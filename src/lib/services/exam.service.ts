import { Answers } from "@/lib/types/data";

type CheckAnswersParams = {
  Qanswers: Answers[];
  accessToken: string;
};

export async function checkAnswersApi({
  Qanswers,
  accessToken,
}: CheckAnswersParams) {
  const startTime = Number(localStorage.getItem("exam-start-time"));
  const now = Date.now();
  const examTime = Math.floor((now - startTime) / 1000 / 60);

  localStorage.removeItem("exam-start-time");

  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/questions/check",
    {
      method: "POST",
      body: JSON.stringify({ answers: Qanswers, time: examTime }),
      headers: {
        "Content-Type": "application/json",
        token: accessToken,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const examResult = await response.json();
  return examResult;
}
