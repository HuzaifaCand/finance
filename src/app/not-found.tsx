"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-moreWhite px-4">
      <h1 className="text-3xl sm:text-6xl font-extrabold text-accent mb-4">
        404
      </h1>
      <p className="text-md sm:text-xl text-muted mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push("/tracker")}
        className="bg-secondary hover:bg-secondary/80 transition-colors duration-200 text-moreWhite font-semibold py-3 px-12 rounded-lg shadow-lg"
      >
        Go to Tracker
      </button>
    </div>
  );
}
