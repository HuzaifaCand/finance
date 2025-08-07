"use client";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import DeleteTrigger from "@/components/delete/DeleteTrigger";
import AddCategory from "./AddCategories";

export default function CustomList() {
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const userId = "demoUser";

  useEffect(() => {
    const q = query(collection(db, "users", userId, "customCategories"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => d.data().category);
      setCustomCategories(data);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-moreWhite">
          Your Categories
        </h2>
        {/* TODO: Add button handler / open modal */}
        <AddCategory />
      </div>

      {customCategories.length === 0 ? (
        <p className="text-muted text-sm">No custom categories yet.</p>
      ) : (
        <ul className="space-y-2">
          {customCategories.map((cat) => (
            <li
              key={cat}
              className="flex items-center justify-between px-3 py-1 text-moreWhite/90 bg-secondary/40 hover:bg-secondary/80 rounded-lg border border-muted/30 text-sm"
            >
              <span className="text-moreWhite/90 ">{cat}</span>

              <DeleteTrigger type="category" id={cat.toLowerCase()} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
