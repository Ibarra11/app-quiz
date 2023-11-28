import * as Switch from "@radix-ui/react-switch";
import { getInitialColorMode } from "../lib/getIntialColorMode";
import React from "react";
export default function ToggleTheme() {
  const [mode, setMode] = React.useState<"light" | "dark">(getInitialColorMode);

  React.useEffect(() => {
    window.localStorage.setItem("color-mode", mode);
    document.documentElement.classList.remove(...["dark", "light"]);
    document.documentElement.classList.add(mode);
  }, [mode]);

  return (
    <div className="flex items-center gap-2">
      <span className="h-6 w-6 bg-sun-light bg-cover dark:bg-sun-dark"></span>
      <Switch.Root
        checked={mode === "dark"}
        onCheckedChange={(e) => {
          setMode(e ? "dark" : "light");
        }}
        defaultChecked
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite"
        className=" bg-blackA6 bg-purple-300 relative h-7 w-12 rounded-full"
      >
        <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full  bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[24px]" />
      </Switch.Root>
      <span className="h-6 w-6 bg-moon-light bg-cover dark:bg-moon-dark"></span>
    </div>
  );
}
