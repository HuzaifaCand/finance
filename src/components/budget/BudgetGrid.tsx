import BudgetCard from "./BudgetCard";
import AddBudgetTrigger from "./AddBudgetTrigger";
import { budgets } from "@/data/temp";

export default function BudgetGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
      {budgets.map((budget, i) => (
        <BudgetCard budget={budget} key={i} />
      ))}

      <AddBudgetTrigger />
    </div>
  );
}
