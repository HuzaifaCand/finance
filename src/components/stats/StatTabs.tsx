"use client";

import clsx from "clsx";
import { useState } from "react";
import DailyMain from "./DailyMain";

const baseClass =
  "sm:px-10 px-6 py-1.5 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium";

export default function StatTabs() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  return (
    <div className="rounded-xl overflow-hidden bg-background">
      {/* Tabs */}

      <div className="flex items-center justify-between pb-6 pt-3">
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("daily")}
            className={clsx(
              baseClass,
              activeTab === "daily"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={clsx(
              baseClass,
              activeTab === "weekly"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={clsx(
              baseClass,
              activeTab === "monthly"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Monthly
          </button>
        </div>
        {activeTab === "daily" ? (
          <button
            title="Shortcut to stats for today"
            aria-label="Shortcut to stats for today"
            className={clsx(
              "text-[10px] sm:text-xs py-1.5 tracking-tight",
              "text-primary/70 hover:text-primary"
            )}
          >
            Today →
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="pb-8">
        {activeTab === "daily" ? <DailyMain /> : <></>}
      </div>
    </div>
  );
}
