import { CircleDollarSign } from "lucide-react";

export default function EmptyTable() {
  return (
    <tbody className="bg-background">
      <tr>
        <td colSpan={8}>
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-moreWhite">
            <CircleDollarSign size={60} className="text-teal" />

            <div className="flex flex-col items-center gap-1">
              <h3 className="text-md sm:text-lg font-semibold">
                No expenses yet :/
              </h3>
            </div>

            <div className="bg-secondary/70 text-center rounded-md shadow-sm border border-stroke/40">
              <p className="text-[10px] sm:text-xs py-2 px-3.5">
                Use the <span className="text-teal font-semibold">＋</span>{" "}
                button above to add your first entry
              </p>
            </div>

            {/* shortcut hints */}
            <div className="hidden md:flex gap-6 mt-3">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="px-2 py-[2px] border border-stroke rounded text-moreWhite/80 bg-background/50">
                  Alt+A
                </span>
                <p>Add Expense</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="px-2 py-[2px] border border-stroke rounded text-moreWhite/80 bg-background/50">
                  Alt+Q
                </span>
                <p>Quick Add</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
