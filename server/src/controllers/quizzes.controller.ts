import { NextFunction, Request, Response } from "express";
import {
  CreateQuizAttemptInput,
  GetQuizInput,
  getQuizQuestionsInput,
} from "../schema/quizzes.schema.js";
import { ParamsDictionary } from "express-serve-static-core";
import {
  createQuizAttempt,
  getQuiz,
  getQuizQuestions,
  getQuizzesAndAttempts,
} from "../services/quizzes.service.js";
export async function getQuizzesAndAttemptsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await getQuizzesAndAttempts();

    if (!data) {
      return res.sendStatus(404);
    }

    return res.send({ data });
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getQuizHandler(
  req: Request<ParamsDictionary & GetQuizInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await getQuiz({ quizId: req.params.quizId });
    if (!data) {
      return res.sendStatus(404);
    }

    return res.send({ data });
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getQuizQuestionsHandler(
  req: Request<ParamsDictionary & getQuizQuestionsInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await getQuizQuestions({ quizId: req.params.quizId });
    if (!data) {
      return res.sendStatus(404);
    }
    return res.send({ data });
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function createQuizAttemptHandler(
  req: Request<{}, {}, CreateQuizAttemptInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { quizId, score } = req.body;
    const data = await createQuizAttempt({ quizId, score });
    if (!data) {
      return res.sendStatus(409);
    }
    return res.status(200).json({ message: "Score recorded successfully" });
  } catch (e) {
    return res.sendStatus(500);
  }
}
