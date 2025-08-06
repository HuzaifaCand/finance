"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import clsx from "clsx";
import CategoryInput from "../formInputs/CategoryInput";
import { baseCategories } from "@/data/category";

const fieldClass: string =
  "w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg ";

export default function AddBudgetForm() {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<boolean>(false);

  const handleDummySubmit = (e: FormEvent<HTMLFormElement>) => {
    // No real submission logic for now
    console.log("Category:", category);
    console.log("Amount:", amount);
  };

  return (
    <form onSubmit={handleDummySubmit} className="space-y-4 mt-4 ">
      <h1 className="text-xl font-bold text-moreWhite mb-4 text-left">
        Add New Budget
      </h1>

      {/* Category Input */}
      <CategoryInput
        category={category}
        setCategory={setCategory}
        customCategory={customCategory}
        setCustomCategory={setCustomCategory}
        baseCategories={baseCategories}
      />

      {/* Amount Input */}
      <div>
        <label className="block text-xs font-light text-moreWhite mb-1">
          Amount (HKD)
        </label>
        <input
          required
          onInvalid={(e) => e.preventDefault()}
          type="number"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          placeholder="e.g. 200"
          className={clsx(fieldClass)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-8 items-center">
        <p className="text-muted hidden sm:inline text-[10px] italic">
          Use<kbd className="px-1">Esc</kbd> to cancel.
        </p>
        <button
          type="submit"
          className="w-1/3 bg-tealBg text-moreWhite font-semibold py-2 text-xs rounded-lg focus:outline-none border border-tealBg focus:bg-tealBg/80 focus:border-stroke active:scale-95 transition"
        >
          Add Budget
        </button>
      </div>
    </form>
  );
}
