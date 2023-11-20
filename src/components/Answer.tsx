import clsx from "clsx";

import IconCorrect from "../assets/icon-correct.svg";
import IconIncorrect from "../assets/icon-incorrect.svg";

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
}: {
  option: string;
  selectedAnswer: string | null;
  answerStatus: "idle" | "correct" | "incorrect";
  correctAnswer: string;
  handleAnswerChange: (answer: string) => void;
  letter: string;
}) {
  return (
    <li>
      <label
        // aria-label={option}
        className={clsx(
          `relative flex gap-3 items-center p-3 rounded-xl bg-navy-200 md:gap-8 md:pr-4 lg:py-5 lg:px-6`,
          {
            "outline outline-2 outline-purple":
              answerStatus === "idle" && option === selectedAnswer,
            " outline outline-2 outline-green":
              answerStatus === "correct" && option === selectedAnswer,
            " outline outline-2 outline-red":
              answerStatus === "incorrect" && option === selectedAnswer,
          }
        )}
      >
        <input
          className="appearance-none absolute inset-0 outline-none focus:ring-0 "
          type="radio"
          name="answer"
          value={option}
          checked={selectedAnswer === option}
          onChange={(e) => {
            if (answerStatus === "idle") {
              handleAnswerChange(e.target.value);
            }
          }}
          onFocus={(e) => {
            if (answerStatus === "idle") {
              handleAnswerChange(e.target.value);
            }
          }}
        />
        <div
          className={clsx(
            "grid place-content-center h-10 w-10 rounded-md mr-3 md:mr-8 md:h-14 md:w-14",
            {
              "bg-light-gray": option !== selectedAnswer,
              "bg-purple": answerStatus === "idle" && option === selectedAnswer,
              "bg-green":
                answerStatus === "correct" && option === selectedAnswer,
              "bg-red":
                answerStatus === "incorrect" && option === selectedAnswer,
            }
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
        <p className="text-lg text-white font-medium md:text-2xl">{option}</p>
        {answerStatus === "incorrect" && option === selectedAnswer && (
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

        {answerStatus === "correct" && option === selectedAnswer && (
          <img
            className="block ml-auto h-6 w-6 md:h-10 md:w-10"
            src={IconStatus["correct"]}
          />
        )}
      </label>
    </li>
  );
}
