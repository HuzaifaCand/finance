"use client";

import { useExpenses } from "@/hooks/useExpenses";
import { getCategoryStats, getDailySummary } from "@/utils/stats";
import clsx from "clsx";
import PrevDayComparison from "./PrevDayComparison";

interface StatProps {
  date: string;
  prevDate: string | null;
}

// Simple, fluid padding class
const tableCellClass = "px-[clamp(1rem,2vw,3rem)] py-4"; // fluid horizontal padding between 16px and 48px
const tableHeadClass = "py-4 text-left font-semibold";

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

  const { total, median, count, average } = getDailySummary(expenses);
  const categoryStats = getCategoryStats(expenses);

  return (
    <section className="w-full max-w-5xl bg-background rounded-lg shadow-lg space-y-6 text-moreWhite">
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

      {/* Breakdown Table */}
      <div className="flex flex-col gap-4">
        <h1 className="text-moreWhite font-semibold text-lg sm:text-xl">
          Spending Breakdown
        </h1>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[360px] text-[10px] sm:text-xs rounded-xl">
            <thead className="bg-secondary/60 text-moreWhite">
              <tr>
                <th
                  className={clsx(
                    tableHeadClass,
                    tableCellClass,
                    "rounded-tl-xl"
                  )}
                >
                  Category
                </th>
                <th className={clsx(tableHeadClass, tableCellClass)}>Amount</th>
                <th
                  className={clsx(
                    tableHeadClass,
                    tableCellClass,
                    "rounded-tr-xl"
                  )}
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.map((row, idx) => (
                <tr
                  className={`${
                    idx % 2 === 0 ? "bg-background" : "bg-tealBg/15"
                  } hover:bg-secondary/30 hover:shadow-sm transition duration-200 text-moreWhite`}
                  key={row.category}
                >
                  <td className={clsx(tableCellClass)}>{row.category}</td>
                  <td className={clsx(tableCellClass)}>
                    {row.amount.toFixed(2)}
                  </td>
                  <td className={clsx(tableCellClass)}>
                    {row.percentage.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-tealBg py-4 sm:py-6 px-4 rounded-md flex flex-col items-center text-center">
      <p className="text-lg sm:text-xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-muted text-xs sm:text-sm uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
