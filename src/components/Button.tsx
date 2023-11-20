import { ComponentProps } from "react";

export default function Button({
  children,
  className,
  ...delegated
}: React.PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      className={`bg-purple py-4 text-white text-lg font-medium w-full rounded-xl ${className} md:text-2xl md:py-6 md:rounded-3xl`}
      {...delegated}
    >
      {children}
    </button>
  );
}
