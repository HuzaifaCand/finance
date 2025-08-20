"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart, Wallet, List } from "lucide-react";

const routes = [
  {
    name: "Expense Tracker",
    href: "/tracker",
    icon: <List className="md:w-5 md:h-5 w-4 h-4" />,
  },
  {
    name: "Statistics",
    href: "/stats",
    icon: <BarChart className="md:w-5 md:h-5 w-4 h-4" />,
  },
  {
    name: "Budgeting",
    href: "/budgets",
    icon: <Wallet className="md:w-5 md:h-5 w-4 h-4" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = routes.findIndex((r) => isActive(r.href));
      if (e.altKey && e.key === "ArrowRight") {
        const next = routes[(currentIndex + 1) % routes.length];
        router.push(next.href);
      } else if (e.altKey && e.key === "ArrowLeft") {
        const prev = routes[(currentIndex - 1 + routes.length) % routes.length];
        router.push(prev.href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname]);

  return (
    <>
      {/* Tab-like nav items */}
      <div className="flex items-center gap-2 ">
        {routes.map((route, i) => (
          <Link
            title={route.name}
            key={i}
            href={route.href}
            className={`p-2 md:p-3 font-semibold rounded-full focus:outline-none focus:bg-secondary focus:text-moreWhite active:scale-95 active:bg-secondary transition-all duration-200
                ${
                  isActive(route.href)
                    ? "bg-secondary text-white shadow-lg"
                    : "text-muted hover:bg-muted/10 hover:text-moreWhite"
                }`}
          >
            {route.icon}
          </Link>
        ))}
      </div>
    </>
  );
}
