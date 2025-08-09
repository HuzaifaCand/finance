"use client";

import { useEffect, useState } from "react";
import { useActiveDates } from "@/hooks/useActiveDates";
import DateSelector from "./DateSelector";
import DateHeader from "./DateHeader";
import DailyStatistics from "./DailyStats";

export default function DailyMain() {
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
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-2 text-teal text-sm font-medium">
          <span className="h-3 w-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span>Loading your stats...</span>
        </div>
      </div>
    );
  }

  if (activeDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-2">
        <h2 className="text-xl text-moreWhite font-bold">
          No expenses tracked yet
        </h2>
        <p className="text-muted text-xs sm:text-sm">
          Start tracking expenses to access statistics by date.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {selectedDate && <DateHeader dateStr={selectedDate} />}
        <div className="w-full max-w-[180px]">
          <DateSelector
            selectedDate={selectedDate}
            activeDates={activeDates}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>

      {/* Statistics */}
      {selectedDate && <DailyStatistics date={selectedDate} />}
    </div>
  );
}
