import { Budget } from "@/data/temp";

interface BudgetCardProps {
  budget: Budget;
  onClick?: () => void;
}

export default function BudgetCard({ budget, onClick }: BudgetCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl bg-secondary/60 py-10 px-6 min-h-[330px] flex flex-col text-moreWhite shadow-lg hover:cursor-pointer  transition-all hover:bg-secondary duration-300"
    >
      {/* Top Bar */}
      <div className="flex justify-between text-sm text-muted mb-4">
        <span className="text-primary">Day {budget.day}</span>
        <span>Week {budget.week}</span>
      </div>

      {/* Center Content */}
      <div className="text-center mb-2 mt-8">
        <h2 className="sm:text-xl text-lg font-semibold">{budget.category}</h2>
        <p className="sm:text-2xl text-xl font-bold text-primary">
          {budget.total} HKD
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-xs w-full mx-auto">
        <div className="h-3 w-full bg-muted rounded-full">
          <div
            className="h-3 bg-teal-400 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(budget.spent / budget.total, 1) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm text-center text-muted font-medium">
          Spent - {budget.spent} HKD
        </p>
      </div>

      {/* Spacer pushes text down */}
      <div className="flex-grow" />

      {/* Bottom fixed text */}
      <p className="text-center text-xs text-teal/60">Click card for details</p>
    </div>
  );
}
