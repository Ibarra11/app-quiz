import React from "react";

import CompletionBar from "./CompetionBar";

interface QuestionProps {
  question: string;
  questionNumber: number;
  numberOfQuestions: number;
}

export default function Question({
  question,
  questionNumber,
  numberOfQuestions,
  children,
}: React.PropsWithChildren<QuestionProps>) {
  const progress = Math.round((questionNumber / numberOfQuestions) * 100);
  return (
    <div className="flex flex-col gap-10 md:gap-14 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-6 md:gap-10 lg:h-[452px]">
        <div className="space-y-3 md:space-y-7 lg:mb-auto">
          <h3 className="text-sm text-light-blue italic md:text-xl">
            Question {questionNumber} out of {numberOfQuestions}
          </h3>
          <h2 className="text-xl text-white md:text-4xl">{question}</h2>
        </div>

        <CompletionBar progress={progress} />
      </div>
      {children}
    </div>
  );
}
