import Button from "./Button";
import Confetti from "./Confetti";

export default function QuizScore({
  quizId,
  score,
  numberOfQuestions,
}: {
  quizId: string;
  score: number;
  numberOfQuestions: number;
  resetQuiz: () => void;
}) {
  const result = Math.round((score / numberOfQuestions) * 100);
  return (
    <div className="flex flex-col gap-10 md:gap-16 lg:flex-row lg:gap-20">
      {result >= 80 && <Confetti />}
      <h2 className="text-4xl text-white md:text-6xl">
        <span className="font-light">Quiz Completed</span>
        <br />
        <span className="font-medium">You Scored ...</span>
      </h2>
      <div className="space-y-4 lg:flex-1">
        <div className="space-y-5 rounded-xl bg-navy-200 p-8 md:p-12">
          <div className="flex items-center justify-center gap-4">
            <img
              alt=""
              aria-hidden={true}
              className="block h-10 w-10 rounded-md md:h-14 md:w-14 "
              src={`/icon-${quizId.toLowerCase()}.svg`}
            />
            <h3 className="md:text- text-lg font-medium text-white">
              {quizId}
            </h3>
          </div>
          <div className="space-y-4 text-center">
            <p className=" text-7xl font-medium text-white md:text-9xl">
              {score}
            </p>
            <p className=" text-lg text-light-blue md:text-2xl">
              out of {numberOfQuestions}
            </p>
          </div>
        </div>
        <form>
          <Button>Play Again</Button>
        </form>
      </div>
    </div>
  );
}
