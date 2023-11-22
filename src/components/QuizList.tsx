import { Link } from "react-router-dom";
import type { QuizList } from "../routes";

export default function QuizList({ quizList }: QuizList) {
  return (
    <ul className="space-y-3 md:space-y-6">
      {quizList.map(({ title, icon }) => (
        <li key={title}>
          <Link
            className="flex items-center gap-4 rounded-xl bg-navy-200 p-3 lg:p-5"
            to={`/quiz/${title}`}
          >
            <img
              className={`block h-10 w-10 md:h-14 md:w-14`}
              aria-hidden={true}
              src={icon.toLowerCase()}
            />
            <h2 className="text-lg font-medium text-white md:text-2xl">
              {title}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
