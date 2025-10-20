"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Content from "./Content";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden pt-4 pl-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary/50 hover:scrollbar-thumb-secondary/70 ">
      <button onClick={() => setOpen(true)} className="text-primary">
        <Menu size={20} />
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed inset-0 w-4/5 h-full bg-secondary/70 text-primary z-50 p-6 overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary/50 hover:scrollbar-thumb-secondary/70 ${
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => setOpen(false)} className="text-primary">
            <X size={20} />
          </button>
        </div>
        <Content onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}

// redeploy
