import { Express } from "express";
import { validate } from "./middleware/validate.js";

import {
  createQuizAttemptHandler,
  getQuizHandler,
  getQuizQuestionsHandler,
  getQuizzesAndAttemptsHandler,
} from "./controllers/quizzes.controller.js";
import {
  createQuizAttemptSchema,
  getQuizQuestionsSchema,
  getQuizSchema,
} from "./schema/quizzes.schema.js";

function routes(app: Express) {
  app.get("/api/quiz", getQuizzesAndAttemptsHandler);

  app.get("/api/quiz/:quizId", validate(getQuizSchema), getQuizHandler);

  app.get(
    "/api/quiz/:quizId/questions",
    validate(getQuizQuestionsSchema),
    getQuizQuestionsHandler
  );

  app.post(
    "/api/attempt",
    validate(createQuizAttemptSchema),
    createQuizAttemptHandler
  );
}

export default routes;
