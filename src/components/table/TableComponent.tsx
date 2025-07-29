import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function TableComponent() {
  return (
    <div className="w-full flex justify-center px-4 py-2">
      <div className="w-full max-w-5xl bg-background rounded-xl border border-muted/10 overflow-hidden">
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
