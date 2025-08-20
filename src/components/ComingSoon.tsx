"use client";

interface ComingSoonProps {
  message?: string;
}

export default function ComingSoon({ message }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-tealBg/30 rounded-lg border border-teal/40 space-y-2">
      <span className="text-teal text-2xl sm:text-3xl font-bold animate-pulse">
        🚧 Coming Soon
      </span>
      {message && (
        <p className="text-muted text-sm sm:text-base text-center max-w-xs">
          {message}
        </p>
      )}
    </div>
  );
}
