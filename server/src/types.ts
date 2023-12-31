interface Quizzes {
  quiz_id: number;
  quiz_name: string;
}

interface Quiz_Attempts {
  attempt_id: number;
  quiz_id: number;
  score: number;
}
