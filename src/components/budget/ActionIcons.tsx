import { Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
const baseIconClass =
  "p-1.5 rounded-md focus:outline-none transition active:scale-95 hover:cursor-pointer";

export default function ActionIcons() {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2">
      <button
        aria-label="Edit"
        title="Edit"
        className={clsx(baseIconClass, "focus:bg-teal/10 hover:bg-teal/10")}
      >
        <Pencil className="w-4 h-4 text-teal" />
      </button>
      <button
        aria-label="Remove"
        title="Remove"
        className={clsx(baseIconClass, "focus:bg-redBg hover:bg-redBg/80")}
      >
        <Trash2 className="w-4 h-4 text-red" />
      </button>
    </div>
  );
}
