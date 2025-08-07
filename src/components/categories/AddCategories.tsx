"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { addCategory } from "@/lib/category";
import { toast } from "sonner";

const fieldClass =
  "w-full px-3 py-2 rounded-md bg-secondary/50 text-moreWhite border border-muted/10 text-xs focus:outline-none focus:bg-tealBg ";

export default function AddCategory() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = "demoUser"; // Replace with actual user ID when hooked to auth

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim()) return;
    try {
      await addCategory(userId, category.trim());
      setCategory("");
      setOpen(false);
      toast.success("Category successfully added!", { duration: 1500 });
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error("Failed to add category!", { duration: 1000 });
    } finally {
      () => setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-1 text-sm rounded-md bg-tealBg/60 text-moreWhite border border-teal/20 hover:bg-tealBg focus:outline-none"
      >
        + Add
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4 py-2 ">
          <h1 className="text-moreWhite font-bold text-lg text-left">
            Add Category
          </h1>

          <input
            ref={inputRef}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClass}
            placeholder="Enter category name"
          />
          <div className="flex items-center justify-between sm:mt-2">
            <div className="hidden sm:inline">
              <p className="text-muted text-[10px] italic">
                Use<kbd className="px-1">Esc</kbd> to cancel.
              </p>
            </div>
            <button
              type="submit"
              className="text-xs px-10 py-1.5 font-medium bg-tealBg text-moreWhite rounded-md hover:bg-tealBg/80"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
