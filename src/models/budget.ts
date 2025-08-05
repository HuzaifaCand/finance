import { Timestamp } from "firebase/firestore";

export interface BudgetHistoryEntry {
  amount: number;
  startDate: string; // ISO
  endDate?: string;
}

export interface BudgetWeekPerformance {
  week: number;
  spent: number;
  success: boolean;
}

export type BudgetType = "total" | "category";

export interface Budget {
  id?: string;
  type: BudgetType;
  budget: number;
  previousBudgets?: BudgetHistoryEntry[];
  dayOfWeek: number;
  history?: BudgetWeekPerformance[];
  week: number;
  activationDate: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
