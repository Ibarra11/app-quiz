import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import Header from "./Header";
import useColorMode from "../hooks/useColorMode";

export default function NotFound() {
  const error = useRouteError();
  useColorMode();
  return (
    <div className=" h-screen  bg-light-gray bg-mobile-light bg-no-repeat pt-12 dark:bg-navy-300 dark:bg-mobile-dark">
      <div className="flex h-full flex-col px-8">
        <Header>
          <Link className="text-3xl text-slate-300" to="/">
            FrontendQuiz
          </Link>
        </Header>
        <div className="grid flex-1 place-content-center gap-4 text-center text-slate-300">
          <h1 className="text-2xl">Oops!</h1>
          <p className="text-xl">Sorry, an unexpected error has occurred.</p>
          <p className="text-base">
            <i>
              {isRouteErrorResponse(error) ? error.statusText : "Unknown Error"}
            </i>
          </p>
          <Link
            to="/"
            className=" justify-self-center rounded bg-slate-800 px-8 py-4 "
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
