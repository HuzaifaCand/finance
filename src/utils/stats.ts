import type { Expense } from "@/models/expense";

/**
 * Calculates total spent, number of expenses, and average cost per expense.
 */
export function getDailySummary(expenses: Expense[]) {
  if (!expenses.length) return { total: 0, median: 0, count: 0, average: 0 };

  const total = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  const sorted = expenses.map((expense) => expense.cost).sort((a, b) => a - b);

  const mid = Math.floor(sorted.length / 2);

  let median;
  if (sorted.length % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid - 2]) / 2;
  } else {
    median = sorted[mid];
  }

  const count = expenses.length;
  const average = total / count;

  return { total, median, count, average };
}

export function getCategoryStats(expenses: Expense[]) {
  if (!expenses.length) return [];

  // 1. Calculate total spend
  const total = expenses.reduce((sum, exp) => sum + exp.cost, 0);

  // 2. Group by category and sum amounts
  const categoryMap = new Map<string, number>();
  for (const exp of expenses) {
    categoryMap.set(
      exp.category,
      (categoryMap.get(exp.category) || 0) + exp.cost
    );
  }

  // 3. Transform to array with percentages
  const categoryStats = Array.from(categoryMap.entries()).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    })
  );

  // 4. Sort by amount descending
  categoryStats.sort((a, b) => b.amount - a.amount);

  return categoryStats;
}
