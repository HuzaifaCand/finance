import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import MainTable from "@/components/table/MainTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Tracker",
};

export default function TrackerPage() {
  return (
    <PageTransitionWrapper>
      <MainTable />
    </PageTransitionWrapper>
  );
}
