import * as db from "../db/index.js";
export async function getQuizzesAndAttempts() {
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
  if (result.rowCount === 0) return false;
  return result.rows;
}
export async function getQuiz({ quizId }: { quizId: number }) {
  const result = await db.query({
    text: "SELECT * FROM quizzes WHERE quiz_id = ($1)",
    values: [quizId],
  });
  if (result.rowCount === 0) {
    return false;
  }
  return result.rows[0];
}

export async function getQuizQuestions({ quizId }: { quizId: number }) {
  const result = await db.query({
    text: "SELECT * FROM questions WHERE quiz_id = ($1)",
    values: [quizId],
  });
  if (result.rowCount === 0) {
    return false;
  }
  return result.rows;
}

export async function createQuizAttempt({
  quizId,
  score,
}: {
  quizId: number;
  score: number;
}) {
  const result = await db.query({
    text: `
          INSERT INTO quiz_attempts (quiz_id, score)
          VALUES($1, $2)
          RETURNING *
          `,
    values: [quizId, score],
  });
  if (result.rowCount === 0) {
    return false;
  }
  return result.rows[0];
}
