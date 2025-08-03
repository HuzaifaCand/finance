import { Plus } from "lucide-react";

interface AddBudgetCardProps {
  onAdd?: () => void;
}

export default function AddBudgetCard({ onAdd }: AddBudgetCardProps) {
  return (
    <div
      role="button"
      onClick={onAdd}
      className="rounded-2xl bg-secondary/20 py-10 px-6 sm:min-h-[330px] min-h-[300px] flex flex-col items-center justify-center text-moreWhite shadow-lg hover:cursor-pointer transition-all hover:bg-secondary/50 duration-300"
    >
      <div className="mb-3">
        <Plus className="w-8 h-8 font-bold" />
      </div>
      <p className="font-medium">Add New Weekly Budget</p>

      <p className="text-xs text-muted mt-1 hidden md:inline">or Alt+A</p>
    </div>
  );
}
