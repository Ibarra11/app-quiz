import { useLoaderData, type Params, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import React from "react";
import Question from "../components/Question";
import QuizScore from "../components/QuizScore";
import AnswerList from "../components/AnswerList";
import type {
  AnswerStatus,
  Question as T_Question,
  Quiz as T_Quiz,
} from "../types";
import Header from "../components/Header";

export async function loader({ params }: { params: Params<"quizId"> }) {
  const resQuestions = fetch(
    `${import.meta.env.VITE_API_URL}/quiz/${params.quizId}/questions`,
  ).then((res) => res.json());
  const resQuiz = fetch(
    `${import.meta.env.VITE_API_URL}/quiz/${params.quizId}`,
  ).then((res) => res.json());
  const [{ data: questions }, { data: quiz }] = await Promise.all<
    [Promise<{ data: T_Question[] }>, Promise<{ data: T_Quiz }>]
  >([resQuestions, resQuiz]);
  // If the quiz does not exist throw an error
  if (questions.length === 0 || !quiz) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return {
    questions,
    quiz,
  };
}

export type Quiz = Awaited<ReturnType<typeof loader>>;

export default function Quiz() {
  const [score, setScore] = React.useState(0);
  const { quiz, questions } = useLoaderData() as Quiz;
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number>(0);
  const [answerStatus, setAnswerStatus] = React.useState<AnswerStatus>("idle");
  const [quizStatus, setQuizStatus] = React.useState<"playing" | "over">(
    "playing",
  );

  React.useEffect(() => {
    if (quizStatus === "over") {
      const result = Math.round((score / questions.length) * 100);
      async function runEffect() {
        await fetch(`${import.meta.env.VITE_API_URL}/attempt`, {
          method: "POST",
          body: JSON.stringify({ quizId: quiz.quiz_id, score: result }),
          headers: new Headers({ "content-type": "application/json" }),
        });
      }
      runEffect();
    }
  }, [quizStatus]);

  const { question_text, options, correct_option, question_id } =
    questions[questionNumber];

  function handleAnswerSubmission(response: number | null) {
    if (response === correct_option) {
      setAnswerStatus("correct");
      setScore(score + 1);
    } else {
      setAnswerStatus("incorrect");
    }
  }

  function handleOptionChange(answer: number) {
    setSelectedOption(answer);
  }

  function handleTimeLimit() {
    handleAnswerSubmission(selectedOption);
  }
  function nextQuestion() {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setAnswerStatus("idle");
    } else {
      setQuizStatus("over");
    }
  }

  function resetQuiz() {
    setQuizStatus("playing");
    setScore(0);
    setQuestionNumber(0);
    setAnswerStatus("idle");
  }
  return (
    <>
      <Helmet>
        <title>Frontend Quiz | {quiz.quiz_name}</title>
        <link rel="icon" type="image/png" href={quiz.icon} sizes="16x16" />
      </Helmet>
      <Header>
        <Link to="/" className="flex items-center gap-4">
          <img
            alt="home"
            className="block h-10 w-10 rounded-md lg:h-14 lg:w-14"
            src={quiz.icon}
          />
          <h1 className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
            {quiz.quiz_name}
          </h1>
        </Link>
      </Header>
      {quizStatus === "over" ? (
        <QuizScore
          quizName={quiz.quiz_name}
          quizIcon={quiz.icon}
          score={score}
          numberOfQuestions={questions.length}
          resetQuiz={resetQuiz}
        />
      ) : (
        <Question
          key={question_id}
          numberOfQuestions={questions.length}
          questionNumber={questionNumber + 1}
          question={question_text}
          handleTimeLimit={handleTimeLimit}
          answerStatus={answerStatus}
        >
          <AnswerList
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            handleAnswerSubmission={handleAnswerSubmission}
            nextQuestion={nextQuestion}
            correctOption={correct_option}
            options={options}
            answerStatus={answerStatus}
            lastQuestion={questionNumber === questions.length - 1}
          />
        </Question>
      )}
    </>
  );
}
