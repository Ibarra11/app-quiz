import { NextFunction, Request, Response } from "express";
import {
  CreateQuizAttemptInput,
  GetQuizInput,
  getQuizQuestionsInput,
} from "../schema/quizzes.schema.js";
import * as db from "../db/index.js";
import { ParamsDictionary } from "express-serve-static-core";
export async function getQuizzesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await db.query({
      text: `
      SELECT
    q.quiz_id,
    q.quiz_name,
    q.icon,
    COUNT(qa.attempt_id)::INT AS attempts,
    COALESCE(ROUND(AVG(score)), 0)::INT as avg_score 
    FROM
        quizzes q
    LEFT JOIN
        quiz_attempts qa ON q.quiz_id = qa.quiz_id
    GROUP BY
        q.quiz_id, q.quiz_name
    ORDER BY
        q.quiz_id;
    `,
    });
    res.send({ data: result.rows });
  } catch (e) {
    //   if (e instanceof Error) {
    //      next(e);
    //   }
    //  const error =
  }
}

export async function getQuizHandler(
  req: Request<ParamsDictionary & GetQuizInput["params"]>,
  res: Response,
  next: NextFunction
) {
  const result = await db.query({
    text: "SELECT * FROM quizzes WHERE quiz_id = ($1)",
    values: [req.params.quizId],
  });
  // No quiz found
  if (result.rowCount === 0) {
    res.sendStatus(404);
    return;
  }

  res.send({ data: result.rows[0] });
}

export async function getQuizQuestions(
  req: Request<ParamsDictionary & getQuizQuestionsInput["params"]>,
  res: Response,
  next: NextFunction
) {
  const result = await db.query({
    text: "SELECT * FROM questions WHERE quiz_id = ($1)",
    values: [req.params.quizId],
  });
  if (result.rowCount === 0) {
    res.sendStatus(404);
    return;
  }
  res.send({ data: result.rows });
}

export async function createQuizAttempt(
  req: Request<{}, {}, CreateQuizAttemptInput["body"]> & { user: string },
  res: Response,
  next: NextFunction
) {
  const { quizId, score } = req.body;

  await db.query({
    text: `
          INSERT INTO quiz_attempts (quiz_id, score)
          VALUES($1, $2)
          `,
    values: [quizId, score],
  });

  res.status(200).json({ message: "Score recorded successfully" });
}
