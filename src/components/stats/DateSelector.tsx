"use client";

import { ChevronDown } from "lucide-react";
import { format, parse } from "date-fns";
import { useState, useRef } from "react";

interface DateSelectorProps {
  selectedDate: string | null;
  activeDates: string[];
  setSelectedDate: (v: string) => void;
}

export default function DateSelector({
  selectedDate,
  activeDates,
  setSelectedDate,
}: DateSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function formatDateDropdown(dateStr: string) {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    return format(date, "dd-MM-yyyy");
  }

  function handleDateChange(value: string) {
    setSelectedDate(value);
    localStorage.setItem("selectedDate", value);
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
      {/* Clickable "input" area */}
      <div
        className="bg-secondary/50 text-moreWhite text-xs w-full px-3 py-2 rounded-md    cursor-pointer flex items-center justify-between"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span>
          {selectedDate ? formatDateDropdown(selectedDate) : "Select a date"}
        </span>
        <ChevronDown
          size={12}
          className={`text-moreWhite transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <ul className="absolute mt-1 w-full z-10 text-xs bg-secondary/50 border border-secondary/30 rounded-md shadow-sm max-h-120 overflow-y-auto custom-scrollbar">
          {activeDates.map((date) => (
            <li
              key={date}
              onClick={() => handleDateChange(date)}
              className={`px-3 py-2 cursor-pointer text-moreWhite hover:bg-secondary/70 ${
                selectedDate === date ? "bg-secondary/70" : ""
              }`}
            >
              {formatDateDropdown(date)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
