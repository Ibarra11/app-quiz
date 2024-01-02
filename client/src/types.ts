export interface Quiz {
  quiz_id: number;
  quiz_name: string;
  icon: string;
  attempts: number;
  avg_score: number;
}

export interface Question {
  question_id: number;
  quiz_id: number;
  question_text: string;
  options: string[];
  correct_option: number;
}

interface Quiz_Attempts {
  attempt_id: number;
  quiz_id: number;
  score: number;
}
