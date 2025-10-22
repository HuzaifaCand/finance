export default function StatsError({ thing }: { thing: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center text-red">
      <p className="font-semibold text-lg">Error {thing} stats</p>
      <p className="text-muted text-sm">
        Something went wrong. Please try again.
      </p>
    </div>
  );
}
