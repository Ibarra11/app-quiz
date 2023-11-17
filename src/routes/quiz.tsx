import { useParams } from "react-router-dom";

export async function loader() {}

export default function Quiz() {
  const { quizId } = useParams();
  return <p>{quizId}</p>;
}
