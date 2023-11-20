import { useLoaderData } from "react-router-dom";
import data from "../data.json";
import QuizList from "../components/QuizList";
export async function loader() {
  const quizList: { title: string; icon: string }[] = data.quizzes.map(
    ({ title, icon }: { title: string; icon: string }) => ({ title, icon })
  );
  return { quizList };
}

export type QuizList = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const { quizList } = useLoaderData() as QuizList;
  return (
    <div className="flex flex-col gap-10 md:gap-16 lg:flex-row lg:justify-between">
      <div className="space-y-4  lg:space-y-12">
        <h1 className="text-white text-4xl md:text-6xl">
          <span className="font-light">Welcome to the</span>
          <br />
          <span className="font-medium">Frontend Quiz!</span>
        </h1>
        <h3 className="text-sm text-light-blue italic md:text-xl">
          Pick a subject to get started.
        </h3>
      </div>
      <div className="lg:w-[456px]">
        <QuizList quizList={quizList} />
      </div>
    </div>
  );
}
