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
    <div className="space-y-10">
      <h2 className="text-4xl text-white">
        <span className="font-light">Quiz Completed</span>
        <br />
        <span className="font-medium">You Scored ...</span>
      </h2>
      <div className="space-y-4">
        <div className="bg-navy-200 p-8 space-y-5 rounded-xl">
          <div className="flex gap-4 justify-center items-center">
            <img
              alt=""
              aria-hidden={true}
              className="block rounded-md h-10 w-10 "
              src={`/icon-${quizId.toLowerCase()}.svg`}
            />
            <h3 className="text-lg text-white font-medium">{quizId}</h3>
          </div>
          <div className="space-y-4 text-center">
            <p className=" text-7xl text-white font-medium">{score}</p>
            <p className=" text-lg text-light-blue">
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
