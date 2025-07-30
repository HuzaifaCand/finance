"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const routes = [
  {
    name: "Tracker",
    href: "/tracker",
  },
  {
    name: "Statistics",
    href: "/stats",
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
    <nav className="top-0 z-50  px-6 lg:px-16 pt-3 pb-2 bg-background">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-moreWhite text-lg font-bold">
          Hey, <span className="text-teal">Name</span>
        </div>

        {/* Tab-like nav items */}
        <div className="flex items-center gap-2">
          {routes.map((route, i) => (
            <Link
              key={i}
              href={route.href}
              className={`px-5 py-1.5 rounded-sm text-xs transition-all duration-200
                ${
                  isActive(route.href)
                    ? "bg-secondary/70 text-white shadow-md"
                    : "text-muted hover:bg-muted/10 hover:text-moreWhite"
                }`}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
