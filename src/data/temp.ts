export const baseCategories = [
  "Food",
  "Groceries",
  "Eating Out",
  "Transport",
  "Utilities",
  "Rent",
  "Entertainment",
  "Health",
  "Education",
  "Shopping",
  "Miscellaneous",
];

export interface Budget {
  category: string;
  total: number;
  spent: number;
  day: number;
  week: number;
}
export const budgets: Budget[] = [
  {
    category: "On Groceries",
    total: 200,
    spent: 160,
    day: 4,
    week: 0,
  },
  {
    category: "Eating Out",
    total: 140,
    spent: 130,
    day: 5,
    week: 0,
  },
];
