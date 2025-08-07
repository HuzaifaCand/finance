import BaseList from "@/components/categories/BaseList";
import CustomList from "@/components/categories/CustomList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories",
};

export default function CategoryPage() {
  return (
    <div className="p-6 space-y-8 text-moreWhite">
      <BaseList />
      <CustomList />
    </div>
  );
}
