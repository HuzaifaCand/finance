"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";

interface AddButtonPopoverProps {
  onActionSelect: (action: "addExpense" | "quickAdd") => void;
}

export default function AddButtonPopover({
  onActionSelect,
}: AddButtonPopoverProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts (Alt+A and Alt+Q)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        onActionSelect("addExpense");
        setOpen(false);
      }
      if (e.altKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        onActionSelect("quickAdd");
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onActionSelect]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`text-moreWhite p-1 rounded-full hover:bg-secondary focus:bg-secondary focus:outline-none transition ${
          open ? "bg-secondary" : ""
        }`}
        aria-label="Open Add Options"
      >
        <Plus className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-55 bg-secondary text-moreWhite rounded-md shadow-lg z-50"
        >
          <button
            onClick={() => {
              onActionSelect("addExpense");
              setOpen(false);
            }}
            className="w-full text-left text-xs px-5 py-2 hover:bg-background/60 transition flex items-center justify-between"
          >
            Add Expense{" "}
            <span className=" text-muted text-[10px] hidden md:inline">
              Alt+A
            </span>
          </button>
          <button
            onClick={() => {
              onActionSelect("quickAdd");
              setOpen(false);
            }}
            className="w-full text-left text-xs px-5 py-2 hover:bg-background/60 transition flex items-center justify-between"
          >
            Quick Add{" "}
            <span className=" text-muted text-[10px] hidden md:inline">
              Alt+Q
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
