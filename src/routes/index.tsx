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
    <div className="space-y-10">
      <h1 className="text-white text-4xl">
        <span className="font-light">Welcome to the</span>
        <br />
        <span className="font-medium">Frontend Quiz!</span>
      </h1>
      <QuizList quizList={quizList} />
    </div>
  );
}
