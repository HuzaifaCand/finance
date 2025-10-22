"use client";

import { useExpenses } from "@/hooks/useExpenses";
import { getCategoryStats, getDailySummary } from "@/utils/stats";
import PrevDayComparison from "./PrevDayComparison";
import BreakdownTable from "../BreakdownTable";
import Loading from "@/components/Loading";
import StatsError from "../StatsError";
import StatCard from "../StatCard";
import HighlightCard from "../HighlightCard";

interface StatProps {
  date: string;
  prevDate: string | null;
  userId: string;
}

export default function DailyStatistics({ date, prevDate, userId }: StatProps) {
  const { expenses, loading, error } = useExpenses(userId, date);

  if (userId === "") {
    return (
      <div className="flex items-center justify-center h-60 text-muted text-sm">
        You must be logged in to view stats.
      </div>
    );
  }

  if (loading) {
    return <Loading text="Calculating..." />;
  }

  if (error) {
    return <StatsError thing="calculating" />;
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
      <PrevDayComparison id={userId} totalToday={total} prevDate={prevDate} />
      <BreakdownTable
        stats={categoryStats}
        title="Spending Breakdown"
        type="Category"
      />
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
