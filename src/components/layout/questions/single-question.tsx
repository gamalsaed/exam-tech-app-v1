import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Answers } from "@/lib/types/data";
type AnswersProps = { answer: string; key: string };
type QuestionProps = {
  answers: AnswersProps[];
  setAnswer: ({ questionId, correct }: Answers) => void;
  question: string;
  questionId: string;
  correct: string | undefined;

};

export default function SingleQuestion({
  answers,
  setAnswer,
  question,
  questionId,
  correct,
}: QuestionProps) {
  function handleClick({ key }: { key: string }) {
    setAnswer({ questionId, correct: key });
  }

  return (
    <div>
      <h1 className="text-2xl text-blue-600 font-semibold mb-4">{question}</h1>
      <RadioGroup>
        {answers.map((answer) => (
          <div
            key={answer.answer}
            className="flex items-center gap-3 font-mono bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100"
          >
            <RadioGroupItem
              value={answer.answer}
              id={answer.key}
              onClick={() => handleClick({ key: answer.key })}
              checked={correct === answer.key}
            />
            <Label className="text-gray-800 w-full" htmlFor={answer.key}>
              {answer.answer}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
