"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import clsx from "clsx";
import CategoryInput from "./CategoryInput";

const baseCategories = [
  "Food",
  "Groceries",
  "Eating Out",
  "Transport",
  "Utilities",
  "Rent",
  "Entertainment",
  "Health",
  "Education",
  "Shopping",
  "Miscellaneous",
];
const fieldClass: string =
  "w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg ";

export default function AddBudgetForm() {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<boolean>(false);

  const filteredCategories = baseCategories.filter((c) =>
    c.toLowerCase().startsWith(category.toLowerCase())
  );

  const handleDummySubmit = (e: FormEvent<HTMLFormElement>) => {
    // No real submission logic for now
    console.log("Category:", category);
    console.log("Amount:", amount);
  };

  return (
    <form onSubmit={handleDummySubmit} className="space-y-6 mt-4 ">
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
        <label className="block text-sm font-medium text-moreWhite mb-2">
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
      <div className="flex md:justify-between justify-end pt-2">
        <div className="hidden mt-2 md:flex md:flex-col">
          <p className="text-muted text-[8px] italic">
            Use<kbd className="px-1">Esc</kbd> to cancel.
          </p>
          <p className="text-muted text-[8px] italic">
            Use <kbd className="px-1">Tab</kbd> to move between fields.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="reset"
            onClick={() => {
              setCategory("");
              setAmount("");
              setCustomCategory(false);
            }}
            className="px-6 sm:px-10  py-2 rounded-md focus:outline-none focus:bg-secondary/60 text-xs bg-secondary/30 text-moreWhite hover:bg-secondary/60 transition-all duration-150"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 sm:px-10 py-2  rounded-md focus:outline-none focus:bg-secondary text-xs bg-secondary/80 text-moreWhite hover:bg-secondary transition-all duration-150"
          >
            Add Budget
          </button>
        </div>
      </div>
    </form>
  );
}
