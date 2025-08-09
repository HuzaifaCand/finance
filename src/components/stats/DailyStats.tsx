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
      <section className="flex items-center justify-center h-[400px] w-full">
        <div className="flex items-center gap-2 text-teal text-sm font-medium">
          <span className="h-3 w-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span>Loading stats...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center h-[400px] w-full">
        <div className="text-red text-center space-y-2">
          <p className="text-red font-semibold text-lg">Error loading stats</p>
          <p className="text-muted text-sm">
            Something went wrong. Please try again.
          </p>
        </div>
      </section>
    );
  }

  if (!expenses) return null;

  const { total, count, average } = getDailySummary(expenses);
  const { category: topCategory, totalSpent } = getTopCategory(expenses);
  const categoryPercentages = getCategoryPercentages(expenses);

  return (
    <div className="relative flex flex-col min-h-[400px] overflow-y-auto custom-scrollbar w-full max-w-5xl bg-background rounded-lg shadow-lg text-moreWhite">
      <div className="absolute sm:relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Total */}
          <div className="bg-secondary p-4 rounded-md flex flex-col items-center">
            <p className="text-2xl font-bold text-accent">
              HK${total.toFixed(2)}
            </p>
            <p className="mt-1 text-muted text-xs uppercase tracking-wide">
              Total Spent
            </p>
          </div>

          {/* Count */}
          <div className="bg-secondary p-4 rounded-md flex flex-col items-center">
            <p className="text-2xl font-bold text-accent">{count}</p>
            <p className="mt-1 text-muted text-xs uppercase tracking-wide">
              Expenses Count
            </p>
          </div>

          {/* Average */}
          <div className="bg-secondary p-4 rounded-md flex flex-col items-center">
            <p className="text-2xl font-bold text-accent">
              HK${average.toFixed(2)}
            </p>
            <p className="mt-1 text-muted text-xs uppercase tracking-wide">
              Average Per Expense
            </p>
          </div>
        </div>

        {/* Top Category */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-2 text-primary">
            Top Spending Category
          </h4>
          <p className="text-accent text-lg">
            {topCategory} — HK${totalSpent.toFixed(2)}
          </p>
        </div>

        {/* Category Percentages */}
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
                  style={{ minWidth: "6rem" }}
                  title={`${cat}: ${percent.toFixed(1)}%`}
                >
                  {cat}: {percent.toFixed(1)}%
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
