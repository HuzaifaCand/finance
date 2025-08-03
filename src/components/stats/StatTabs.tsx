"use client";

import clsx from "clsx";
import { useState } from "react";

const baseClass =
  "sm:px-10 px-4 py-2 rounded-lg text-xs md:text-sm font-medium";

export default function StatTabs() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  return (
    <div className="rounded-xl overflow-hidden bg-background">
      {/* Tabs */}
      <div className="flex justify-end sm:px-6 px-2 pb-6 pt-3">
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
      </div>
    </div>
  );
}
