import { useExpenses } from "@/hooks/useExpenses";
import clsx from "clsx";

interface PrevDayComparisonProps {
  prevDate: string | null;
  totalToday: number;
}

const baseClass =
  "mt-4 p-4 text-center text-xs sm:text-sm max-w-sm mx-auto rounded-md";
export default function PrevDayComparison({
  prevDate,
  totalToday,
}: PrevDayComparisonProps) {
  const {
    expenses: prevExpenses,
    loading,
    error,
  } = useExpenses(
    "demoUser",
    prevDate ?? "" // Pass empty string or some dummy date so hook always runs
  );

  // If no prevDate, just show the no data box immediately, ignoring hook state
  if (!prevDate) {
    return (
      <div className={clsx(baseClass, "bg-tealBg text-teal")}>
        No expenses were tracked yesterday
      </div>
    );
  }
  if (loading) {
    return (
      <div className={clsx(baseClass, "bg-secondary/20")}>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 text-teal text-sm font-medium">
            <span className="h-3 w-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
            <span>Comparing...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(baseClass, "bg-red-700 text-red-100")}>
        Error loading yesterday expenses
      </div>
    );
  }

  if (!prevExpenses || prevExpenses.length === 0) {
    return (
      <div className="bg-tealBg text-teal">
        No expenses were tracked yesterday
      </div>
    );
  }

  const prevTotal = prevExpenses.reduce(
    (sum, expense) => sum + expense.cost,
    0
  );

  // Calculate percentage change
  // Handle division by zero gracefully
  const diff = totalToday - prevTotal;
  const percentageChange =
    prevTotal === 0 ? (diff > 0 ? 100 : 0) : (diff / prevTotal) * 100;

  const isIncrease = percentageChange > 0;
  const isDecrease = percentageChange < 0;
  const isNoChange = percentageChange === 0;

  return (
    <div
      className={clsx(
        baseClass,
        isIncrease
          ? "bg-redBg text-red"
          : isDecrease
          ? "bg-freshBg text-green-200"
          : "bg-gray-700 text-gray-300"
      )}
    >
      {isIncrease && (
        <>
          <span className="font-semibold">+{percentageChange.toFixed(1)}%</span>{" "}
          compared to yesterday
        </>
      )}
      {isDecrease && (
        <>
          <span className="font-semibold">
            −{Math.abs(percentageChange).toFixed(1)}%
          </span>{" "}
          compared to yesterday
        </>
      )}
      {isNoChange && <>No change compared to yesterday</>}
    </div>
  );
}
