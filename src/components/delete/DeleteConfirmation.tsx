import { deleteCategory } from "@/lib/category";
import { deleteExpense } from "@/lib/expense";
import { toast } from "sonner";
import DeleteUi from "./DeleteUi";
import { useAuthStore } from "@/stores/useAuthStore";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface DeleteConfirmationProps {
  type: "expense" | "category" | "budget";
  onClose: () => void;
  date?: string;
  id?: string;
}

export default function DeleteConfirmation({
  date,
  id,
  onClose,
  type,
}: DeleteConfirmationProps) {
  const userId = useAuthStore((state) => state.user?.id);

  const handleDelete = async () => {
    try {
      if (!userId) return;
      if (!id) return;

      if (type === "expense") {
        if (!date) throw new Error("Date is required for deleting expense");
        await deleteExpense(userId, date, id);
      } else if (type === "category") {
        await deleteCategory(userId, id);
      }

      toast.success(`${capitalize(type)} successfully deleted!`, {
        duration: 1000,
      });
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error(`Could not delete ${type}`);
    } finally {
      onClose();
    }
  };

  return <DeleteUi handleDelete={handleDelete} onClose={onClose} />;
}
