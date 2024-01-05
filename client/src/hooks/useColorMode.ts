import React from "react";
import { getInitialColorMode } from "../lib/getIntialColorMode";

export default function useColorMode() {
  const [mode] = React.useState<"light" | "dark">(getInitialColorMode);

  React.useEffect(() => {
    window.localStorage.setItem("color-mode", mode);
    document.documentElement.classList.remove(...["dark", "light"]);
    document.documentElement.classList.add(mode);
  }, [mode]);
}
