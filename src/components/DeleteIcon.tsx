import { Trash2 } from "lucide-react";
import clsx from "clsx";

interface ActionProps {
  onDelete?: () => void;
}
const baseClass: string =
  "p-1.5 rounded-md focus:outline-none transition active:scale-95 hover:cursor-pointer";

export default function DeleteIcon({ onDelete }: ActionProps) {
  return (
    <button
      onClick={onDelete}
      aria-label="Delete"
      title="Delete"
      className={clsx(baseClass, "focus:bg-redBg hover:bg-redBg/80")}
    >
      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red" />
    </button>
  );
}
