import TableBody from "./TableBody";
import TableHead from "./TableHead";
import AddButtonPopover from "./AddButton";
import DateHead from "./DateHead";

export default function MainTable() {
  return (
    <div className="w-full flex justify-center px-4 py-2">
      <div className="w-full max-w-5xl bg-background rounded-xl overflow-hidden relative">
        <div className="pt-8">
          <DateHead />
        </div>

        <div className="flex justify-end p-2">
          <AddButtonPopover />
        </div>

        {/* 🧾 Table Container */}
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="min-w-full border border-stroke rounded-xl overflow-hidden">
            <TableHead />
            <TableBody />
          </table>
        </div>
      </div>
    </div>
  );
}
