"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Content from "./Content";
import clsx from "clsx";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden pt-4 pl-4">
      <button onClick={() => setOpen(true)} className="text-primary">
        <Menu size={20} />
      </button>

      {/* Overlay + Drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-4/5 max-w-xs bg-secondary/70 text-primary p-6 transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary/50 hover:scrollbar-thumb-secondary/70",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex justify-end mb-4">
            <button onClick={() => setOpen(false)} className="text-primary">
              <X size={20} />
            </button>
          </div>
          <Content />
        </div>
      </div>
    </div>
  );
}
