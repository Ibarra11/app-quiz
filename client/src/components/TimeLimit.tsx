import React from "react";
import { TimerIcon } from "@radix-ui/react-icons";
import { AnswerStatus } from "../types";

// time is in seconds
export default function TimeLimit({
  timeLimit = 30,
  cb,
  answerStatus,
}: {
  timeLimit?: number;
  cb: () => void;
  answerStatus: AnswerStatus;
}) {
  const [time, setTime] = React.useState(timeLimit);
  const intervalId = React.useRef<number>();
  React.useEffect(() => {
    intervalId.current = window.setInterval(() => {
      setTime((currTime) => currTime - 1);
    }, 1000);
    return () => {
      window.clearInterval(intervalId.current);
    };
  }, []);
  React.useEffect(() => {
    if (answerStatus !== "idle") {
      window.clearInterval(intervalId.current);
    }
  }, [answerStatus]);

  React.useEffect(() => {
    if (answerStatus === "idle" && time === 0) {
      cb();
      window.clearInterval(intervalId.current);
    }
  }, [answerStatus, time, cb]);

  return (
    <div className="relative flex items-center gap-1 text-slate-300">
      <div>
        <TimerIcon aria-hidden="true" width={16} height={16} />
        <span className="sr-only">Clock Icon</span>
      </div>

      <time className="  text-base">{time}</time>
    </div>
  );
}
