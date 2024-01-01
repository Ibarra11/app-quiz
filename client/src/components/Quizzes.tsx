import { Link } from "react-router-dom";
import { Quiz } from "../types";

export default function Quizzes({ quizzes }: { quizzes: Quiz[] }) {
  return (
    <ul className="space-y-3 md:space-y-6">
      {quizzes.map(({ quiz_id, quiz_name, icon }) => (
        <li
          className="rounded-xl bg-white p-3  drop-shadow-light dark:bg-navy-200 dark:drop-shadow-dark lg:p-5"
          key={quiz_id}
        >
          <Link className="flex items-center gap-4 " to={`/quiz/${quiz_id}`}>
            <img
              className={`block h-10 w-10 md:h-14 md:w-14`}
              aria-hidden={true}
              src={icon}
            />
            <h2 className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
              {quiz_name}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
