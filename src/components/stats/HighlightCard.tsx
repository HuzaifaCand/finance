import { ArrowUpRight } from "lucide-react";

export default function HighlightCard({
  label,
  value,
  description,
  sublabel,
}: {
  label: string;
  value: string;
  description?: string;
  sublabel?: string; // optional, e.g. “Category”, “Day”
}) {
  return (
    <div className="relative bg-secondary/10 border border-secondary/40 rounded-xl p-4 flex flex-col gap-1 overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal to-emerald-400 group-hover:opacity-90 transition-opacity" />
      <div className="ml-3">
        <p className="text-muted text-xs uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-accent">{value}</p>
        {description && (
          <p className="text-sm text-muted truncate mt-1" title={description}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
