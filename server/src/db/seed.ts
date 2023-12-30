import * as db from "./index.js";

async function seedDatabase() {
  const client = await db.getClient();
  try {
    const createQuizTableQuery = `
      CREATE TABLE IF NOT EXISTS quizzes (
         quiz_id SERIAL PRIMARY KEY,
        quiz_name TEXT NOT NULL
       )
     `;
    const createAttemptsTableQuery = `
        CREATE TABLE IF NOT EXISTS quiz_attempts(
          attempt_id SERIAL PRIMARY KEY,
          quiz_id INT,
          score DECIMAL(5,2),
          FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id)
        )
    `;
    const insertIntoQuizTableQuery = `
     INSERT INTO quizzes (quiz_name)
     VALUES
     ('HTML'),
     ('CSS'),
     ('Javascript'),
     ('Accessibility')
    `;

    await Promise.all([
      client.query(createQuizTableQuery),
      client.query(createAttemptsTableQuery),
      client.query(insertIntoQuizTableQuery),
    ]);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }
}

seedDatabase();
