import React from "react";
import { baseCategories } from "@/data/category";
import { Trash2 } from "lucide-react";

// Later you can import your getCustomCategories + delete + add logic
// import { getCustomCategories } from "@/lib/expense";

export default function CategoryPage() {
  // TODO: Replace with real userId + onSnapshot once auth is available
  const userId = "demoUser";

  // TODO: Fetch custom categories inside a hook/server action/onSnapshot
  const customCategories: string[] = []; // placeholder for now

  return (
    <div className="p-6 space-y-8 text-moreWhite bg-background min-h-screen">
      {/* Base Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-moreWhite">
          Base Categories
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {baseCategories.map((cat) => (
            <li
              key={cat}
              className="px-3 py-2 rounded-lg bg-secondary text-moreWhite/90 border border-muted/30 text-sm"
            >
              {cat}
            </li>
          ))}
        </ul>
      </section>

      {/* Custom Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-moreWhite">
            Your Categories
          </h2>
          {/* TODO: Add button handler / open modal */}
          <button className="px-4 py-1 text-sm rounded-md bg-tealBg/60 font-medium text-moreWhite border border-teal/20 hover:bg-tealBg focus:outline-none">
            + Add
          </button>
        </div>

        {customCategories.length === 0 ? (
          <p className="text-muted text-sm">No custom categories yet.</p>
        ) : (
          <ul className="space-y-2">
            {customCategories.map((cat) => (
              <li
                key={cat}
                className="flex items-center justify-between px-3 py-2 bg-secondary rounded-lg border border-muted/30 text-sm"
              >
                <span>{cat}</span>
                {/* TODO: Hook delete action */}
                <button className="p-1 rounded hover:bg-background/50">
                  <Trash2 className="w-4 h-4 text-red" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
