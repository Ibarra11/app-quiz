import { useLoaderData, type Params, useParams } from "react-router-dom";
import React from "react";
import Question from "../components/Question";
import QuizScore from "../components/QuizScore";
import AnswerList from "../components/AnswerList";

// export async function loader({ params }: { params: Params<"quizId"> }) {
//   return {
//     questions: data.quizzes.filter((quiz) => quiz.title === params.quizId)[0]
//       .questions,
//   };
// }

// export type Quiz = Awaited<ReturnType<typeof loader>>;

export default function Quiz() {
  return null;
  // const { quizId } = useParams();
  // const [score, setScore] = React.useState(0);
  // const { questions } = useLoaderData() as Quiz;
  // const [questionNumber, setQuestionNumber] = React.useState(0);
  // const [answerStatus, setAnswerStatus] = React.useState<
  //   "idle" | "incorrect" | "correct" | "error"
  // >("idle");
  // const [quizStatus, setQuizStatus] = React.useState<"playing" | "over">(
  //   "playing",
  // );
  // const { question, answer, options } = questions[questionNumber];

  // function handleResponse(response: string | null) {
  //   if (!response) {
  //     setAnswerStatus("error");
  //     return;
  //   }
  //   if (response === answer) {
  //     setAnswerStatus("correct");
  //     setScore(score + 1);
  //   } else {
  //     setAnswerStatus("incorrect");
  //   }
  // }

  // function nextQuestion() {
  //   if (questionNumber < questions.length - 1) {
  //     setQuestionNumber(questionNumber + 1);
  //     setAnswerStatus("idle");
  //   } else {
  //     setQuizStatus("over");
  //   }
  // }

  // function resetQuiz() {
  //   setQuizStatus("playing");
  //   setScore(0);
  //   setQuestionNumber(0);
  //   setAnswerStatus("idle");
  // }

  // return quizStatus === "over" ? (
  //   <QuizScore
  //     quizId={quizId!}
  //     score={score}
  //     numberOfQuestions={questions.length}
  //     resetQuiz={resetQuiz}
  //   />
  // ) : (
  //   <Question
  //     numberOfQuestions={questions.length}
  //     questionNumber={questionNumber + 1}
  //     question={question}
  //   >
  //     <AnswerList
  //       key={questionNumber}
  //       handleResponse={handleResponse}
  //       nextQuestion={nextQuestion}
  //       correctAnswer={answer}
  //       options={options}
  //       answerStatus={answerStatus}
  //       quizStatus={quizStatus}
  //     />
  //   </Question>
  // );
}
