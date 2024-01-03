import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import * as db from "./db/index.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/quiz", async (req, res) => {
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
});

app.get("/api/quiz/:id", async (req, res) => {
  const result = await db.query({
    text: "SELECT * FROM quizzes WHERE quiz_id = ($1)",
    values: [req.params.id],
  });
  res.send({ data: result.rows[0] });
});

app.get("/api/quiz/:id/questions", async (req, res) => {
  const result = await db.query({
    text: "SELECT * FROM questions WHERE quiz_id = ($1)",
    values: [req.params.id],
  });
  res.send({ data: result.rows });
});

app.get("/attempts", async (req, res) => {
  const result = await db.query({
    text: "SELECT * FROM quiz_attempts",
  });

  res.send({ data: result.rows });
});

app.post("/api/attempt", async (req, res) => {
  const { quizId, score } = req.body;
  await db.query({
    text: `
          INSERT INTO quiz_attempts (quiz_id, score)
          VALUES($1, $2)
          `,
    values: [quizId, score],
  });

  res.status(200).json({ message: "Score recorded successfully" });
});

// creates and starts a server for our API on a defined port
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
