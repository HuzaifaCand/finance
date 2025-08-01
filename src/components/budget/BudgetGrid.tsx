import BudgetCard from "./BudgetCard";
import AddBudgetCard from "./AddBudgetCard";

export default function BudgetGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      <BudgetCard category="Food" total={298} spent={160} />
      <BudgetCard category="On Others" total={200} spent={40} />
      <BudgetCard category="Beverages" total={140} spent={130} />

      <AddBudgetCard />
    </div>
  );
}
