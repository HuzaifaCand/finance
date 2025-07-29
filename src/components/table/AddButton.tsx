"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";

export default function AddButtonPopover() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`text-moreWhite p-1 rounded-full hover:bg-secondary transition ${
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
              // open Add Expense modal
              setOpen(false);
              console.log("Open Add Expense");
            }}
            className="w-full text-left text-xs px-5 py-2 hover:bg-background/60 transition flex items-center justify-between"
          >
            Add Expense{" "}
            <span className=" text-muted hidden md:inline">Alt+A</span>
          </button>
          <button
            onClick={() => {
              // open Quick Add modal
              setOpen(false);
              console.log("Open Quick Add");
            }}
            className="w-full text-left text-xs px-5 py-2 hover:bg-background/60 transition flex items-center justify-between"
          >
            Quick Add{" "}
            <span className=" text-muted hidden md:inline">Alt+Q</span>
          </button>
        </div>
      )}
    </div>
  );
}
