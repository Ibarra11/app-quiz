export interface Quiz {
  quiz_id: number;
  quiz_name: string;
  icon: string;
}

interface Quiz_Attempts {
  attempt_id: number;
  quiz_id: number;
  score: number;
}
