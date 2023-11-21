import React from "react";

export default function useWindowSize() {
  const [dimensions, setDimensions] = React.useState<{
    width: undefined | number;
    height: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });

  React.useLayoutEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });
  }, []);

  return dimensions;
}
