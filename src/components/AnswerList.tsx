import React from "react";
import Button from "./Button";
import Answer from "./Answer";

import IconIncorrect from "../assets/icon-incorrect.svg";

interface Props {
  options: string[];
  answerStatus: "idle" | "correct" | "incorrect" | "error";
  correctAnswer: string;
  nextQuestion: () => void;
  handleResponse: (response: string | null) => void;
  quizStatus: "playing" | "over";
}

const CHAR_CODE_FOR_A = "A".charCodeAt(0);

export default function AnswerList({
  options,
  answerStatus,
  correctAnswer,
  nextQuestion,
  handleResponse,
  quizStatus,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<null | string>(
    options[0]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (answerStatus === "idle" || answerStatus === "error") {
      handleResponse(selectedAnswer);
    } else {
      nextQuestion();
      setSelectedAnswer(null);
    }
  }

  function handleAnswerChange(answer: string) {
    setSelectedAnswer(answer);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul className="space-y-3 md:space-y-6">
        {options.map((option, i) => (
          <Answer
            key={i}
            focusOnMount={i === 0}
            option={option}
            selectedAnswer={selectedAnswer}
            answerStatus={answerStatus}
            correctAnswer={correctAnswer}
            handleAnswerChange={handleAnswerChange}
            letter={String.fromCharCode(CHAR_CODE_FOR_A + i)}
          />
        ))}
      </ul>
      <div className="my-3 md:my-8">
        <Button>
          {answerStatus === "idle" || answerStatus === "error"
            ? "Submit Answer"
            : quizStatus === "over"
              ? "Finish Quiz"
              : "Next Question"}
        </Button>
      </div>
      {answerStatus === "error" && (
        <div className="flex gap-2 justify-center">
          <img alt="" className="w-8 h-8 md:h-10 md:w-10" src={IconIncorrect} />
          <p className="text-lg md:text-2xl text-white">
            Please select an answer
          </p>
        </div>
      )}
    </form>
  );
}
