"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { Week } from "@/lib/date";

interface WeekSelectorProps {
  selectedWeek: Week | null;
  activeWeeks: Week[];
  setSelectedWeek: (week: Week) => void;
}

export default function WeekSelector({
  selectedWeek,
  activeWeeks,
  setSelectedWeek,
}: WeekSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleWeekChange(week: Week) {
    setSelectedWeek(week);
    setShowDropdown(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      tabIndex={0}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setShowDropdown(false);
        }
      }}
    >
      {/* Clickable header */}
      <div
        className="bg-secondary/50 text-moreWhite text-xs w-full px-3 py-2 rounded-md cursor-pointer flex items-center justify-between"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span>{selectedWeek ? selectedWeek.label : "Select a week"}</span>
        <ChevronDown
          size={12}
          className={`text-moreWhite transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <ul className="absolute mt-1 w-full z-10 text-xs bg-background border border-secondary/30 rounded-md shadow-sm max-h-60 overflow-y-auto custom-scrollbar">
          {activeWeeks.map((week) => (
            <li
              key={week.start}
              onClick={() => handleWeekChange(week)}
              className={`px-3 py-2 cursor-pointer text-moreWhite hover:bg-secondary/70 ${
                selectedWeek?.start === week.start ? "bg-secondary/70" : ""
              }`}
            >
              {week.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
