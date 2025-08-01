import BudgetCard from "./BudgetCard";
import AddBudgetCard from "./AddBudgetCard";

export default function BudgetGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      <BudgetCard category="Food" total={298} spent={160} />
      <AddBudgetCard />
    </div>
  );
}
