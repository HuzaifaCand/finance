import { addExpense, updateExpense } from "@/lib/expense";
import { useState, useRef, useEffect } from "react";
import CategoryInput from "../formInputs/CategoryInput";
import { baseCategories } from "@/lib/category";
import MethodInput from "../formInputs/MethodInput";
import clsx from "clsx";
import { toast } from "sonner";
import { PaymentMethod } from "@/models/expense";

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

  useEffect(() => {
    descRef.current?.focus();
    return;
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !method || !cost) return;
    if (!date) return;
    const stringDate = date.toLocaleDateString("en-CA").slice(0, 10);

    setLoading(true);
    try {
      await addExpense("demoUser", {
        desc,
        category,
        method: method as PaymentMethod,
        cost,
        date: stringDate,
      });
    } catch (err) {
      console.error("Failed to add expense:", err);
      toast.error("Failed to add Expense");
    } finally {
      setLoading(false);
      onClose();
      toast.success("Expense Added!", { duration: 1500 });
    }
  }
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!expenseToEdit || !category || !method || !cost) return;

    setLoading(true);
    try {
      await updateExpense("demoUser", expenseToEdit.id!, {
        desc,
        category,
        method: method as PaymentMethod,
        cost,
        date: expenseToEdit.date, // preserve original date
      });

      toast.success("Expense Updated!", { duration: 1500 });
    } catch (err) {
      console.error("Failed to update expense:", err);
      toast.error("Failed to update Expense");
    } finally {
      setLoading(false);
      onClose();
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
          {loading ? "Saving..." : "Add"}
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
