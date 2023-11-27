import * as Progress from "@radix-ui/react-progress";
export default function CompletionBar({ progress }: { progress: number }) {
  return (
    <Progress.Root
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
      className="relative h-4 overflow-hidden rounded-full bg-white p-1 dark:bg-navy-200"
    >
      <Progress.Indicator
        className="ease-[cubic-bezier(0.65,  0, 0.35,  1)] h-full rounded-full bg-purple transition-all duration-[660ms]"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  );
}
