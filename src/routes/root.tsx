import { Link, Outlet, useParams } from "react-router-dom";
import ToggleTheme from "../components/ToggleTheme";

export default function Root() {
  const params = useParams();

  return (
    <div className="h-screen bg-light-gray bg-mobile-light bg-no-repeat dark:bg-navy-300 dark:bg-mobile-dark ">
      <div className="mx-auto min-w-[320px] max-w-6xl space-y-8 px-6 py-4 md:space-y-9 md:px-16 md:pt-10 lg:space-y-16 lg:px-0 lg:pt-20">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            {params && params.quizId && (
              <>
                <img
                  alt=""
                  aria-hidden={true}
                  className="block h-10 w-10 rounded-md lg:h-14 lg:w-14"
                  src={`/icon-${params.quizId.toLowerCase()}.svg`}
                />
                <h1 className="text-lg font-medium text-navy-300 dark:text-white md:text-2xl">
                  {params.quizId}
                </h1>
              </>
            )}
          </Link>
          <ToggleTheme />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
