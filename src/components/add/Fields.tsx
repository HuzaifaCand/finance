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

export function Cat() {
  return (
    <div className="flex flex-col flex-1">
      <label
        htmlFor="category"
        className="text-xs text-moreWhite font-light mb-1"
      >
        Category
      </label>

      <div className="relative w-full">
        <select
          onInvalid={(e) => e.preventDefault()}
          required
          id="category"
          className={clsx(
            fieldClass,
            "appearance-none pr-8" // push text away from the chevron
          )}
        >
          <option value="">Select category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="shopping">Shopping</option>
          <option value="utilities">Utilities</option>
          <option value="misc">Miscellaneous</option>
        </select>

        {/* Custom chevron */}
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
      </div>
    </div>
  );
}

export function PayMeth() {
  return (
    <div className="flex flex-col flex-1">
      <label
        htmlFor="payment"
        className="text-xs text-moreWhite font-light mb-1"
      >
        Payment Method
      </label>
      <input
        onInvalid={(e) => e.preventDefault()}
        required
        id="payment"
        type="text"
        placeholder="e.g. Octopus, Cash, Visa"
        className={clsx(fieldClass, "placeholder-muted")}
      />
    </div>
  );
}

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
        className={clsx(fieldClass, "placeholder-muted")}
      />
    </div>
  );
}
