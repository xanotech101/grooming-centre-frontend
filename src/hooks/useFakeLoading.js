import { useEffect, useState } from "react";

/**
 * Fake a loading state
 * @returns isLoading: `boolean`
 */
export const useFakeLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, Math.floor(Math.random() * 1500 + 500));
  }, []);

  return isLoading;
};
