import clsx from "clsx";

import IconCorrect from "../assets/icon-correct.svg";
import IconIncorrect from "../assets/icon-incorrect.svg";
import React from "react";

const IconStatus = {
  correct: IconCorrect,
  incorrect: IconIncorrect,
} as const;

export default function Answer({
  option,
  selectedAnswer,
  answerStatus,
  correctAnswer,
  handleAnswerChange,
  letter,
  focusOnMount,
}: {
  option: string;
  selectedAnswer: string | null;
  answerStatus: "idle" | "correct" | "incorrect" | "error";
  correctAnswer: string;
  handleAnswerChange: (answer: string) => void;
  letter: string;
  focusOnMount: boolean;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (focusOnMount && ref.current) {
      ref.current.focus();
    }
  }, [focusOnMount]);

  return (
    <li>
      <label
        aria-label={option}
        className={clsx(
          `drop-shadow-light dark:drop-shadow-dark relative flex items-center gap-3 rounded-xl bg-white p-3 dark:bg-navy-200 md:gap-8 md:pr-4 lg:px-6 lg:py-5`,
          {
            "outline outline-2 outline-purple":
              (answerStatus === "idle" || answerStatus === "error") &&
              option === selectedAnswer,
            "outline outline-2 outline-green":
              answerStatus === "correct" && option === selectedAnswer,
            " outline outline-2 outline-red":
              answerStatus === "incorrect" && option === selectedAnswer,
          },
        )}
      >
        <input
          ref={ref}
          className="absolute inset-0 appearance-none outline-none focus:ring-0 "
          type="radio"
          name="answer"
          value={option}
          checked={selectedAnswer === option}
          onChange={(e) => {
            if (answerStatus === "idle" || answerStatus === "error") {
              handleAnswerChange(e.target.value);
            }
          }}
          onFocus={(e) => {
            e.stopPropagation();
            if (answerStatus === "idle" || answerStatus === "error") {
              handleAnswerChange(e.target.value);
            }
          }}
        />
        <div
          className={clsx(
            "mr-3 grid h-10 w-10 place-content-center rounded-md md:mr-8 md:h-14 md:w-14",
            {
              "bg-light-gray": option !== selectedAnswer,
              "bg-purple":
                (answerStatus === "idle" || answerStatus === "error") &&
                option === selectedAnswer,
              "bg-green":
                answerStatus === "correct" && option === selectedAnswer,
              "bg-red":
                answerStatus === "incorrect" && option === selectedAnswer,
            },
          )}
        >
          <p
            className={clsx("text-lg font-medium md:text-2xl", {
              "text-navy-200": option !== selectedAnswer,
              "text-white": option === selectedAnswer,
            })}
          >
            {letter.toUpperCase()}
          </p>
        </div>
        <p className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
          {option}
        </p>
        {answerStatus === "incorrect" && option === selectedAnswer && (
          <img
            className="ml-auto block h-6 w-6  md:h-10 md:w-10"
            src={IconStatus["incorrect"]}
          />
        )}
        {answerStatus === "incorrect" && option === correctAnswer && (
          <img
            className="ml-auto block h-6 w-6  md:h-10 md:w-10"
            src={IconStatus["correct"]}
          />
        )}

        {answerStatus === "correct" && option === selectedAnswer && (
          <img
            className="ml-auto block h-6 w-6 md:h-10 md:w-10"
            src={IconStatus["correct"]}
          />
        )}
      </label>
    </li>
  );
}
