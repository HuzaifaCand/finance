import BudgetTabs from "@/components/budget/BudgetTabs";
import Navbar from "@/components/Navbar";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Budgets",
};

export default function BudgetingPage() {
  return (
    <PageTransitionWrapper>
      <div className="w-full flex justify-center px-4 py-2">
        <div className="w-full max-w-5xl bg-background rounded-xl overflow-hidden relative">
          <div className="pt-8">
            <div className="flex justify-between items-center px-4">
              <div>
                <h1 className="sm:text-3xl text-xl font-bold tracking-tight text-moreWhite">
                  Budgeting
                </h1>
                <div className="hidden sm:inline text-sm">
                  <span className="text-muted ">Budgeting = </span>
                  <span className="text-primary/80">Control</span>
                </div>
              </div>
              <Navbar />
            </div>
            <div className="my-6">
              <BudgetTabs />
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
