import { ComponentProps } from "react";

export default function Button({
  children,
  className,
  ...delegated
}: React.PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      className={`bg-purple-300 w-full rounded-xl py-4 text-lg font-medium text-white ${className}  hover:bg-purple-200 transition-colors md:rounded-3xl md:py-6 md:text-2xl`}
      {...delegated}
    >
      {children}
    </button>
  );
}
