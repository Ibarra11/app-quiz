import { Link } from "react-router-dom";
import { QuizList } from "./home";

export default function QuizList({ quizList }: QuizList) {
  return (
    <ul className=" space-y-3">
      {quizList.map(({ title, icon }) => (
        <li key={title}>
          <Link
            className="flex items-center gap-4 p-3 bg-navy-200 rounded-xl"
            to={`/quiz/${title}`}
          >
            <img
              className={`block w-10 h-10`}
              aria-hidden={true}
              src={icon.toLowerCase()}
            />
            <p className="text-lg font-medium text-white">{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
