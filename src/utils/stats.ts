import type { Expense } from "@/models/expense";

/**
 * Calculates total spent, number of expenses, and average cost per expense.
 */
export function getDailySummary(expenses: Expense[]) {
  if (!expenses.length) return { total: 0, count: 0, average: 0 };

  const total = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  const count = expenses.length;
  const average = total / count;

  return { total, count, average };
}

/**
 * Finds the category with the highest total spending.
 */
export function getTopCategory(expenses: Expense[]) {
  if (!expenses.length) return { category: null, totalSpent: 0 };

  const categoryTotals: Record<string, number> = {};

  expenses.forEach(({ category, cost }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + cost;
  });

  const topCategory = Object.entries(categoryTotals).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );

  return { category: topCategory[0], totalSpent: topCategory[1] };
}

/**
 * Calculates the percentage of total spending for each category.
 */
export function getCategoryPercentages(expenses: Expense[]) {
  if (!expenses.length) return {};

  const total = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  if (total === 0) return {}; // no meaningful percentages if total cost is zero

  const categoryTotals: Record<string, number> = {};

  expenses.forEach(({ category, cost }) => {
    // Assign "Uncategorized" if category is empty or falsy
    const cat = category?.trim() || "Uncategorized";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + cost;
  });

  const categoryPercentages: Record<string, number> = {};
  for (const category in categoryTotals) {
    categoryPercentages[category] = (categoryTotals[category] / total) * 100;
  }

  return categoryPercentages;
}
