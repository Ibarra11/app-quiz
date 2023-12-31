import React from "react";
import ReactConfetti from "react-confetti";
import useWindowSize from "../src/hooks/useWindowSize";
export default function Confetti() {
  const { width, height } = useWindowSize();
  return <ReactConfetti recycle={false} width={width} height={height} />;
}
