import clsx from "clsx";
import IconCorrect from "../assets/icon-correct.svg";
import IconIncorrect from "../assets/icon-incorrect.svg";
import React from "react";
import Button from "./Button";

const IconStatus = {
  correct: IconCorrect,
  incorrect: IconIncorrect,
} as const;

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
  const [answer, setAnswer] = React.useState<null | string>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (answerStatus !== "idle") {
      nextQuestion();
    } else if (answer) {
      handleResponse(answer);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <ul className="space-y-3 md:space-y-6">
        {options.map((option, i) => (
          <li key={option}>
            <label
              aria-label={option}
              className={clsx(
                `relative flex gap-3 items-center p-3 rounded-xl bg-navy-200 md:gap-8 md:pr-4 lg:py-5 lg:px-6`,
                {
                  "outline outline-2 outline-purple":
                    answerStatus === "idle" && option === answer,
                  " outline outline-2 outline-green":
                    answerStatus === "correct" && option === answer,
                  " outline outline-2 outline-red":
                    answerStatus === "incorrect" && option === answer,
                }
              )}
            >
              <input
                className="appearance-none absolute inset-0 outline-none focus:ring-0 "
                type="radio"
                name="answer"
                value={option}
                checked={answer === option}
                onChange={(e) => {
                  if (answerStatus === "idle") {
                    setAnswer(e.target.value);
                  }
                }}
                onFocus={(e) => {
                  if (answerStatus === "idle") {
                    setAnswer(e.target.value);
                  }
                }}
              />
              <div
                className={clsx(
                  "grid place-content-center h-10 w-10 rounded-md mr-3 md:mr-8 md:h-14 md:w-14",
                  {
                    "bg-light-gray": option !== answer,
                    "bg-purple": answerStatus === "idle" && option === answer,
                    "bg-green": answerStatus === "correct" && option === answer,
                    "bg-red": answerStatus === "incorrect" && option === answer,
                  }
                )}
              >
                <p
                  className={clsx("text-lg font-medium md:text-2xl", {
                    "text-navy-200": option !== answer,
                    "text-white": option === answer,
                  })}
                >
                  {String.fromCharCode(CHAR_CODE_FOR_A + i)}
                </p>
              </div>
              <p className="text-lg text-white font-medium md:text-2xl">
                {option}
              </p>
              {answerStatus === "incorrect" && option === answer && (
                <img
                  className="block ml-auto h-6 w-6  md:h-10 md:w-10"
                  src={IconStatus["incorrect"]}
                />
              )}
              {answerStatus === "incorrect" && option === correctAnswer && (
                <img
                  className="block ml-auto h-6 w-6  md:h-10 md:w-10"
                  src={IconStatus["correct"]}
                />
              )}

              {answerStatus === "correct" && option === answer && (
                <img
                  className="block ml-auto h-6 w-6 md:h-10 md:w-10"
                  src={IconStatus["correct"]}
                />
              )}
            </label>
          </li>
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
