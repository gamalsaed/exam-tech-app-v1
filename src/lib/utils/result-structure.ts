import { Question, CorrectedQuestions } from "../types/data";

type GetResultParams = {
  questions: Question[];
  correctedQ: CorrectedQuestions;
};

type QestionsObject = {
  [key: string]: Question;
};

// Helper function the get the answer
function getAnswer(array: QestionsObject, id: string, key: string) {
  const answer: number = Number(key.split("")[1]) - 1;
  return array[id].answers[answer];
}

export function getResult({ questions, correctedQ }: GetResultParams) {
  const QUESTIONS: QestionsObject = {};

  questions.forEach((question) => {
    QUESTIONS[question._id] = question;
  });

  // Get the wrong results
  const wrong_result = correctedQ?.WrongQuestions.map((result) => {
    const answer = {
      QID: result.QID,
      Question: result.Question,
      correctAnswer: getAnswer(QUESTIONS, result.QID, result.correctAnswer),
      inCorrectAnswer:
        result.inCorrectAnswer === "A"
          ? { answer: "" }
          : getAnswer(QUESTIONS, result.QID, result.inCorrectAnswer),
    };
    return answer;
  });

  // Get the correct results
  const correct_result = correctedQ?.correctQuestions.map((result) => {
    const answer = {
      QID: result.QID,
      Question: result.Question,
      correctAnswer: getAnswer(QUESTIONS, result.QID, result.correctAnswer),
    };
    return answer;
  });

  return {
    wrong_result,
    correct_result,
  };
}
