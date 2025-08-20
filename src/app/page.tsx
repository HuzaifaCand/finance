"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (loading) return; // wait for auth check
    if (user) {
      router.replace("/tracker");
    } else {
      router.replace("/login");
    }
  }, [user, loading, router]);

  return null;
}
