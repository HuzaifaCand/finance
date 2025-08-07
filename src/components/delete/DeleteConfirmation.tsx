import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // <-- your firestore instance
import { toast } from "sonner";

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
  const handleDelete = async () => {
    const userId = "demoUser";
    try {
      if (!id) return;

      if (type === "expense") {
        if (!date) throw new Error("Date is required for deleting expense");
        await deleteDoc(
          doc(db, "users", userId, "dates", date, "expenses", id)
        );
      } else if (type === "category") {
        await deleteDoc(doc(db, "users", userId, "customCategories", id));
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

  return (
    <div className="flex flex-col text-left gap-2 p-4 w-full">
      <h2 className="text-moreWhite text-xl font-semibold">Delete Expense</h2>
      <p className="text-moreWhite/80">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-8 py-2 rounded-lg text-moreWhite text-xs border border-gray-800 bg-background focus:outline-none focus:bg-gray-500/20 hover:cursor-pointer font-semibold hover:bg-gray-500/50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-8 py-2 rounded-lg text-moreWhite text-xs bg-red-800 font-semibold hover:bg-red-700 focus:outline-none hover:cursor-pointer focus:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
