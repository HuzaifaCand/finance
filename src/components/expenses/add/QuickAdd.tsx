import Modal from "../../Modal";

interface QuickAddModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function QuickAddModal({ show, setShow }: QuickAddModalProps) {
  return (
    <Modal isOpen={show} onClose={() => setShow(false)}>
      <h1 className="text-3xl text-moreWhite">Quick Add</h1>
    </Modal>
  );
}
