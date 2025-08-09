"use client";

import { useExpenses } from "@/hooks/useExpenses";
import { getCategoryStats, getDailySummary } from "@/utils/stats";

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

  const { total, median, count, average } = getDailySummary(expenses);
  const categoryStats = getCategoryStats(expenses);

  return (
    <section className="w-full max-w-5xl bg-background rounded-lg shadow-lg space-y-8 text-moreWhite">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
      <div className="flex flex-col gap-4">
        <h1 className="text-moreWhite font-semibold text-xl">Breakdown</h1>
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="rounded-xl">
            <thead className="bg-secondary/60 items-center text-moreWhite text-[10px] sm:text-xs">
              <tr>
                <th className="py-4 px-16 text-left font-semibold rounded-tl-xl">
                  Category
                </th>
                <th className="py-4 px-16 text-left font-semibold ">Cost</th>
                <th className="py-4 px-16 text-left font-semibold rounded-tr-xl">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.map((row, idx) => (
                <tr
                  className={`${
                    idx % 2 === 0 ? "bg-background" : "bg-tealBg/15"
                  } hover:bg-secondary/30 hover:shadow-sm transition duration-200 text-moreWhite text-[10px] sm:text-xs`}
                  key={row.category}
                >
                  <td className="py-4 px-16">{row.category}</td>
                  <td className="py-4 px-16">{row.amount.toFixed(2)}</td>
                  <td className="py-4 px-16">{row.percentage.toFixed(1)}%</td>
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
    <div className="bg-secondary py-4 sm:py-6 px-4 rounded-md flex flex-col items-center text-center">
      <p className="text-lg sm:text-xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-muted text-xs sm:text-sm uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
