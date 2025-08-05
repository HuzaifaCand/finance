"use client";

import { useState } from "react";
import BudgetGrid from "./BudgetGrid";

import clsx from "clsx";

import TotalBudgetCard from "./TotalBudgetCard";

const baseClass =
  "sm:px-10 px-4 py-2 rounded-lg text-xs md:text-sm font-medium";

export default function BudgetTabs() {
  const [activeTab, setActiveTab] = useState<"total" | "categories">("total");

  return (
    <div className="rounded-xl overflow-hidden bg-background">
      {/* Tabs */}
      <div className="flex justify-end px-2 sm:px-6 pt-3 pb-6">
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("total")}
            className={clsx(
              baseClass,
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
              baseClass,
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
