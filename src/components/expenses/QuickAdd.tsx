import Modal from "../Modal";

interface QuickAddModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function QuickAddModal({ show, setShow }: QuickAddModalProps) {
  return (
    <Modal isOpen={show} onClose={() => setShow(false)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-moreWhite">Quick Add</h1>
        <p className="text-xs sm:text-sm text-teal/60 mb-2">
          Coming Later — need real user data before adding this
        </p>
        <div className="flex justify-end">
          <p className="text-muted hidden sm:inline text-[11px] italic">
            Use<kbd className="px-1">Esc</kbd> to leave.
          </p>
        </div>
      </div>
    </Modal>
  );
}
