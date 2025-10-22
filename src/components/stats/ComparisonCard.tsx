import clsx from "clsx";

interface ComparisonCardProps {
  prevTotal: number | null; // total from previous period
  currentTotal: number;
  label: string; // e.g. "Compared to yesterday", "Compared to last week"
  loading?: boolean;
  error?: boolean;
}

export default function ComparisonCard({
  prevTotal,
  currentTotal,
  label,
  loading,
  error,
}: ComparisonCardProps) {
  const baseClass =
    "mt-4 py-4 px-4 sm:py-6 text-center text-sm rounded-md transition duration-200";

  if (loading) {
    return (
      <div className={clsx(baseClass, "bg-secondary/20")}>
        <div className="flex items-center justify-center">
          <span className="h-3 w-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span className="ml-2 text-teal text-sm font-medium">
            Comparing...
          </span>
        </div>
      </div>
    );
  }

  if (error || prevTotal === null) {
    return (
      <div className={clsx(baseClass, "bg-tealBg/60 hover:bg-tealBg")}>
        <p className="uppercase text-teal/80 text-xs sm:text-sm tracking-wide mb-1">
          Comparison unavailable
        </p>
        <p className="text-muted">No data from previous period</p>
      </div>
    );
  }

  const diff = currentTotal - prevTotal;
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
      <div className="flex flex-col items-center text-center">
        <p className="font-semibold text-lg sm:text-xl">
          {isIncrease ? "+" : isDecrease ? "−" : ""}
          {Math.abs(percentageChange).toFixed(1)}%
        </p>
        <p
          className={clsx(
            "tracking-wide mt-1 text-xs sm:text-sm",
            isIncrease
              ? "text-red/80"
              : isDecrease
              ? "text-muted"
              : "text-gray-200/60"
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
