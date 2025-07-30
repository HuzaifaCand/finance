// components/addform/AddExpense.tsx

import Modal from "../Modal";
import AddForm from "./Form";

interface AddExpenseModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function AddExpenseModal({
  show,
  setShow,
}: AddExpenseModalProps) {
  return (
    <Modal isOpen={show} onClose={() => setShow(false)}>
      <AddForm />
    </Modal>
  );
}
