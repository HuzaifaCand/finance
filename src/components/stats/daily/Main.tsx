"use client";

import { useEffect, useState } from "react";
import { useActiveDates } from "@/hooks/useActiveDates";
import DateSelector from "./DateSelector";
import DateHeader from "./DateHeader";
import DailyStatistics from "./Stats";
import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export function getPrevDate(dateStr: string): string {
  // Parse the input string as a Date
  const date = new Date(dateStr);

  // Subtract one day (in milliseconds)
  date.setDate(date.getDate() - 1);

  // Format back to yyyy-mm-dd with leading zeros
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

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

  const today = format(new Date(), "yyyy-MM-dd");

  const handleTodayClick = () => {
    if (!activeDates.includes(today)) {
      toast.error("Nothing tracked today bud.");
      return;
    }
    if (selectedDate === today) {
      toast.error("Already on today boss");
      return;
    }
    setSelectedDate(today);
  };

  const previousDate = selectedDate && getPrevDate(selectedDate);
  const prevDateExists = previousDate && activeDates.includes(previousDate);

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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center text-red">
        <p className="font-semibold text-lg">Error loading stats</p>
        <p className="text-muted text-sm">
          Something went wrong. Please try again.
        </p>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {selectedDate && <DateHeader dateStr={selectedDate} />}
        <div className="flex w-full sm:w-1/2 sm:justify-end gap-2">
          <div className="w-full max-w-[180px]">
            <DateSelector
              selectedDate={selectedDate}
              activeDates={activeDates}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <button
            onClick={handleTodayClick}
            className="flex items-center gap-1 px-4 py-1 text-[10px] sm:text-xs bg-tealBg/40 text-moreWhite rounded hover:bg-tealBg transition"
          >
            Today{" "}
            <span className="hidden mt-0.75 [@media(min-width:330px)]:inline">
              <ArrowRight className="w-2 h-2" />
            </span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      {selectedDate && (
        <DailyStatistics
          prevDate={prevDateExists ? previousDate : null}
          date={selectedDate}
        />
      )}
    </div>
  );
}
