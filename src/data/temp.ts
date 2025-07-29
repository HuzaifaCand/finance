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
  { name: "Biryani", category: "Food", method: "Cash", cost: 60.0 },
  {
    name: "MTR to Central",
    category: "Transport",
    method: "Octopus",
    cost: 14.5,
  },
  { name: "Milk Tea", category: "Beverage", method: "Cash", cost: 12.0 },
  { name: "Books", category: "Education", method: "Credit", cost: 230.0 },
  { name: "Bubble Tea", category: "Beverage", method: "Credit", cost: 28.0 },
  { name: "Stationery", category: "Education", method: "Octopus", cost: 45.5 },
  {
    name: "Bus to Campus",
    category: "Transport",
    method: "Octopus",
    cost: 6.8,
  },
  { name: "Lunch Set", category: "Food", method: "Cash", cost: 42.0 },
  { name: "Notebook", category: "Education", method: "Credit", cost: 88.0 },
  { name: "Dinner", category: "Food", method: "Credit", cost: 78.5 },

  { name: "Water Bottle", category: "Beverage", method: "Cash", cost: 10.0 },
  { name: "Printing", category: "Education", method: "Octopus", cost: 5.0 },
  { name: "Dessert", category: "Food", method: "Cash", cost: 35.0 },
  { name: "Coffee", category: "Beverage", method: "Octopus", cost: 22.0 },
  { name: "Taxi", category: "Transport", method: "Cash", cost: 52.0 },
  { name: "Dinner - Thai", category: "Food", method: "Credit", cost: 94.0 },

  { name: "Snack", category: "Food", method: "Cash", cost: 18.0 },
  { name: "Breakfast Bun", category: "Food", method: "Octopus", cost: 8.0 },
];
