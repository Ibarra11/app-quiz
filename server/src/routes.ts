import { Express } from "express";
import { validate } from "./middleware/validate.js";

import {
  createQuizAttempt,
  getQuizHandler,
  getQuizQuestions,
  getQuizzesHandler,
} from "./controllers/quizzes.controller.js";
import {
  createQuizAttemptSchema,
  getQuizQuestionsSchema,
  getQuizSchema,
} from "./schema/quizzes.schema.js";

function routes(app: Express) {
  app.get("/api/quiz", getQuizzesHandler);

  app.get("/api/quiz/:quizId", validate(getQuizSchema), getQuizHandler);

  app.get(
    "/api/quiz/:quizId/questions",
    validate(getQuizQuestionsSchema),
    getQuizQuestions
  );

  app.post(
    "/api/attempt",
    validate(createQuizAttemptSchema),
    createQuizAttempt
  );
}

export default routes;
