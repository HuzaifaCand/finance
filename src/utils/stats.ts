import type { Expense } from "@/models/expense";

/**
 * Calculates total spent, number of expenses, and average cost per expense.
 */
export function getDailySummary(expenses: Expense[]) {
  if (!expenses.length)
    return { total: 0, median: 0, count: 0, average: 0, highestExpense: null };

  const total = expenses.reduce((sum, expense) => sum + expense.cost, 0);

  // Sort the costs for median calculation
  const sortedCosts = expenses
    .map((expense) => expense.cost)
    .sort((a, b) => a - b);
  const mid = Math.floor(sortedCosts.length / 2);

  let median;
  if (sortedCosts.length % 2 === 0) {
    median = (sortedCosts[mid - 1] + sortedCosts[mid]) / 2;
  } else {
    median = sortedCosts[mid];
  }

  const count = expenses.length;
  const average = total / count;

  // Find the expense object with the highest cost
  const highestExpense = expenses.reduce(
    (maxExp, currentExp) =>
      currentExp.cost > maxExp.cost ? currentExp : maxExp,
    expenses[0]
  );

  return { total, median, count, average, highestExpense };
}

export function getCategoryStats(expenses: Expense[]) {
  if (!expenses.length) return [];

  // Calc total spend
  const total = expenses.reduce((sum, exp) => sum + exp.cost, 0);

  //  Group by category and sum amounts
  const categoryMap = new Map<string, number>();
  for (const exp of expenses) {
    categoryMap.set(
      exp.category,
      (categoryMap.get(exp.category) || 0) + exp.cost
    );
  }

  // transform to array with percentages
  const categoryStats = Array.from(categoryMap.entries()).map(
    ([type, amount]) => ({
      type,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    })
  );

  // sort descending
  categoryStats.sort((a, b) => b.amount - a.amount);

  return categoryStats;
}

//- --- weekly computations ---

import { parse, format } from "date-fns";

export function getWeekStats(expensesByDay: Record<string, Expense[]>) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // mapp the day name → total
  const totalsByDay: Record<string, number> = {};
  let total = 0;

  for (const [dateStr, expenses] of Object.entries(expensesByDay)) {
    const day = format(parse(dateStr, "yyyy-MM-dd", new Date()), "EEEE"); // full day name
    const dayTotal = expenses.reduce((sum, e) => sum + e.cost, 0);
    totalsByDay[day] = (totalsByDay[day] || 0) + dayTotal;
    total += dayTotal;
  }

  // Create chart-friendly array with zeros for missing days
  const dailyTotals = daysOfWeek.map((day) => ({
    day,
    total: totalsByDay[day] || 0,
  }));

  const trackedDays = Object.values(totalsByDay).filter((v) => v > 0).length;

  // daily totals is [{day: "Monday", total: 12031}, ...] so on

  return { total, trackedDays, dailyTotals };
}

export type Stat = {
  type: string;
  amount: number;
  percentage: number;
};
function getWeeklyStatsByKey(
  expensesByDay: Record<string, Expense[]>,
  key: "category" | "method"
): Stat[] {
  const totals: Record<string, number> = {};

  for (const expenses of Object.values(expensesByDay)) {
    if (!Array.isArray(expenses)) continue;
    for (const expense of expenses) {
      const name = expense[key] || "Unknown";
      totals[name] = (totals[name] || 0) + (expense.cost || 0);
    }
  }

  const totalSpent = Object.values(totals).reduce((sum, amt) => sum + amt, 0);

  return Object.entries(totals)
    .map(([type, amount]) => ({
      type,
      amount,
      percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

// Then export both wrappers for clarity:
export const getWeeklyCategoryStats = (
  expensesByDay: Record<string, Expense[]>
) => getWeeklyStatsByKey(expensesByDay, "category");

export const getWeeklyMethodStats = (
  expensesByDay: Record<string, Expense[]>
) => getWeeklyStatsByKey(expensesByDay, "method");

export function getHighestExpense(expensesByDay: Record<string, Expense[]>) {
  let highest: Expense | null = null;

  for (const expenses of Object.values(expensesByDay)) {
    for (const expense of expenses) {
      if (!highest || expense.cost > highest.cost) {
        highest = expense;
      }
    }
  }

  return highest;
}

export function getHighestSpendingDay(
  dailyTotals: { day: string; total: number }[]
) {
  if (!dailyTotals.length) return null;
  return dailyTotals.reduce((max, curr) =>
    curr.total > max.total ? curr : max
  );
}
