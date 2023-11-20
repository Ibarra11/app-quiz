import React from "react";
import Button from "./Button";
import Answer from "./Answer";

interface Props {
  options: string[];
  answerStatus: "idle" | "correct" | "incorrect";
  correctAnswer: string;
  nextQuestion: () => void;
  handleResponse: (response: string) => void;
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
    null
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (answerStatus !== "idle") {
      nextQuestion();
    } else if (selectedAnswer) {
      handleResponse(selectedAnswer);
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
            option={option}
            selectedAnswer={selectedAnswer}
            answerStatus={answerStatus}
            correctAnswer={correctAnswer}
            handleAnswerChange={handleAnswerChange}
            letter={String.fromCharCode(CHAR_CODE_FOR_A + i)}
          />
        ))}
      </ul>
      <div className="mt-3 md:mt-8">
        <Button>
          {answerStatus === "idle"
            ? "Submit Answer"
            : quizStatus === "over"
              ? "Finish Quiz"
              : "Next Question"}
        </Button>
      </div>
    </form>
  );
}
