import clsx from "clsx";
import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const fieldClass: string =
  "w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg ";

export const Desc = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <div className="flex flex-col flex-1">
      <label
        htmlFor="description"
        className="text-xs text-moreWhite font-light mb-1"
      >
        Description
      </label>
      <input
        onInvalid={(e) => e.preventDefault()}
        required
        id="description"
        type="text"
        placeholder="e.g. Lunch - Canteen"
        className={clsx(fieldClass, "placeholder-muted")}
        ref={ref}
      />
    </div>
  );
});

Desc.displayName = "Desc";

export function Cost() {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor="cost" className="text-xs text-moreWhite font-light mb-1">
        Cost
      </label>
      <input
        onInvalid={(e) => e.preventDefault()}
        required
        id="cost"
        type="number"
        step="any"
        placeholder="e.g. 15.5 HKD"
        className={clsx(fieldClass, "placeholder-muted")}
      />
    </div>
  );
}
