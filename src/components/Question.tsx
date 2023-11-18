import React from "react";
import * as Progress from "@radix-ui/react-progress";
import clsx from "clsx";
import IconCorrect from "../assets/icon-correct.svg";
import IconIncorrect from "../assets/icon-incorrect.svg";

import Button from "./Button";

const IconStatus = {
  correct: IconCorrect,
  incorrect: IconIncorrect,
} as const;

interface QuestionProps {
  question: string;
  correctAnswer: string;
  options: string[];
  questionNumber: number;
  numberOfQuestions: number;
  status: "idle" | "correct" | "incorrect";
  handleResponse: (response: string) => void;
  nextQuestion: () => void;
}

const CHAR_CODE_FOR_A = "A".charCodeAt(0);

export default function Question({
  question,
  correctAnswer,
  status,
  handleResponse,
  options,
  questionNumber,
  numberOfQuestions,
  nextQuestion,
}: React.PropsWithChildren<QuestionProps>) {
  const [answer, setAnswer] = React.useState<null | string>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") {
      nextQuestion();
    } else if (answer) {
      handleResponse(answer);
    }
  }
  return (
    <div>
      <div className="space-y-3">
        <h3 className="text-sm text-light-blue italic">
          Question {questionNumber} out of {numberOfQuestions}
        </h3>
        <h2 className="text-xl text-white">{question}</h2>
      </div>
      <div className="mt-6 mb-10">
        <CompletionBar
          questionNumber={questionNumber}
          numberOfQuestions={numberOfQuestions}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ul className="space-y-3 mb-3">
          {options.map((option, i) => (
            <li key={option}>
              <label
                aria-label={option}
                className={clsx(
                  `relative flex items-center p-3 rounded-xl bg-navy-200`,
                  {
                    "outline outline-2 outline-purple":
                      status === "idle" && option === answer,
                    " outline outline-2 outline-green":
                      status === "correct" && option === answer,
                    " outline outline-2 outline-red":
                      status === "incorrect" && option === answer,
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
                    if (status === "idle") {
                      setAnswer(e.target.value);
                    }
                  }}
                  onFocus={(e) => {
                    if (status === "idle") {
                      setAnswer(e.target.value);
                    }
                  }}
                />
                <div
                  className={clsx(
                    "grid place-content-center h-10 w-10 rounded-md mr-3",
                    {
                      "bg-light-gray": option !== answer,
                      "bg-purple": status === "idle" && option === answer,
                      "bg-green": status === "correct" && option === answer,
                      "bg-red": status === "incorrect" && option === answer,
                    }
                  )}
                >
                  <p
                    className={clsx("text-lg font-medium", {
                      "text-navy-200": option !== answer,
                      "text-white": option === answer,
                    })}
                  >
                    {String.fromCharCode(CHAR_CODE_FOR_A + i)}
                  </p>
                </div>
                <p className="text-lg text-white font-medium">{option}</p>
                {status === "incorrect" && option === answer && (
                  <img
                    className="block ml-auto h-6 w-6"
                    src={IconStatus["incorrect"]}
                  />
                )}
                {status === "incorrect" && option === correctAnswer && (
                  <img
                    className="block ml-auto h-6 w-6"
                    src={IconStatus["correct"]}
                  />
                )}

                {status === "correct" && option === answer && (
                  <img
                    className="block ml-auto h-6 w-6"
                    src={IconStatus["correct"]}
                  />
                )}
              </label>
            </li>
          ))}
        </ul>
        <Button>
          {status === "idle"
            ? "Submit Answer"
            : questionNumber === numberOfQuestions
              ? "Finish Quiz"
              : "Next Question"}
        </Button>
      </form>
    </div>
  );
}

function CompletionBar({
  numberOfQuestions,
  questionNumber,
}: {
  numberOfQuestions: number;
  questionNumber: number;
}) {
  const progress = Math.round((questionNumber / numberOfQuestions) * 100);

  return (
    <Progress.Root
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
      className="relative bg-navy-200 h-4 rounded-full overflow-hidden p-1"
    >
      <Progress.Indicator
        className="bg-white  h-full rounded-full  transition-all duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  );
}
