"use client";

import { useExpenses } from "@/hooks/useExpenses";
import {
  getCategoryPercentages,
  getDailySummary,
  getTopCategory,
} from "@/utils/stats";

interface StatProps {
  date: string;
}

export default function DailyStatistics({ date }: StatProps) {
  const { expenses, loading, error } = useExpenses("demoUser", date);

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
      <div className="flex items-center justify-center h-60 text-center text-red">
        <p className="font-semibold text-lg">Error loading stats</p>
        <p className="text-muted text-sm">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  if (!expenses) return null;

  const { total, count, average } = getDailySummary(expenses);
  const { category: topCategory, totalSpent } = getTopCategory(expenses);
  const categoryPercentages = getCategoryPercentages(expenses);

  return (
    <div className="w-full max-w-5xl bg-background rounded-lg shadow-lg space-y-8 text-moreWhite">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Spent" value={`HK$${total.toFixed(2)}`} />
        <StatCard label="Expenses Count" value={count.toString()} />
        <StatCard
          label="Average Per Expense"
          value={`HK$${average.toFixed(2)}`}
        />
      </div>

      {/* Top category */}
      <div>
        <h4 className="text-xl font-semibold mb-1 text-primary">
          Top Spending Category
        </h4>
        <p className="text-accent text-lg">
          {topCategory} — HK${totalSpent.toFixed(2)}
        </p>
      </div>

      {/* Category breakdown */}
      <div>
        <h4 className="text-xl font-semibold mb-2 text-primary">
          Spending Breakdown
        </h4>
        <ul className="flex flex-wrap gap-3">
          {categoryPercentages &&
            Object.entries(categoryPercentages).map(([cat, percent]) => (
              <li
                key={cat}
                className="bg-stroke rounded-full px-3 py-1 text-xs font-medium text-moreWhite"
                title={`${cat}: ${percent.toFixed(1)}%`}
              >
                {cat}: {percent.toFixed(1)}%
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary py-6 px-4 rounded-md flex flex-col items-center text-center">
      <p className="text-2xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-muted text-xs uppercase tracking-wide">{label}</p>
    </div>
  );
}
