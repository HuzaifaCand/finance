"use client";

import {
  format,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

import { useState } from "react";

interface CalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
}

export default function Calendar({ selected, onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selected));

  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const days = [];
  let day = start;

  while (day <= end) {
    const currentDay = day; // 🔑 capture this day's value so it's not mutated later
    const isCurrentMonth = isSameMonth(currentDay, currentMonth);
    const isSelected = isSameDay(currentDay, selected);

    days.push(
      <div
        key={currentDay.toISOString()}
        onClick={() =>
          onSelect(
            new Date(
              currentDay.getFullYear(),
              currentDay.getMonth(),
              currentDay.getDate()
            )
          )
        }
        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-sm
      ${!isCurrentMonth ? "text-muted" : "text-moreWhite"}
      ${isSelected ? "bg-secondary text-white" : "hover:bg-muted/30"}`}
      >
        {format(currentDay, "d")}
      </div>
    );

    day = addDays(day, 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(
      <div key={i} className="flex justify-between mb-1">
        {days.slice(i, i + 7)}
      </div>
    );
  }

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-2 py-1 rounded hover:bg-muted/20 text-moreWhite"
        >
          ←
        </button>
        <div className="font-semibold text-moreWhite">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-2 py-1 rounded hover:bg-muted/20 text-moreWhite"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="font-medium text-moreWhite">
            {d}
          </div>
        ))}
      </div>
      <div>{weeks}</div>
    </div>
  );
}
