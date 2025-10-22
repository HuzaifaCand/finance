import Loading from "@/components/Loading";
import ExpensesDontExist from "@/components/stats/ExpensesDontExist";
import { useEffect, useState } from "react";
import StatsError from "../StatsError";
import { getActiveWeeks, getWeekFromDate } from "@/lib/date";
import { Week } from "@/lib/date";
import WeekSelector from "./WeekSelector";
import WeeklyStats from "./WeeklyStats";

interface Props {
  activeDates: string[];
  fetching: boolean;
  error: Error | null;
  userId: string | undefined;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
}

export default function WeeklyMain({
  activeDates,
  fetching,
  error,
  userId,
  selectedDate,
}: Props) {
  const [activeWeeks, setActiveWeeks] = useState<Week[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);

  useEffect(() => {
    if (!fetching && activeDates.length > 0) {
      setActiveWeeks(getActiveWeeks(activeDates));
    }
  }, [activeDates]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedWeek(getWeekFromDate(selectedDate, activeWeeks));
    }
  }, [selectedDate, activeWeeks]);

  if (activeDates.length === 0) {
    return <ExpensesDontExist type="week" />;
  }
  if (fetching) {
    return <Loading text="Fetching stats..." />;
  }

  if (error) {
    return <StatsError thing="fetching" />;
  }

  return (
    <div className="flex flex-col gap-6 py-6 overflow-visible">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {selectedWeek && (
          <h2 className="text-moreWhite text-xl sm:text-2xl font-bold">
            {selectedWeek.label}
          </h2>
        )}

        <div className="w-full max-w-[180px]">
          <WeekSelector
            activeWeeks={activeWeeks}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </div>
      </div>
      {selectedWeek && userId && (
        <WeeklyStats
          selectedWeek={selectedWeek}
          userId={userId}
          activeDates={activeDates}
        />
      )}
    </div>
  );
}
