import Modal from "../../Modal";
import DeleteConfirmation from "./DeleteConfirmation";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  id: string | undefined;
}

export default function AddBudgetModal({
  isOpen,
  onClose,
  date,
  id,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DeleteConfirmation date={date} id={id} onClose={onClose} />
    </Modal>
  );
}
