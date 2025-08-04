import { CircleDollarSign } from "lucide-react";

export default function EmptyTable() {
  return (
    <tr>
      <td colSpan={5}>
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-moreWhite">
          <CircleDollarSign size={80} className="text-teal" />

          <div className="flex flex-col items-center gap-1">
            <h3 className="text-lg font-semibold">No expenses yet :/</h3>
          </div>

          <div className="bg-secondary/70 text-center mt-2 rounded-md shadow-sm border border-stroke/40">
            <p className="sm:text-sm text-xs py-2 px-6">
              Use the <span className="text-teal font-semibold">＋</span> button
              above to add your first entry
            </p>
          </div>

          {/* shortcut hints */}
          <div className="hidden md:flex gap-6 mt-3">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="px-2 py-[2px] border border-stroke rounded font-mono text-moreWhite bg-background/50">
                Alt+A
              </span>
              <p>Add Expense</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="px-2 py-[2px] border border-stroke rounded font-mono text-moreWhite bg-background/50">
                Alt+Q
              </span>
              <p>Quick Add</p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
