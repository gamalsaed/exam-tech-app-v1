import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
type ShowAnswerProps = {
  correct: boolean;
  label: string;
  id: string;
  title: string;
  className?: string;
};

export default function ShowAnswer({
  correct,
  label,
  id,
  title,
  className,
}: ShowAnswerProps) {
  let radioStyle = "";
  let groupStyle = "";
  switch (title) {
    case "good":
      radioStyle = "border-emerald-500";
      groupStyle = "bg-emerald-50";

      break;
    case "bad":
      radioStyle = "border-red-600";
      groupStyle = "bg-red-50";

      break;
    case "fix":
      radioStyle = "border-emerald-500";
      groupStyle = "bg-emerald-50";
      break;
  }

  return (
    <RadioGroup
      className={`p-4 flex gap-2.5 font-mono text-sm font-normal ${groupStyle} ${
        label === "" && "hidden"
      }`}
    >
      <RadioGroupItem
        title={title}
        className={`${radioStyle} cursor-default`}
        checked={title !== "fix"}
        value={label}
        id={id}
      />
      <Label htmlFor={id}>{label}</Label>
    </RadioGroup>
  );
}
