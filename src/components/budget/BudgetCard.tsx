interface BudgetCardProps {
  category: string;
  total: number;
  spent: number;
  onClick?: () => void;
}

export default function BudgetCard({
  category,
  total,
  spent,
  onClick,
}: BudgetCardProps) {
  const progress = Math.min(spent / total, 1);

  return (
    <div
      onClick={onClick}
      className="rounded-2xl bg-secondary/60 py-10 px-6 min-h-[300px] flex flex-col text-moreWhite shadow-lg hover:cursor-pointer"
    >
      {/* Top Bar */}
      <div className="flex justify-between text-sm text-muted mb-4">
        <span className="text-primary">Day 4</span>
        <span>Week 0</span>
      </div>

      {/* Center Content */}
      <div className="text-center mb-2 mt-4">
        <h2 className="text-lg font-medium">{category}</h2>
        <p className="text-xl font-bold text-primary">{total} HKD</p>
      </div>

      {/* Progress */}
      <div className="max-w-xs w-full mx-auto">
        <div className="h-3 w-full bg-muted rounded-full">
          <div
            className="h-3 bg-teal-400 rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-center text-muted">
          Spent - {spent} HKD
        </p>
      </div>

      {/* Spacer pushes text down */}
      <div className="flex-grow" />

      {/* Bottom fixed text */}
      <p className="text-center text-xs text-teal/60">Click card for details</p>
    </div>
  );
}
