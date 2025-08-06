import { Trash2 } from "lucide-react";
import clsx from "clsx";

interface ActionProps {
  onDelete?: () => void;
}
const baseClass: string =
  "p-1.5 rounded-md focus:outline-none transition active:scale-95 hover:cursor-pointer";

export default function DeleteIcon({ onDelete }: ActionProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onDelete}
        aria-label="Delete"
        title="Delete"
        className={clsx(baseClass, "focus:bg-redBg hover:bg-redBg/80")}
      >
        <Trash2 className="w-4 h-4 text-red" />
      </button>
    </div>
  );
}
