// src/lib/expense.ts
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Expense } from "@/models/expense"; // adjust path to wherever you placed the interface

/**
 * Adds an expense to Firestore under:
 * users/{userId}/dates/{date}/expenses/{autoId}
 */

export async function addExpense(
  userId: string,
  data: Omit<Expense, "id" | "createdAt" | "updatedAt">
) {
  const dateDocRef = doc(db, "users", userId, "dates", data.date);
  await setDoc(dateDocRef, { exists: true }, { merge: true }); // ensure the date doc exists

  const ref = collection(dateDocRef, "expenses");
  const newDocRef = doc(ref);

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
  const expensesRef = collection(
    db,
    "users",
    userId,
    "dates",
    date,
    "expenses"
  );
  const q = query(expensesRef);
  const snapshot = await getDocs(q);

  const expenses: Expense[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as Expense),
    id: doc.id, // override just in case
  }));

  return expenses;
}

export async function updateExpense(
  userId: string,
  expenseId: string,
  data: Omit<Expense, "createdAt" | "updatedAt" | "id">
): Promise<void> {
  const expenseRef = doc(
    db,
    "users",
    userId,
    "dates",
    data.date,
    "expenses",
    expenseId
  );

  await updateDoc(expenseRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function getActiveDates(userId: string) {
  const dateRef = collection(db, "users", userId, "dates");
  const snapshot = await getDocs(query(dateRef));

  return snapshot.docs.map((d) => d.id).sort();
}

export async function deleteExpense(
  userId: string,
  date: string,
  expenseId: string
) {
  const expenseRef = doc(
    db,
    "users",
    userId,
    "dates",
    date,
    "expenses",
    expenseId
  );
  await deleteDoc(expenseRef);

  const remainingExpenses = await getDocs(
    collection(db, "users", userId, "dates", date, "expenses")
  );

  if (remainingExpenses.empty) {
    const dateDocRef = doc(db, "users", userId, "dates", date);
    await deleteDoc(dateDocRef);
  }
}
