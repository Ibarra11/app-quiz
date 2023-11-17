import { useLoaderData, type Params } from "react-router-dom";

export async function loader({ params }: { params: Params<"quizId"> }) {
  console.log(params.quizId);
  return { quizId: params.quizId };
}

export type Quiz = Awaited<ReturnType<typeof loader>>;

export default function Quiz() {
  const { quizId } = useLoaderData() as Quiz;
  return <p>{quizId}</p>;
}
