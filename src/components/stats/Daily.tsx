"use client";

import { useEffect, useState } from "react";

import { useActiveDates } from "@/hooks/useActiveDates";
import DateSelector from "./DateSelector";
import DateHeader from "./DateHeader";

export default function DailyStats() {
  const userId = "demoUser";
  const { activeDates, loading, error } = useActiveDates(userId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedDate");
    if (saved && activeDates.includes(saved)) {
      setSelectedDate(saved);
    } else if (activeDates.length > 0) {
      setSelectedDate(activeDates[activeDates.length - 1]);
    }
  }, [activeDates]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-[400px] w-full">
        <div className="flex items-center gap-2 text-teal text-sm font-medium">
          <span className="h-3 w-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span>Loading your stats...</span>
        </div>
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
      <div className="absolute top-4 left-4 right-4 flex flex-col items-left gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          {selectedDate && <DateHeader dateStr={selectedDate} />}
        </div>
        {/* Top Right: Dropdown */}
        <div className="w-full max-w-[180px]">
          <DateSelector
            selectedDate={selectedDate}
            activeDates={activeDates}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </section>
  );
}
