import { Link } from "react-router-dom";
import type { QuizList } from "../routes";

export default function QuizList({ quizList }: QuizList) {
  return (
    <ul className="space-y-3 md:space-y-6">
      {quizList.map(({ title, icon }) => (
        <li key={title}>
          <Link
            className="flex items-center gap-4 p-3 bg-navy-200 rounded-xl lg:p-5"
            to={`/quiz/${title}`}
          >
            <img
              className={`block w-10 h-10 md:w-14 md:h-14`}
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
