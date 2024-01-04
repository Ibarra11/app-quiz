import React from "react";

import CompletionBar from "./CompetionBar";
import TimeLimit from "./TimeLimit";
import { AnswerStatus } from "../types";

interface QuestionProps {
  question: string;
  questionNumber: number;
  numberOfQuestions: number;
  handleTimeLimit: () => void;
  answerStatus: AnswerStatus;
}

export default function Question({
  question,
  questionNumber,
  numberOfQuestions,
  handleTimeLimit,
  answerStatus,
  children,
}: React.PropsWithChildren<QuestionProps>) {
  const progress = Math.round((questionNumber / numberOfQuestions) * 100);
  return (
    <div className="flex flex-col gap-10 md:gap-14 lg:flex-row lg:gap-20">
      <div className="flex flex-col gap-6 md:gap-10 lg:h-[452px] lg:w-[452px]">
        <div className="space-y-3 md:space-y-7 lg:mb-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-sm italic text-navy-200 dark:text-light-blue md:text-xl">
              Question {questionNumber} out of {numberOfQuestions}
            </h3>
            <TimeLimit answerStatus={answerStatus} cb={handleTimeLimit} />
          </div>

          <h2 className="text-xl text-navy-300 dark:text-white md:text-4xl">
            {question}
          </h2>
        </div>
        <CompletionBar progress={progress} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
