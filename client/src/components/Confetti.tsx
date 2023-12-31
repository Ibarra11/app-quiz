import ReactConfetti from "react-confetti";
import useWindowSize from "../hooks/useWindowSize";
export default function Confetti() {
  const { width, height } = useWindowSize();
  return <ReactConfetti recycle={false} width={width} height={height} />;
}
