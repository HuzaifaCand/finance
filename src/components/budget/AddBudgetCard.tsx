import { Plus } from "lucide-react";

interface AddBudgetCardProps {
  onAdd?: () => void;
}

export default function AddBudgetCard({ onAdd }: AddBudgetCardProps) {
  return (
    <div
      onClick={onAdd}
      className="rounded-2xl bg-secondary/20 py-10 px-6 min-h-[330px] flex flex-col items-center justify-center text-moreWhite shadow-lg hover:cursor-pointer"
    >
      <div className="mb-3">
        <Plus className="w-8 h-8 font-bold" />
      </div>
      <p className="font-medium">Add Budget</p>
      <p className="text-xs text-muted mt-1">or press Alt+B to add</p>
    </div>
  );
}
