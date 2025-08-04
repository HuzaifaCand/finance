"use client";

import { useEffect, useRef, useState } from "react";
import { Desc, Cost } from "./Fields";
import CategoryInput from "../formInputs/CategoryInput";
import { baseCategories } from "@/data/temp";
import MethodInput from "../formInputs/MethodInput";

const methods = [
  "Cash",
  "Card",
  "Octopus",
  "Online",
  "Other",
  "Bank Transfer",
  "Mobile Pay",
];

export default function AddForm() {
  const descRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<boolean>(false);

  const [method, setMethod] = useState<string>("");

  useEffect(() => {
    descRef.current?.focus();
  }, []);
  return (
    <div className="w-full flex justify-center py-3 ">
      <form className="space-y-4 w-full max-w-2xl">
        <h1 className="text-xl font-bold text-moreWhite mb-4 text-left">
          Add Expense
        </h1>

        {/* Row 1: Description + Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Desc ref={descRef} />
          <CategoryInput
            category={category}
            setCategory={setCategory}
            customCategory={customCategory}
            setCustomCategory={setCustomCategory}
            baseCategories={baseCategories}
          />
        </div>

        {/* Row 2: Payment Method + Cost */}
        <div className="flex flex-col sm:flex-row gap-4">
          <MethodInput
            method={method}
            setMethod={setMethod}
            methods={methods}
          />
          <Cost />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-tealBg text-moreWhite font-semibold py-2 text-sm rounded-lg focus:outline-none border border-tealBg focus:bg-tealBg/80 focus:border-stroke active:scale-95 transition"
        >
          Add
        </button>
        <div className="hidden mt-2 md:flex md:justify-between md:items-center">
          <p className="text-muted text-[10px] italic">
            Use<kbd className="px-1">Esc</kbd> to cancel.
          </p>
          <p className="text-muted text-[10px] italic">
            Use <kbd className="px-1">Tab</kbd> to move between fields.
          </p>
        </div>
      </form>
    </div>
  );
}
