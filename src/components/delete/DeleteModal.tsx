import Modal from "../Modal";
import DeleteConfirmation from "./DeleteConfirmation";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  date?: string;
  id?: string;
  type: "expense" | "category" | "budget";
}

export default function AddBudgetModal({
  isOpen,
  onClose,
  date,
  id,
  type,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DeleteConfirmation type={type} date={date} id={id} onClose={onClose} />
    </Modal>
  );
}
