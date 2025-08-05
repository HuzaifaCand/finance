// src/lib/expense.ts
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Expense } from "@/models/expense"; // adjust path to wherever you placed the interface

/**
 * Adds an expense to Firestore under:
 * users/{userId}/dates/{date}/expenses/{autoId}
 */

export async function addExpense(
  userId: string,
  data: Omit<Expense, "id" | "createdAt" | "updatedAt"> // user supplies everything except timestamps/id
) {
  // Reference to subcollection "expenses" under the specific date
  const ref = collection(db, "users", userId, "dates", data.date, "expenses");
  const newDocRef = doc(ref); // this auto-generates a document ID

  const payload: Expense = {
    ...data,
    id: newDocRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await setDoc(newDocRef, payload);
  return payload;
}

export async function getExpenses(
  userId: string,
  date: string
): Promise<Expense[]> {
  const ref = collection(db, "users", userId, "dates", date, "expenses");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((d) => d.data() as Expense);
}
