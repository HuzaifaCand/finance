import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import Protected from "@/components/Protected";
import MainTable from "@/components/table/MainTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Tracker",
  manifest: "/site.webmanifest",
};

export default function TrackerPage() {
  return (
    <Protected>
      <PageTransitionWrapper>
        <MainTable />
      </PageTransitionWrapper>
    </Protected>
  );
}
