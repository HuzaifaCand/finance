"use client";

import clsx from "clsx";
import { useState } from "react";
import DailyMain from "./daily/Main";
import ComingSoon from "../ComingSoon";
import { useActiveDates } from "@/hooks/useActiveDates";
import { useAuthStore } from "@/stores/useAuthStore";

const baseClass =
  "sm:px-10 px-6 py-1.5 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium";

type tab = "daily" | "weekly" | "monthly";
export default function StatTabs() {
  const [activeTab, setActiveTab] = useState<tab>("daily");
  const userId = useAuthStore((state) => state.user?.id);
  const { activeDates, fetching, error } = useActiveDates(userId ?? "");

  return (
    <div className="rounded-xl overflow-hidden bg-background">
      <div className="flex items-center justify-between pb-6 pt-3">
        <div className="flex gap-1 sm:gap-2">
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as tab)}
              className={clsx(
                baseClass,
                activeTab === tab
                  ? "bg-secondary/80 text-moreWhite"
                  : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="pb-8">
        {activeTab === "daily" && (
          <DailyMain
            activeDates={activeDates}
            userId={userId}
            fetching={fetching}
            error={error}
          />
        )}
        {activeTab === "weekly" && (
          <ComingSoon message="Will get to it soon dw" />
        )}
        {activeTab === "monthly" && (
          <ComingSoon message="Will get to it soon dw" />
        )}
      </div>
    </div>
  );
}
