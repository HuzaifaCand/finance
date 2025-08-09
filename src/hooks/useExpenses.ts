import { useEffect, useState, useRef } from "react";
import type { Expense } from "@/models/expense";
import { getExpenses } from "@/lib/expense";

export function useExpenses(userId: string, date: string) {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cache: Map<date, Expense[]>
  const cacheRef = useRef<Map<string, Expense[]>>(new Map());

  useEffect(() => {
    if (!userId || !date) return;

    // Serve from cache instantly if available
    if (cacheRef.current.has(date)) {
      setExpenses(cacheRef.current.get(date)!);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const expensesData = await getExpenses(userId, date);
        cacheRef.current.set(date, expensesData);

        if (isMounted) setExpenses(expensesData);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [userId, date]);

  return { expenses, loading, error };
}
