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
      <h1 className="text-md [@media(min-width:360px)]:text-lg [@media(min-width:400px)]:text-xl sm:text-2xl md:text-3xl font-bold text-moreWhite tracking-tight">
        {format(date, "EEEE d MMMM")}
      </h1>

      <Popover className="relative mt-1">
        <PopoverButton className="p-1.5 rounded-md bg-secondary/50 text-moreWhite border border-muted/30 hover:bg-secondary/70">
          <CalendarIcon className="w-4 h-4" />
        </PopoverButton>

        <PopoverPanel className="fixed inset-0 flex items-start justify-center sm:absolute sm:inset-auto sm:mt-2 z-50">
          {({ close }) => (
            <div className="bg-background p-4 rounded-lg shadow-lg w-64 max-h-[80vh] overflow-y-auto">
              <Calendar
                selected={date}
                onSelect={(d) => {
                  setDate(d);

                  close(); // auto-close popover
                }}
              />
            </div>
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
}
