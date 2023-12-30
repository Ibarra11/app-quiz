CREATE TABLE quiz(
     quiz_id SERIAL PRIMARY KEY,
     title TEXT NOT NULL
)
CREATE TABLE score(
    score_id SERIAL PRIMARY KEY,
    score INTEGER,
    quiz_id INTEGER,
    CONSTRAINT fk_quiz
      FOREIGN KEY(quiz_id) 
	  REFERENCES quiz(quiz_id)
)