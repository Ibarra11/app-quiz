import { useLoaderData, type Params } from "react-router-dom";
import data from "../data.json";
import React from "react";
import Question from "../components/Question";

export async function loader({ params }: { params: Params<"quizId"> }) {
  return {
    questions: data.quizzes.filter((quiz) => quiz.title === params.quizId)[0]
      .questions,
  };
}

export type Quiz = Awaited<ReturnType<typeof loader>>;

export default function Quiz() {
  const { questions } = useLoaderData() as Quiz;
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "incorrect" | "correct">(
    "idle"
  );
  const { question, answer, options } = questions[questionNumber];

  function handleResponse(response: string) {
    if (response === answer) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }
  }

  function nextQuestion() {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setStatus("idle");
    }
  }

  return (
    <Question
      numberOfQuestions={questions.length}
      options={options}
      handleResponse={handleResponse}
      status={status}
      questionNumber={questionNumber + 1}
      question={question}
      nextQuestion={nextQuestion}
      correctAnswer={answer}
    />
  );
}
