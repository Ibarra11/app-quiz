import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Index from "./routes";
import { loader as indexLoader } from "./routes/index";
import Quiz from "./routes/quiz";
import { loader as quizLoader } from "./routes/quiz";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,

    children: [
      { index: true, element: <Index />, loader: indexLoader },
      {
        path: "/quiz/:quizId",
        element: <Quiz />,
        loader: quizLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
