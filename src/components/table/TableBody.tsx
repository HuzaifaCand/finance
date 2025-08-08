"use client";

import { useEffect, useState } from "react";
import { Expense } from "@/models/expense";

import EmptyTable from "./EmptyTable";
import LoadingRows from "./LoadingRows";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DeleteTrigger from "../delete/DeleteTrigger";
import EditTrigger from "../expenses/EditTrigger";

interface Props {
  date: Date;
  onTotalChange: (t: number) => void;
}
export default function TableBody({ date, onTotalChange }: Props) {
  const [rows, setRows] = useState<Expense[]>([]);

  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    setShowFallback(false); // Reset fallback on each date change

    const d = date.toLocaleDateString("en-CA");
    const q = query(
      collection(db, "users", "demoUser", "dates", d, "expenses")
    );

    // Start fallback after 200ms
    const timer = setTimeout(() => setShowFallback(true), 200);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      clearTimeout(timer);
      const data = snapshot.docs.map((d) => d.data() as Expense);
      setRows(data);
      setShowFallback(false);

      // compute total & notify parent
      const total = data.reduce((sum, e) => sum + e.cost, 0);
      onTotalChange(total);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [date]);

  if (showFallback) return <LoadingRows />;

  if (rows.length === 0) return <EmptyTable />;

  return (
    <tbody className="bg-background">
      {rows.map((item, idx) => (
        <tr
          key={item.id}
          className={`${
            idx % 2 === 0 ? "bg-background" : "bg-tealBg/15"
          } hover:bg-secondary/30 hover:shadow-sm transition duration-200`}
        >
          <td className="py-2 sm:px-4 text-[10px] sm:text-xs text-moreWhite">
            {item.desc}
          </td>
          <td className="py-2 sm:px-4 text-[10px] sm:text-xs text-moreWhite">
            {item.category}
          </td>
          <td className="py-2 sm:px-4 text-[10px] sm:text-xs text-moreWhite">
            {item.method}
          </td>
          <td className="py-2 sm:px-4 text-[10px] sm:text-xs text-moreWhite">
            {item.cost.toFixed(2)}
          </td>
          <td className="py-2 sm:px-4">
            <div className="flex items-center gap-2">
              <EditTrigger expenseToEdit={item} />
              <DeleteTrigger type="expense" date={item.date} id={item.id} />
            </div>
          </td>
        </tr>
      ))}
      {rows.length < 5 &&
        Array.from({ length: 5 - rows.length }).map((_, i) => (
          <tr key={`placeholder-${i}`} className="opacity-0">
            <td className="py-2 px-4">&nbsp;</td>
            <td className="py-2 px-4"></td>
            <td className="py-2 px-4"></td>
            <td className="py-2 px-4"></td>
            <td className="py-2 px-4"></td>
          </tr>
        ))}
    </tbody>
  );
}
