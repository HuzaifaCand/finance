"use client";

import Loading from "@/components/Loading";
import { useWeekExpenses } from "@/hooks/useWeekExpenses";
import { Week } from "@/lib/date";
import StatsError from "../StatsError";
import StatCard from "../StatCard";
import {
  getHighestExpense,
  getHighestSpendingDay,
  getWeeklyCategoryStats,
  getWeeklyMethodStats,
  getWeekStats,
} from "@/utils/stats";
import WeekChart from "./WeekChart";
import BreakdownTable from "../BreakdownTable";
import HighlightCard from "../HighlightCard";

interface WeekStatProps {
  selectedWeek: Week;
  userId: string;
  activeDates: string[];
}

export default function WeeklyStats({
  selectedWeek,
  userId,
  activeDates,
}: WeekStatProps) {
  const { data, loading, error } = useWeekExpenses(
    userId,
    activeDates,
    selectedWeek
  );

  if (loading) return <Loading text="Calculating..." />;
  if (error) return <StatsError thing="calculating" />;
  if (!data) return null;

  const { total, trackedDays, dailyTotals } = getWeekStats(data.expensesByDay);
  const weeklyCategoryStats = getWeeklyCategoryStats(data.expensesByDay);
  const weeklyMethodStats = getWeeklyMethodStats(data.expensesByDay);
  const highestExpense = getHighestExpense(data.expensesByDay);
  const highestSpendingDay = getHighestSpendingDay(dailyTotals);

  return (
    <section className="w-full max-w-5xl bg-background rounded-lg shadow-lg space-y-12 text-moreWhite">
      <div className="space-y-4 text-center">
        <h3 className="text-sm bg-tealBg/10 border border-teal/10 hover:bg-tealBg/50 transition duration-200 rounded-md py-3 sm:text-md font-medium">
          Tracked{" "}
          <span className="text-teal font-semibold">{trackedDays}/7 days</span>{" "}
          this week{" "}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <StatCard
            value={`HK$${total.toFixed(2)}`}
            label="Total Spending This Week"
          />
          <StatCard
            value={`HK$${(total / 7).toFixed(2)}`}
            label="Average Daily Spending This Week"
          />
        </div>
      </div>
      <WeekChart data={dailyTotals} />
      <BreakdownTable
        title="Where your Money went"
        type="Category"
        stats={weeklyCategoryStats}
      />
      <BreakdownTable
        title="How you paid"
        type="Method"
        stats={weeklyMethodStats}
      />
      <div className="space-y-4">
        <h3 className="text-moreWhite font-semibold text-lg sm:text-xl">
          Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <HighlightCard
            label="Single Highest Expense This Week"
            value={`HK$${highestExpense?.cost.toFixed(2)}`}
            description={highestExpense?.desc}
          />
          <HighlightCard
            label="Highest Spending Day"
            value={`HK$${highestSpendingDay?.total.toFixed(2)}`}
            description={highestSpendingDay?.day}
          />
        </div>
      </div>
    </section>
  );
}
