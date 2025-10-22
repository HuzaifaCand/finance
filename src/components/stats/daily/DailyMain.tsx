"use client";

import { useEffect, useState } from "react";
import DateSelector from "./DateSelector";
import DateHeader from "./DateHeader";
import DailyStatistics from "./Stats";
import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { getPrevDate } from "@/lib/date";
import Loading from "@/components/Loading";
import ExpensesDontExist from "@/components/stats/ExpensesDontExist";
import StatsError from "../StatsError";

interface Props {
  activeDates: string[];
  fetching: boolean;
  error: Error | null;
  userId: string | undefined;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
}

export default function DailyMain({
  activeDates,
  fetching,
  error,
  userId,
  selectedDate,
  setSelectedDate,
}: Props) {
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
      toast.error("Nothing tracked today");
      return;
    }
    if (selectedDate === today) {
      toast.error("Already on today");
      return;
    }
    setSelectedDate(today);
  };

  const previousDate = selectedDate && getPrevDate(selectedDate);
  const prevDateExists = previousDate && activeDates.includes(previousDate);

  if (fetching) {
    return <Loading text="Fetching stats..." />;
  }

  if (error) {
    return <StatsError thing="fetching" />;
  }

  if (activeDates.length === 0) {
    return <ExpensesDontExist type="day" />;
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
          userId={userId ? userId : ""}
          prevDate={prevDateExists ? previousDate : null}
          date={selectedDate}
        />
      )}
    </div>
  );
}
