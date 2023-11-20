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
      className="relative bg-navy-200 h-4 rounded-full overflow-hidden p-1"
    >
      <Progress.Indicator
        className="bg-purple  h-full rounded-full  transition-all duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  );
}
