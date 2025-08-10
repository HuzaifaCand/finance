import StatTabs from "@/components/stats/StatTabs";
import Navbar from "@/components/Navbar";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Statistics",
};

export default function StatsPage() {
  return (
    <PageTransitionWrapper>
      <div className="w-full flex justify-center px-4 py-2">
        <div className="w-full max-w-5xl bg-background rounded-xl overflow-hidden relative">
          <div className="pt-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="sm:text-3xl text-xl font-bold tracking-tight text-moreWhite">
                  Statistics
                </h1>
                <div className="text-xs sm:text-sm">
                  <span className="text-muted ">Statistics = </span>
                  <span className="text-primary/80">Clarity</span>
                </div>
              </div>
              <Navbar />
            </div>
          </div>
          <div className="my-6">
            <StatTabs />
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
