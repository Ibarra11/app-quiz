import { number, coerce, object, TypeOf } from "zod";
const payload = object({
  body: object({
    quizId: number({
      required_error: "quizId is required",
    }),
    score: number({
      required_error: "score is required",
    }),
  }),
});

const params = object({
  params: object({
    quizId: coerce.number(),
  }),
});

export const createQuizAttemptSchema = payload;
export const getQuizSchema = params;
export const getQuizQuestionsSchema = params;

export type CreateQuizAttemptInput = TypeOf<typeof createQuizAttemptSchema>;
export type GetQuizInput = TypeOf<typeof getQuizSchema>;
export type getQuizQuestionsInput = TypeOf<typeof getQuizQuestionsSchema>;
