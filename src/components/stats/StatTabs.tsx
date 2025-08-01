"use client";

import clsx from "clsx";
import { useState } from "react";

export default function StatTabs() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  return (
    <div className="rounded-xl overflow-hidden border border-teal/10 bg-background">
      {/* Tabs */}
      <div className="flex justify-end px-6 py-6">
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("daily")}
            className={clsx(
              "px-4  py-2 rounded-lg text-xs md:text-sm font-medium",
              activeTab === "weekly"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={clsx(
              "px-4  py-2 rounded-lg text-xs md:text-sm font-medium",
              activeTab === "weekly"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Weekly
          </button>
          <button
            className={clsx(
              "px-4  py-2 rounded-lg text-xs md:text-sm font-medium",
              activeTab === "weekly"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Monthly
          </button>
        </div>
      </div>
    </div>
  );
}
