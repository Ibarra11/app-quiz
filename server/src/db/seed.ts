import * as db from "./index.js";
import data from "./data.json";
// expand(3,2) => ($1, $2), ($3, $4), ($5, $6)
function expand(rowCount: number, columnCount: number, startAt = 1) {
  let index = startAt;
  return Array(rowCount)
    .fill(0)
    .map(
      (v) =>
        `(${Array(columnCount)
          .fill(0)
          .map((v) => `$${index++}`)
          .join(", ")})`
    )
    .join(", ");
}

async function seedDatabase() {
  const client = await db.getClient();
  try {
    await client.query("BEGIN"); // Start a transaction

    await client.query("DROP TABLE IF EXISTS quizzes CASCADE");
    await client.query("DROP TABLE IF EXISTS quiz_attempts");
    await client.query("DROP TABLE IF EXISTS questions");

    await client.query(`
      CREATE TABLE quizzes (
        quiz_id SERIAL PRIMARY KEY,
        quiz_name TEXT NOT NULL,
        icon TEXT NOT NULL
       )
     `);
    await client.query(`
        CREATE TABLE quiz_attempts(
          attempt_id SERIAL PRIMARY KEY,
          quiz_id INT,
          score DECIMAL(5,2),
          FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
        )
    `);
    await client.query(`
      CREATE TABLE questions(
      question_id SERIAL PRIMARY KEY,
      quiz_id INT NOT NULL,
      question_text TEXT NOT NULL,
      options JSONB NOT NULL,
      correct_option INT NOT NULL CHECK (correct_option >= 0),
      FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
      )
    `);

    const quizzesPlaceholders = expand(data.quizzes.length, 2);
    const quizzesValues = data.quizzes.reduce((acc, row) => {
      acc.push(row.name, row.icon);
      return acc;
    }, [] as string[]);
    const insertIntoQuizzesTableQuery = await client.query(
      `
        INSERT INTO quizzes (quiz_name, icon) 
        VALUES ${quizzesPlaceholders} RETURNING *
    `,
      quizzesValues
    );
    const questionsPlaceholders = expand(
      data.quizzes
        .map((quiz) => quiz.questions.length)
        .reduce((acc, curr) => acc + curr),
      4
    );
    console.log(questionsPlaceholders);
    const questionsValues = insertIntoQuizzesTableQuery.rows.reduce(
      (acc, row) => {
        const quiz = data.quizzes.find((quiz) => quiz.name === row.quiz_name)!;
        quiz.questions.forEach((question) => {
          acc.push(
            row.quiz_id,
            question.question,
            JSON.stringify(question.options),
            question.answer
          );
        });
        return acc;
      },
      [] as any
    );

    console.log(questionsValues);

    await client.query(
      `
        INSERT INTO questions (quiz_id, question_text, options, correct_option) 
        VALUES ${questionsPlaceholders}
    `,
      questionsValues
    );

    await client.query("COMMIT"); // Commit the transaction
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

seedDatabase();
