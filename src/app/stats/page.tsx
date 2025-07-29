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
            <h1 className="text-3xl font-bold tracking-tight text-moreWhite">
              Statistics
            </h1>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
