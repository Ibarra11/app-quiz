import { ComponentProps } from "react";

export default function Button({
  children,
  className,
  ...delegated
}: React.PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      className={`w-full rounded-xl bg-purple py-4 text-lg font-medium text-white ${className} md:rounded-3xl md:py-6 md:text-2xl`}
      {...delegated}
    >
      {children}
    </button>
  );
}
