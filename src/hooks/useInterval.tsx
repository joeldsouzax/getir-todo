import * as React from "react";

export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = React.useRef<() => void>();
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function callFunction() {
      savedCallback.current!();
    }
    if (delay !== null) {
      const id = setInterval(callFunction, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};
