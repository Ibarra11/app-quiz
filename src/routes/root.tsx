import { Outlet, useParams } from "react-router-dom";
import ToggleTheme from "../components/ToggleTheme";

export default function Root() {
  const params = useParams();

  return (
    <div className="bg-mobile-dark bg-no-repeat h-screen bg-navy-300 ">
      <div className="min-w-[320px] mx-auto">
        <header className="flex justify-between py-4 px-6">
          <div className="flex gap-4 items-center">
            {params && params.quizId && (
              <>
                <img
                  alt=""
                  aria-hidden={true}
                  className="block rounded-md h-10 w-10 "
                  src={`/icon-${params.quizId.toLowerCase()}.svg`}
                />
                <h1 className="text-lg font-medium text-white">
                  {params.quizId}
                </h1>
              </>
            )}
          </div>
          <ToggleTheme />
        </header>
        <main className="py-8 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
