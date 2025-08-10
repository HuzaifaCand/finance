import { useState, useEffect } from "react";
import { getActiveDates } from "@/lib/stats";

export function useActiveDates(userId: string) {
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getActiveDates(userId)
      .then((dates) => {
        if (isMounted) {
          setActiveDates(dates);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { activeDates, loading, error };
}
