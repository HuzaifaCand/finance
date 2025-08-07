import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const baseCategories = [
  "Food",
  "Groceries",
  "Eating Out",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Education",
  "Shopping",
  "Miscellaneous",
];

export async function addCategory(userId: string, category: string) {
  const ref = collection(db, "users", userId, "customCategories");
  const newDocRef = doc(ref, category.toLowerCase());
  const payload = {
    category,
    id: category.toLowerCase(),
    createdAt: Timestamp.now(),
  };

  await setDoc(newDocRef, payload);
  return payload;
}

export async function getCustomCategories(userId: string) {
  const ref = collection(db, "users", userId, "customCategories");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((d) => d.data());
}
