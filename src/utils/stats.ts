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
