export interface Items {
  name: string;
  category: Category;
  method: string;
  cost: number;
}

export type Category =
  | "All"
  | "Food"
  | "Transport"
  | "Beverage"
  | "Education"
  | "Personal"
  | "Other";

export const tempItems: Items[] = [
  { name: "Biryani - was mid", category: "Food", method: "Cash", cost: 14.0 },
  {
    name: "MTR to Central",
    category: "Transport",
    method: "Octopus",
    cost: 14.5,
  },
  { name: "Milk Tea", category: "Beverage", method: "Cash", cost: 12.0 },

  {
    name: "Bus to Campus",
    category: "Transport",
    method: "Octopus",
    cost: 6.8,
  },
  { name: "Lunch", category: "Food", method: "Cash", cost: 12.0 },
  { name: "Notebook", category: "Education", method: "Credit", cost: 13.0 },
  { name: "Dinner", category: "Food", method: "Credit", cost: 78.5 },

  { name: "Water Bottle", category: "Beverage", method: "Cash", cost: 10.0 },
  { name: "Printing", category: "Education", method: "Octopus", cost: 5.0 },
];

export const totalCost = tempItems.reduce((sum, item) => sum + item.cost, 0);

export interface Budget {
  category: string;
  total: number;
  spent: number;
  day: number;
  week: number;
}
export const budgets: Budget[] = [
  {
    category: "Food",
    total: 300,
    spent: 160,
    day: 4,
    week: 0,
  },
  {
    category: "On Others",
    total: 200,
    spent: 40,
    day: 2,
    week: 1,
  },
  {
    category: "Beverages",
    total: 140,
    spent: 130,
    day: 5,
    week: 0,
  },
];
