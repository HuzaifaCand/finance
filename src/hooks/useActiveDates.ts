import { useState, useEffect } from "react";
import { getActiveDates } from "@/lib/stats";

export function useActiveDates(userId: string) {
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setFetching(true);
    getActiveDates(userId)
      .then((dates) => {
        if (isMounted) {
          setActiveDates(dates);
          setFetching(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setFetching(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { activeDates, fetching, error };
}
