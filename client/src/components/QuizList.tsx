import { Link } from "react-router-dom";
import type { QuizList } from "../routes";

export default function QuizList({ quizList }: QuizList) {
  return (
    <ul className="space-y-3 md:space-y-6">
      {quizList.map(({ title, icon }) => (
        <li
          className="rounded-xl bg-white p-3  drop-shadow-light dark:bg-navy-200 dark:drop-shadow-dark lg:p-5"
          key={title}
        >
          <Link className="flex items-center gap-4 " to={`/quiz/${title}`}>
            <img
              className={`block h-10 w-10 md:h-14 md:w-14`}
              aria-hidden={true}
              src={icon.toLowerCase()}
            />
            <h2 className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
              {title}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
