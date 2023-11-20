import Button from "./Button";
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
  return (
    <div className="flex flex-col gap-10 md:gap-16 lg:flex-row lg:gap-20">
      <h2 className="text-4xl text-white md:text-6xl">
        <span className="font-light">Quiz Completed</span>
        <br />
        <span className="font-medium">You Scored ...</span>
      </h2>
      <div className="space-y-4 lg:flex-1">
        <div className="bg-navy-200 p-8 space-y-5 rounded-xl md:p-12">
          <div className="flex gap-4 justify-center items-center">
            <img
              alt=""
              aria-hidden={true}
              className="block rounded-md h-10 w-10 md:h-14 md:w-14 "
              src={`/icon-${quizId.toLowerCase()}.svg`}
            />
            <h3 className="text-lg text-white font-medium md:text-">
              {quizId}
            </h3>
          </div>
          <div className="space-y-4 text-center">
            <p className=" text-7xl text-white font-medium md:text-9xl">
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
