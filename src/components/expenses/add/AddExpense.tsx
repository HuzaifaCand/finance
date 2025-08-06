import Modal from "../../Modal";
import AddForm from "./Form";

interface AddExpenseModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  date: Date;
}

export default function AddExpenseModal({
  show,
  setShow,
  date,
}: AddExpenseModalProps) {
  return (
    <Modal isOpen={show} onClose={() => setShow(false)}>
      <AddForm date={date} onClose={() => setShow(false)} />
    </Modal>
  );
}
