import clsx from "clsx";

import IconCorrect from "../assets/icon-correct.svg";
import IconIncorrect from "../assets/icon-incorrect.svg";
import React from "react";

const IconStatus = {
  correct: IconCorrect,
  incorrect: IconIncorrect,
} as const;

export default function Answer({
  optionText,
  answerStatus,
  handleOptionChange,
  letter,
  focusOnMount,
  optionValue,
  correctOption,
  selectedOption,
}: {
  optionText: string;
  answerStatus: "idle" | "correct" | "incorrect" | "error";
  optionValue: number;
  correctOption: number;
  selectedOption: number | null;
  handleOptionChange: (answer: number) => void;
  letter: string;
  focusOnMount: boolean;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (focusOnMount && ref.current) {
      ref.current.focus();
    }
  }, [focusOnMount]);

  const isSelected = optionValue === selectedOption;
  return (
    <li>
      <label
        aria-label={optionText}
        className={clsx(
          ` group relative flex items-center gap-3 rounded-xl bg-white p-3 drop-shadow-light dark:bg-navy-200 dark:drop-shadow-dark md:gap-8 md:pr-4 lg:px-6 lg:py-5`,
          {
            "outline outline-2 outline-purple-300":
              answerStatus === "idle" && isSelected,
            "outline outline-2 outline-green":
              answerStatus === "correct" && isSelected,
            " outline outline-2 outline-red":
              answerStatus === "incorrect" && isSelected,
          },
        )}
      >
        <input
          ref={ref}
          className="absolute inset-0 cursor-pointer appearance-none outline-none focus:ring-0"
          type="radio"
          name="answer"
          value={optionText}
          checked={isSelected}
          onChange={() => {
            if (answerStatus === "idle") {
              handleOptionChange(optionValue);
            }
          }}
        />
        <div
          className={clsx(
            "mr-3 grid h-10 w-10 shrink-0 place-content-center rounded-md md:mr-8 md:h-14 md:w-14",
            {
              "bg-light-gray transition-colors group-hover:bg-purple-100":
                !isSelected,
              "bg-purple-300": answerStatus === "idle" && isSelected,
              "bg-green": answerStatus === "correct" && isSelected,
              "bg-red": answerStatus === "incorrect" && isSelected,
            },
          )}
        >
          <p
            className={clsx(
              "text-lg font-medium transition-colors  md:text-2xl",
              {
                "text-navy-200 group-hover:text-purple-300": !isSelected,
                "text-white": isSelected,
              },
            )}
          >
            {letter.toUpperCase()}
          </p>
        </div>
        <p className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
          {optionText}
        </p>
        {/* When the answer is incorrect display the correct option icon */}
        {answerStatus === "incorrect" && optionValue === correctOption && (
          <img
            className="ml-auto block h-6 w-6  md:h-10 md:w-10"
            src={IconStatus["correct"]}
          />
        )}
        {answerStatus === "incorrect" && isSelected && (
          <img
            className="ml-auto block h-6 w-6  md:h-10 md:w-10"
            src={IconStatus["incorrect"]}
          />
        )}

        {answerStatus === "correct" && isSelected && (
          <img
            className="ml-auto block h-6 w-6 md:h-10 md:w-10"
            src={IconStatus["correct"]}
          />
        )}
      </label>
    </li>
  );
}
