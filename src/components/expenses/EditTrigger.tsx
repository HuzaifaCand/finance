"use client";

import { useState } from "react";
import EditIcon from "../EditIcon";
import Modal from "../Modal";
import { PaymentMethod } from "@/models/expense";
import AddForm from "./Form";

interface Props {
  expenseToEdit: {
    id?: string;
    desc: string;
    category: string;
    method: PaymentMethod;
    cost: number;
    date: string;
  };
}

export default function EditTrigger({ expenseToEdit }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <EditIcon onEdit={() => setOpen(true)} />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <AddForm expenseToEdit={expenseToEdit} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
