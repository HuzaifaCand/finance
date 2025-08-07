import { Pencil } from "lucide-react";
import clsx from "clsx";

interface ActionProps {
  onEdit?: () => void;
}
const baseClass: string =
  "p-1.5 rounded-md focus:outline-none transition active:scale-95 hover:cursor-pointer";

export default function EditIcon({ onEdit }: ActionProps) {
  return (
    <button
      onClick={onEdit}
      aria-label="Edit"
      title="Edit"
      className={clsx(baseClass, "focus:bg-tealBg hover:bg-tealBg/80")}
    >
      <Pencil className="w-4 h-4 text-teal" />
    </button>
  );
}
