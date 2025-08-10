"use client";

import { useExpenses } from "@/hooks/useExpenses";
import { getCategoryStats, getDailySummary } from "@/utils/stats";
import PrevDayComparison from "./PrevDayComparison";
import BreakdownTable from "./BreakdownTable";

interface StatProps {
  date: string;
  prevDate: string | null;
}

export default function DailyStatistics({ date, prevDate }: StatProps) {
  const userId = "demoUser";
  const { expenses, loading, error } = useExpenses(userId, date);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="flex items-center gap-2 text-teal text-sm font-medium">
          <span className="h-3 w-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span>Calculating stats...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center text-red">
        <p className="font-semibold text-lg">Error loading stats</p>
        <p className="text-muted text-sm">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  if (!expenses) return null;

  const { total, median, average, highestExpense } = getDailySummary(expenses);
  const categoryStats = getCategoryStats(expenses);

  return (
    <section className="w-full max-w-5xl bg-background rounded-lg shadow-lg space-y-8 text-moreWhite">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        <StatCard label="Total Spent" value={`HK$${total.toFixed(2)}`} />
        <StatCard
          label="Median Expenditure"
          value={`HK$${median.toFixed(2)}`}
        />
        <StatCard
          label="Average Per Expense"
          value={`HK$${average.toFixed(2)}`}
        />
      </div>
      <PrevDayComparison totalToday={total} prevDate={prevDate} />

      <BreakdownTable categoryStats={categoryStats} />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {highestExpense ? (
          <HighlightCard
            label="Highest Single Expense"
            value={`HK$${highestExpense.cost.toFixed(2)}`}
            description={highestExpense.desc}
          />
        ) : (
          <HighlightCard label="Highest Single Expense" value="N/A" />
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-tealBg/50 hover:bg-tealBg transition duration-200 py-4 sm:py-6 px-4 rounded-md flex flex-col items-center text-center">
      <p className="text-lg sm:text-xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-muted text-xs sm:text-sm uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

function HighlightCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="bg-tealBg/20 hover:bg-tealBg/40 transition duration-200 border border-tealBg/50 rounded-md p-4 flex flex-col items-center text-center">
      <p className="text-muted uppercase tracking-wide text-xs sm:text-sm mb-1">
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-extrabold text-accent">{value}</p>
      {description && (
        <p
          className="mt-1 text-muted text-sm truncate max-w-[14rem]"
          title={description}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// function MiniStatBadge({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex items-center justify-center rounded-full bg-tealBg/20 hover:bg-tealBg/40 transition duration-200 text-accent font-extrabold text-xl sm:text-2xl w-12 h-12 sm:h-16 sm:w-16">
//         {value}
//       </div>
//       <p className="mt-2 text-muted uppercase tracking-wide text-xs sm:text-sm">
//         {label}
//       </p>
//     </div>
//   );
// }
