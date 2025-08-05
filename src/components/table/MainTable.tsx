"use client";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

import DateHead from "./DateHead";
import ExpenseModalController from "./ExpenseModalController";
import { totalCost } from "@/data/temp";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";

export default function MainTable() {
  const [date, setDate] = useState<Date>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lastDate");
      if (stored) return new Date(stored);
    }
    return new Date();
  });

  useEffect(() => {
    localStorage.setItem("lastDate", date.toISOString());
  }, [date]);

  return (
    <div className="w-full flex justify-center px-4 py-2">
      <div className="w-full max-w-5xl bg-background rounded-xl overflow-hidden relative">
        <div className="pt-8">
          <div className="flex justify-between gap-2 items-center">
            <div>
              <DateHead date={date} setDate={setDate} />
              <div className="hidden sm:inline text-sm">
                <span className="text-muted ">Total Today: </span>
                <span className="text-primary/80">{totalCost} HKD</span>
              </div>
            </div>
            <Navbar />
          </div>
        </div>

        <div className="flex justify-end p-2">
          <ExpenseModalController date={date} />
        </div>

        {/* 🧾 Table Container */}
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto custom-scrollbar ">
          <table className="min-w-full rounded-xl overflow-hidden">
            <TableHead />
            <TableBody date={date} />
          </table>
        </div>

        <div className="sm:hidden flex justify-end mt-6 px-4 pb-4 text-sm">
          <span className="text-muted mr-1">Total Today:</span>
          <span className="text-primary/80 font-semibold">{totalCost} HKD</span>
        </div>
      </div>
    </div>
  );
}
