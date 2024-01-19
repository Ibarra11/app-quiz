import { Link } from "react-router-dom";
import { TargetIcon, BarChartIcon } from "@radix-ui/react-icons";
import { Quiz } from "../types";

export default function Quizzes({ quizzes }: { quizzes: Quiz[] }) {
  return (
    <ul className="space-y-3 md:space-y-6">
      {quizzes.map(({ quiz_id, quiz_name, icon, attempts, avg_score }) => (
        <li key={quiz_id}>
          <Link
            className="flex h-full items-center gap-4 rounded-xl bg-white p-3   drop-shadow-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300 dark:bg-navy-200 dark:drop-shadow-dark dark:focus-visible:outline-purple-700 lg:p-5"
            to={`/quiz/${quiz_id}`}
          >
            <img
              className={`block h-10 w-10 md:h-14 md:w-14`}
              aria-hidden={true}
              src={icon}
            />
            <h2 className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
              {quiz_name}
            </h2>
            <div className="ml-auto flex gap-4 text-slate-700 dark:text-white">
              <div className="flex items-center  gap-2">
                <div>
                  <TargetIcon aria-hidden="true" width={16} height={16} />
                  <span className="sr-only">Quiz Attempts Icon</span>
                </div>
                <span className="text-sm">{attempts}</span>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <BarChartIcon aria-hidden="true" width={16} height={16} />
                  <span className="sr-only">Average Score Icon</span>
                </div>
                <span className="text-sm">{avg_score}%</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
