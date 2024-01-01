import { useLoaderData } from "react-router-dom";
import Quizzes from "../components/Quizzes";
import type { Quiz } from "../types";
export async function loader() {
  const res = await fetch("/api/quizzes");
  console.log(res);
  const { data }: { data: Quiz[] } = await res.json();
  return { quizzes: data };
}

export type QuizList = Awaited<ReturnType<typeof loader>>;

export default function Index() {
  const { quizzes } = useLoaderData() as QuizList;
  return (
    <div className="flex flex-col gap-10 md:gap-16 lg:flex-row lg:justify-between">
      <div className="space-y-4  lg:space-y-12">
        <h1 className="text-4xl text-navy-300 dark:text-white md:text-6xl ">
          <span className="font-light">Welcome to the</span>
          <br />
          <span className="font-medium">Frontend Quiz!</span>
        </h1>
        <h3 className="text-sm italic text-navy-100 dark:text-light-blue md:text-xl">
          Pick a subject to get started.
        </h3>
      </div>
      <div className="lg:w-[456px]">
        <Quizzes quizzes={quizzes} />
      </div>
    </div>
  );
}
