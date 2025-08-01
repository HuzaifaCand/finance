"use client";

import { useState } from "react";
import BudgetGrid from "./BudgetGrid";
import TotalBudgetCard from "./TotalBudgetCard";
import clsx from "clsx";

export default function BudgetTabs() {
  const [activeTab, setActiveTab] = useState<"total" | "categories">("total");

  return (
    <div className="rounded-xl overflow-hidden bg-background">
      {/* Tabs */}
      <div className="flex justify-end px-3 sm:px-6 pt-3 pb-6">
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("total")}
            className={clsx(
              "sm:px-10 px-4 py-2 rounded-lg text-xs md:text-sm font-medium",
              activeTab === "total"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Total Budget
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={clsx(
              "sm:px-10 px-4 py-2 rounded-lg text-xs md:text-sm font-medium",
              activeTab === "categories"
                ? "bg-secondary/80 text-moreWhite"
                : "bg-secondary/20 text-moreWhite hover:bg-secondary/60"
            )}
          >
            Categories
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-2 sm:px-6 pb-8">
        {activeTab === "categories" ? <BudgetGrid /> : <TotalBudgetCard />}
      </div>
    </div>
  );
}
