import Modal from "../Modal";

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
      <h1 className="text-lg font-bold text-moreWhite">Add Budget</h1>
    </Modal>
  );
}
