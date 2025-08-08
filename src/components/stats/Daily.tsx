"use client";

import { useEffect, useState } from "react";
import { getActiveDates } from "@/lib/expense";
import { format, parse } from "date-fns";
import { ChevronDown } from "lucide-react";

export default function DailyStats() {
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Format for display in header
  function formatDateHeader(dateStr: string) {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    return format(date, "EEEE, MMMM d");
  }

  // Format for dropdown display
  function formatDateDropdown(dateStr: string) {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    return format(date, "dd-MM-yyyy");
  }

  useEffect(() => {
    let isMounted = true;

    async function loadDates() {
      setIsLoading(true);
      const data = await getActiveDates("demoUser");

      if (!isMounted) return;

      setActiveDates(data);

      const savedDate = localStorage.getItem("selectedDate");

      if (savedDate && data.includes(savedDate)) {
        setSelectedDate(savedDate);
      } else if (data.length > 0) {
        const latest = data[data.length - 1];
        setSelectedDate(latest);
        localStorage.setItem("selectedDate", latest);
      }

      setIsLoading(false);
    }

    loadDates();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleDateChange(value: string) {
    setSelectedDate(value);
    localStorage.setItem("selectedDate", value);
  }

  if (isLoading) {
    return (
      <section className="flex items-center justify-center h-[400px] w-full">
        <div className="text-teal text-sm animate-pulse">Loading...</div>
      </section>
    );
  }

  if (activeDates.length === 0) {
    return (
      <section className="flex items-center bg justify-center h-[400px] w-full">
        <div className="text-center space-y-2">
          <h2 className="text-xl text-moreWhite font-bold">
            No expenses tracked yet
          </h2>
          <p className="text-muted text-sm">
            Start tracking expenses to access statistics by date.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col min-h-[600px] items-center justify-center py-10 px-6">
      {/* Top Left: Formatted Date Header */}

      <div className="absolute top-4 left-4 space-y-1">
        {selectedDate && (
          <h2 className="text-moreWhite text-2xl font-semibold">
            {formatDateHeader(selectedDate)}
          </h2>
        )}
      </div>
      {/* Top Right: Dropdown */}
      <div className="absolute top-4 right-4 sm:w-full sm:max-w-[180px]">
        <select
          value={selectedDate ?? ""}
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
          className="no-chevron bg-secondary/50 text-moreWhite text-sm w-full px-3 py-2 rounded-md focus:outline-none pr-8"
        >
          {activeDates.map((date) => (
            <option key={date} value={date}>
              {formatDateDropdown(date)}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
          <ChevronDown size={16} className="text-moreWhite" />
        </div>
      </div>

      {/* Placeholder for stats */}
      <div className="text-moreWhite/70 text-sm mt-10">
        Selected date: <span className="font-medium">{selectedDate}</span>
      </div>
    </section>
  );
}
