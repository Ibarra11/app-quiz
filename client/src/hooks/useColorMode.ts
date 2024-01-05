import React from "react";
import { getInitialColorMode } from "../lib/getIntialColorMode";

export default function useColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">(getInitialColorMode);

  React.useEffect(() => {
    console.log(mode);
    window.localStorage.setItem("color-mode", mode);
    document.documentElement.classList.remove(...["dark", "light"]);
    document.documentElement.classList.add(mode);
  }, [mode]);
}
