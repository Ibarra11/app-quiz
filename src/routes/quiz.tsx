import { useLoaderData, type Params, useParams } from "react-router-dom";
import data from "../data.json";
import React from "react";
import Question from "../components/Question";
import QuizScore from "../components/QuizScore";

export async function loader({ params }: { params: Params<"quizId"> }) {
  return {
    questions: data.quizzes.filter((quiz) => quiz.title === params.quizId)[0]
      .questions,
  };
}

export type Quiz = Awaited<ReturnType<typeof loader>>;

export default function Quiz() {
  const { quizId } = useParams();
  const [score, setScore] = React.useState(0);
  const { questions } = useLoaderData() as Quiz;
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "incorrect" | "correct">(
    "idle"
  );
  const [gameStatus, setGameStatus] = React.useState<"playing" | "complete">(
    "playing"
  );
  const { question, answer, options } = questions[questionNumber];

  function handleResponse(response: string) {
    if (response === answer) {
      setStatus("correct");
      setScore(score + 1);
    } else {
      setStatus("incorrect");
    }
  }

  function nextQuestion() {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setStatus("idle");
    } else {
      setGameStatus("complete");
    }
  }

  function resetQuiz() {
    setGameStatus("playing");
    setScore(0);
    setQuestionNumber(0);
    setStatus("idle");
  }

  return gameStatus === "complete" ? (
    <QuizScore
      quizId={quizId!}
      score={score}
      numberOfQuestions={questions.length}
      resetQuiz={resetQuiz}
    />
  ) : (
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
