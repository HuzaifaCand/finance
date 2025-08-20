import BaseList from "@/components/categories/BaseList";
import CustomList from "@/components/categories/CustomList";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import Protected from "@/components/Protected";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories",
};

export default function CategoryPage() {
  return (
    <Protected>
      <PageTransitionWrapper>
        <div className="p-6 space-y-8 text-moreWhite">
          <BaseList />
          <CustomList />
        </div>
      </PageTransitionWrapper>
    </Protected>
  );
}
