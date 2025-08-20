"use client";

import { addExpense, updateExpense } from "@/lib/expense";
import { useState, useRef, useEffect } from "react";
import CategoryInput from "../formInputs/CategoryInput";
import { baseCategories } from "@/lib/category";
import MethodInput from "../formInputs/MethodInput";
import clsx from "clsx";
import { toast } from "sonner";
import { PaymentMethod } from "@/models/expense";
import { useAuthStore } from "@/stores/useAuthStore";

const fieldClass =
  "w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg ";

const methods = [
  "Cash",
  "Card",
  "Octopus",
  "Online",
  "Other",
  "Bank Transfer",
  "Mobile Pay",
];

interface Props {
  date?: Date;
  onClose: () => void;
  expenseToEdit?: {
    id?: string;
    desc: string;
    category: string;
    method: PaymentMethod;
    cost: number;
    date: string; // format: YYYY-MM-DD
  };
}

export default function AddForm({ date, onClose, expenseToEdit }: Props) {
  const descRef = useRef<HTMLInputElement>(null);

  const [customCategory, setCustomCategory] = useState<boolean>(false);
  const [desc, setDesc] = useState(expenseToEdit?.desc ?? "");
  const [category, setCategory] = useState(expenseToEdit?.category ?? "");
  const [method, setMethod] = useState(expenseToEdit?.method ?? "");
  const [cost, setCost] = useState<number | "">(expenseToEdit?.cost ?? "");
  const [loading, setLoading] = useState(false);

  // get current user from auth store
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    descRef.current?.focus();
  }, []);

  if (!user) return;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to add an expense.");
    if (!category || !method || !cost) return;
    if (!date) return;

    const stringDate = date.toLocaleDateString("en-CA").slice(0, 10);

    setLoading(true);
    try {
      await addExpense(user.id, {
        desc,
        category,
        method: method as PaymentMethod,
        cost,
        date: stringDate,
      });

      toast.success("Expense Added!", { duration: 1500 });
      onClose();
    } catch (err) {
      console.error("Failed to add expense:", err);
      toast.error("Failed to add Expense");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!user)
      return toast.error("You must be logged in to update an expense.");
    if (!expenseToEdit || !category || !method || !cost) return;

    setLoading(true);
    try {
      await updateExpense(user.id, expenseToEdit.id!, {
        desc,
        category,
        method: method as PaymentMethod,
        cost,
        date: expenseToEdit.date,
      });

      toast.success("Expense Updated!", { duration: 1500 });
      onClose();
    } catch (err) {
      console.error("Failed to update expense:", err);
      toast.error("Failed to update Expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center py-3 ">
      <form
        onSubmit={expenseToEdit ? handleUpdate : handleSubmit}
        className="space-y-4 w-full max-w-2xl"
      >
        <h1 className="text-xl font-bold text-moreWhite mb-4 text-left">
          {expenseToEdit ? "Edit" : "Add"} Expense
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="description"
              type="text"
              placeholder="e.g. MTR to Campus"
              className={clsx(fieldClass, "placeholder-muted")}
              ref={descRef}
            />
          </div>

          <CategoryInput
            userId={user.id}
            category={category}
            setCategory={setCategory}
            customCategory={customCategory}
            setCustomCategory={setCustomCategory}
            baseCategories={baseCategories}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <MethodInput
            method={method}
            setMethod={setMethod}
            methods={methods}
          />
          <div className="flex flex-col flex-1">
            <label
              htmlFor="cost"
              className="text-xs text-moreWhite font-light mb-1"
            >
              Cost
            </label>
            <input
              onInvalid={(e) => e.preventDefault()}
              required
              value={cost}
              onChange={(e) =>
                setCost(e.target.value === "" ? "" : Number(e.target.value))
              }
              id="cost"
              type="number"
              step="any"
              placeholder="e.g. 15.5"
              className={clsx(fieldClass, "placeholder-muted")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-tealBg text-moreWhite font-semibold py-2 text-xs rounded-lg focus:outline-none border border-tealBg focus:bg-tealBg/80 focus:border-stroke active:scale-95 transition"
        >
          {loading ? "Saving..." : expenseToEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
