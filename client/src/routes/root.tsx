import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <div className="h-screen bg-light-gray bg-mobile-light bg-no-repeat dark:bg-navy-300 dark:bg-mobile-dark ">
      <div className="mx-auto min-w-[320px] max-w-6xl space-y-8 px-6 py-4 md:space-y-9 md:px-16 md:pt-10 lg:space-y-16 lg:px-0 lg:pt-20">
        <Outlet />
      </div>
    </div>
  );
}
