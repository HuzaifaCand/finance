import { Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";

const baseClass: string =
  "p-1.5 rounded-md focus:outline-none transition active:scale-95 hover:cursor-pointer";

export default function ActionIcons() {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* <button
        aria-label="Edit"
        title="Edit"
        className={clsx(baseClass, "focus:bg-teal/10 hover:bg-teal/10")}
      >
        <Pencil className="w-4 h-4 text-teal" />
      </button> */}
      <button
        aria-label="Delete"
        title="Delete"
        className={clsx(baseClass, "focus:bg-redBg hover:bg-redBg/80")}
      >
        <Trash2 className="w-4 h-4 text-red" />
      </button>
    </div>
  );
}
