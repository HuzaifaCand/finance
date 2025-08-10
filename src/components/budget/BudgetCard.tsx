import { Budget } from "@/data/temp";
import ActionIcons from "./ActionIcons";

interface BudgetCardProps {
  budget: Budget;
  onClick?: () => void;
}

export default function BudgetCard({ budget, onClick }: BudgetCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-2xl bg-secondary/60 py-10 px-6 sm:min-h-[330px] min-h-[300px] flex flex-col text-moreWhite shadow-lg hover:cursor-pointer  items-center justify-center transition-all hover:bg-secondary duration-300"
    >
      <div className="blur-sm pointer-events-none select-none">
        <div className="absolute top-4 left-4 text-sm text-primary py-1 px-2 rounded-md font-medium">
          Day {budget.day} of 7
        </div>

        {/* Top Right - Budget Week */}
        <div className="absolute top-4 right-4 text-sm text-muted py-1 px-2 rounded-md font-medium">
          Week {budget.week}
        </div>

        {/* Center Content */}
        <div className="text-center mb-2">
          <h2 className="sm:text-xl text-lg font-semibold">
            {budget.category}
          </h2>
          <p className="sm:text-2xl text-xl font-bold text-primary">
            HK$ {budget.total}
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

        {/* Bottom fixed text */}
        <div className="absolute bottom-5.5 left-4 px-2 text-center">
          <p className=" text-xs text-teal/60">Click card for details</p>
        </div>

        {/* edit delete */}
        <ActionIcons />
      </div>
    </div>
  );
}
