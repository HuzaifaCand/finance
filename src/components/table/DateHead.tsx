"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

interface Props {
  date: Date;
  setDate: (d: Date) => void;
}

export default function DateHead({ date, setDate }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // don’t render anything server-side
  }
  return (
    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
      <h1 className="sm:text-2xl md:text-3xl text-xl font-bold text-moreWhite tracking-tight">
        {date.toLocaleDateString("en-CA", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </h1>

      <div className="relative max-w-[200px] w-full sm:w-auto hover:cursor-pointer mt-1">
        <DatePicker
          minDate={new Date(new Date().getFullYear(), 0, 1)}
          maxDate={new Date(new Date().getFullYear(), 11, 31)}
          selected={date}
          onChange={(d) => d && setDate(d)}
          dateFormat="dd/MM/yyyy"
          className="bg-secondary/50 text-moreWhite hover:cursor-pointer placeholder:text-muted text-xs px-2 py-1 rounded-md focus:outline-none border border-muted/30"
          showPopperArrow={false}
          calendarClassName="darkDatepicker"
          wrapperClassName="cursor-pointer"
        />
      </div>
    </div>
  );
}
