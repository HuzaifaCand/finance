import ActionIcons from "./ActionIcons";

const mockData = {
  totalBudget: 800,
  spent: 310,
  day: 4,
  week: 1,
  topCategories: [
    { name: "Eating Out", amount: 90 },
    { name: "Groceries", amount: 65 },
    { name: "Transport", amount: 50 },
  ],
};

export default function TotalBudgetCard() {
  const progress = Math.min(mockData.spent / mockData.totalBudget, 1) * 100;

  return (
    <div className="relative rounded-2xl bg-secondary/60 py-10 px-6 sm:h-[600px] h-[500px]  flex flex-col items-center justify-center text-moreWhite">
      {/* Top Left - Day of Week */}
      <div className="absolute top-4 left-4 text-sm text-primary py-1 px-2 rounded-md font-medium">
        Day {mockData.day} of 7
      </div>

      {/* Top Right - Budget Week */}
      <div className="absolute top-4 right-4 text-sm text-muted py-1 px-2 rounded-md font-medium">
        Week {mockData.week}
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary text-center mb-2 sm:mb-4">
        Weekly Budget Overview
      </h1>

      {/* Total Budget Display */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-moreWhite mb-4">
        HK${mockData.totalBudget}
      </div>

      {/* Progress Bar */}
      <div className="max-w-md w-full mb-4">
        <div className="h-3 w-full bg-muted/40 rounded-full">
          <div
            className="h-3 bg-teal-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-md sm:text-lg text-center text-muted font-medium">
          Spent – HK${mockData.spent}
        </p>
      </div>

      {/* Top Categories */}
      <div className="mt-6 text-sm w-full max-w-xs">
        <h2 className="text-muted mb-2 text-center font-medium tracking-wide">
          Top Spending Categories
        </h2>
        <ul className="space-y-1">
          {mockData.topCategories.map((cat, idx) => (
            <li
              key={idx}
              className="flex justify-between px-4 py-2 bg-background/30 rounded-md text-moreWhite"
            >
              <span>{cat.name}</span>
              <span className="font-semibold">HK${cat.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Right - Edit/Delete */}
      <ActionIcons />
    </div>
  );
}
