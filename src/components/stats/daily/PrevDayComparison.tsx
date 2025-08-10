import { useExpenses } from "@/hooks/useExpenses";
import clsx from "clsx";

interface PrevDayComparisonProps {
  prevDate: string | null;
  totalToday: number;
}

const baseClass =
  "mt-4 py-4 px-4 sm:py-6 text-center text-sm rounded-md transition duration-200";

function NoExpenses() {
  return (
    <div className={clsx(baseClass, "bg-tealBg/60 hover:bg-tealBg ")}>
      <div className="my-1.5">
        <p className="uppercase text-teal/80 text-sm tracking-wide mb-1">
          Daily Change Comparison unavailable
        </p>
        <p className="text-muted">No expenses were tracked yesterday</p>
      </div>
    </div>
  );
}
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
    return <NoExpenses />;
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
        Error comparing with yestrerday
      </div>
    );
  }

  if (!prevExpenses || prevExpenses.length === 0) {
    return <NoExpenses />;
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
          ? "bg-redBg/60 text-red hover:bg-redBg"
          : isDecrease
          ? "bg-freshBg/60 hover:bg-freshBg text-fresh"
          : "bg-gray-700/60 hover:bg-gray-700 text-gray-300"
      )}
    >
      {isIncrease && (
        <div className="flex flex-col items-center text-center">
          <p className="font-semibold text-lg sm:text-xl">
            +{Math.abs(percentageChange).toFixed(1)}%
          </p>
          <p className="tracking-wide text-red/80 mt-1 text-xs sm:text-sm">
            COMPARED TO YESTERDAY
          </p>
        </div>
      )}
      {isDecrease && (
        <div className="flex flex-col items-center text-center">
          <p className="font-semibold text-lg sm:text-xl">
            −{Math.abs(percentageChange).toFixed(1)}%
          </p>
          <p className="tracking-wide text-muted mt-1 text-xs sm:text-sm">
            COMPARED TO YESTERDAY
          </p>
        </div>
      )}
      {isNoChange && (
        <div className="flex flex-col items-center text-center">
          <p className="font-semibold text-lg sm:text-xl">
            {Math.abs(percentageChange).toFixed(0)}% Change
          </p>
          <p className="tracking-wide text-gray-200/60 mt-1 text-xs sm:text-sm">
            COMPARED TO YESTERDAY
          </p>
        </div>
      )}
    </div>
  );
}
