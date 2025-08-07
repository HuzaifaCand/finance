"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";

interface Props {
  date: Date;
  setDate: (d: Date) => void;
}

export default function DateHead({ date, setDate }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <h1 className="text-md [@media(min-width:400px)]:text-lg [@media(min-width:470px)]:text-xl [@media(min-width:740px)]:text-2xl [@media(min-width:1000px)]:text-3xl font-bold text-moreWhite tracking-tight">
        {format(date, "EEEE d MMMM")}
      </h1>

      <div className="flex items-center gap-2">
        <Popover className="relative mt-1">
          <PopoverButton
            title="Select Date"
            className="p-1.5 rounded-md bg-secondary/10 focus:outline-none hover:cursor-pointer focus:bg-secondary text-moreWhite border border-muted/30 hover:bg-secondary/70"
          >
            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </PopoverButton>

          <PopoverPanel className="fixed inset-0 flex items-start justify-center sm:absolute sm:inset-auto sm:mt-2 z-50">
            {({ close }) => (
              <div className="bg-background p-4 rounded-lg shadow-lg w-64 max-h-[80vh] overflow-y-auto">
                <Calendar
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    close();
                  }}
                />
              </div>
            )}
          </PopoverPanel>
        </Popover>

        {/* Go to Today */}
        <button
          className="text-muted text-[10px] sm:text-xs sm:mt-1.5 mt-1 hover:underline"
          onClick={() => setDate(new Date())}
        >
          Go to today →
        </button>
      </div>
    </div>
  );
}
