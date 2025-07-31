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
          <div className="mt-1 hidden sm:inline text-sm">
            <span className="text-muted ">You have spent </span>
            <span className="text-primary/80">{totalCost} </span>
            <span className="text-muted">HKD today</span>
          </div>
        </div>

        <div className="flex justify-end p-2">
          <ExpenseModalController />
        </div>

        {/* 🧾 Table Container */}
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto custom-scrollbar scroll-auto">
          <table className="min-w-full rounded-xl overflow-hidden">
            <TableHead />
            <TableBody />
          </table>
        </div>
        <div className="sm:hidden absolute bottom-2 right-4 bg-background px-4 py-2 rounded-lg shadow-md text-sm flex gap-2 items-center">
          <span className="text-muted">Total:</span>
          <span className="text-primary/80 font-semibold">{totalCost} HKD</span>
        </div>
      </div>
    </div>
  );
}
