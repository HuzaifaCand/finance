import Modal from "../Modal";
import AddBudgetForm from "./AddBudgetForm";

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBudgetModal({
  isOpen,
  onClose,
}: AddBudgetModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddBudgetForm />
    </Modal>
  );
}
