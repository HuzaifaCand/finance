import { Timestamp } from "firebase/firestore";

export type PaymentMethod =
  | "Cash"
  | "Card"
  | "Octopus"
  | "Online"
  | "Other"
  | "Mobile Pay"
  | "Bank Transfer";

export interface Expense {
  id?: string;
  desc: string;
  category: string;
  method: PaymentMethod;
  cost: number;
  date: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
