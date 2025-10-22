import { useEffect, useRef, useState } from "react";
import { getExpenses } from "@/lib/expense";
import { getActiveDatesInWeek } from "@/lib/date";
import type { Expense } from "@/models/expense";

type Week = {
  start: string; // "yyyy-MM-dd"
  end: string; // "yyyy-MM-dd"
};

export function useWeekExpenses(
  userId: string,
  activeDates: string[],
  week: Week
) {
  const [data, setData] = useState<{
    expensesByDay: Record<string, Expense[]>;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cache: Map<"start_end", { expensesByDay }>
  const cacheRef = useRef<
    Map<string, { expensesByDay: Record<string, Expense[]> }>
  >(new Map());

  useEffect(() => {
    if (!userId || !week?.start || !week?.end) return;

    const weekKey = `${week.start}_${week.end}`;

    // Serve from cache instantly if available
    if (cacheRef.current.has(weekKey)) {
      setData(cacheRef.current.get(weekKey)!);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const activeDatesInWeek = getActiveDatesInWeek(
      activeDates,
      week.start,
      week.end
    );
    console.log("activeDatesInWeek:", activeDatesInWeek);

    (async () => {
      try {
        const results = await Promise.all(
          activeDatesInWeek.map((date) => getExpenses(userId, date))
        );

        const expensesByDay: Record<string, Expense[]> = {};
        activeDatesInWeek.forEach((date, i) => {
          expensesByDay[date] = results[i];
        });

        const weekData = { expensesByDay };
        cacheRef.current.set(weekKey, weekData);
        setData(weekData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, week.start, week.end]);

  return { data, loading, error };
}
