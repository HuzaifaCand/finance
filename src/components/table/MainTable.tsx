import TableBody from "./TableBody";
import TableHead from "./TableHead";

import DateHead from "./DateHead";
import ExpenseModalController from "./ExpenseModalController";
import { totalCost } from "@/data/temp";

export default function MainTable() {
  return (
    <div className="w-full flex justify-center px-4 py-2">
      <div className="w-full max-w-5xl bg-background rounded-xl overflow-hidden relative">
        <div className="pt-8">
          <DateHead />
          <div className="hidden sm:inline text-sm">
            <span className="text-muted ">Total Today: </span>
            <span className="text-primary/80">{totalCost} HKD</span>
          </div>
        </div>

        <div className="flex justify-end p-2">
          <ExpenseModalController />
        </div>

        {/* 🧾 Table Container */}
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="min-w-full rounded-xl overflow-hidden">
            <TableHead />
            <TableBody />
          </table>
        </div>

        <div className="sm:hidden flex justify-end mt-6 px-4 pb-4 text-md">
          <span className="text-muted mr-1">Total Today:</span>
          <span className="text-primary/80 font-semibold">{totalCost} HKD</span>
        </div>
      </div>
    </div>
  );
}
