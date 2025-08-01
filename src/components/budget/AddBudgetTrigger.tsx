// components/AddBudgetTrigger.tsx
"use client";

import { useEffect, useState } from "react";
import AddBudgetCard from "./AddBudgetCard";
import AddBudgetModal from "./AddBudgetModal";

export default function AddBudgetTrigger() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey && e.key.toLowerCase() === "b") {
      e.preventDefault();
      setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <AddBudgetCard onAdd={() => setOpen(true)} />
      <AddBudgetModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
