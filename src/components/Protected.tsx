"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-teal text-sm font-medium">
          <span className="h-5 w-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
        </div>
      </div>
    );
  if (!user) return null; // will redirect anyway
  return <>{children}</>;
}
