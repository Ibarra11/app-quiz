import { ComponentProps } from "react";

export default function Button({
  children,
  className,
  ...delegated
}: React.PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      className={`bg-purple h-14 text-white text-lg font-medium w-full rounded-xl ${className}`}
      {...delegated}
    >
      {children}
    </button>
  );
}
