import TableBody from "./TableBody";
import TableHead from "./TableHead";

import DateHead from "./DateHead";
import ExpenseModalController from "./ExpenseModalController";

export default function MainTable() {
  return (
    <div className="w-full flex justify-center px-4 py-2">
      <div className="w-full max-w-5xl bg-background rounded-xl overflow-hidden relative">
        <div className="pt-8">
          <DateHead />
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
      </div>
    </div>
  );
}
