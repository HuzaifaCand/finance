export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-tealBg/30 hover:bg-tealBg/50 border border-teal/10 transition duration-200 py-4 sm:py-6 px-4 rounded-md flex flex-col items-center text-center">
      <p className="text-lg sm:text-xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-muted text-xs sm:text-sm uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
