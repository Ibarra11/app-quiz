import React from "react";
import Button from "./Button";
import Answer from "./Answer";

import IconIncorrect from "../assets/icon-incorrect.svg";
import { AnswerStatus } from "../types";

interface Props {
  selectedOption: number;
  options: string[];
  answerStatus: AnswerStatus;
  correctOption: number;
  nextQuestion: () => void;
  handleAnswerSubmission: (response: number | null) => void;
  handleOptionChange: (option: number) => void;
  lastQuestion: boolean;
}

const CHAR_CODE_FOR_A = "A".charCodeAt(0);

export default function AnswerList({
  selectedOption,
  options,
  answerStatus,
  nextQuestion,
  handleAnswerSubmission,
  handleOptionChange,
  correctOption,
  lastQuestion,
}: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (answerStatus === "idle") {
      handleAnswerSubmission(selectedOption);
    } else {
      nextQuestion();
      handleOptionChange(0);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul className="space-y-3 md:space-y-6">
        {options.map((option, i) => (
          <Answer
            key={i}
            focusOnMount={i === 0}
            optionText={option}
            optionValue={i}
            correctOption={correctOption}
            selectedOption={selectedOption}
            answerStatus={answerStatus}
            handleOptionChange={handleOptionChange}
            letter={String.fromCharCode(CHAR_CODE_FOR_A + i)}
          />
        ))}
      </ul>
      <div className="mt-3 md:mt-8">
        <Button>
          {answerStatus === "idle"
            ? "Submit Answer"
            : lastQuestion
              ? "Finish Quiz"
              : "Next Question"}
        </Button>
      </div>
      {answerStatus === "error" && (
        <div className="flex justify-center gap-2">
          <img alt="" className="h-8 w-8 md:h-10 md:w-10" src={IconIncorrect} />
          <p className="text-lg text-white md:text-2xl">
            Please select an answer
          </p>
        </div>
      )}
    </form>
  );
}
