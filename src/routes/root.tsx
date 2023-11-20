import { Outlet, useParams } from "react-router-dom";
import ToggleTheme from "../components/ToggleTheme";

export default function Root() {
  const params = useParams();

  return (
    <div className="bg-mobile-dark bg-no-repeat h-screen bg-navy-300 ">
      <div className="min-w-[320px] mx-auto space-y-8 max-w-6xl px-6 py-4 md:space-y-9 md:pt-10 md:px-16 lg:pt-20 lg:space-y-16 lg:px-0">
        <header className="flex items-center justify-between px-6">
          <div className="flex gap-4 items-center">
            {params && params.quizId && (
              <>
                <img
                  alt=""
                  aria-hidden={true}
                  className="block rounded-md h-10 w-10 lg:h-14 lg:w-14"
                  src={`/icon-${params.quizId.toLowerCase()}.svg`}
                />
                <h1 className="text-lg font-medium text-white md:text-2xl">
                  {params.quizId}
                </h1>
              </>
            )}
          </div>
          <ToggleTheme />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
