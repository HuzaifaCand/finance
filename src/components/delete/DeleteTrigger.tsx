"use client";

import { useState } from "react";
import DeleteIcon from "../table/DeleteIcon";
import DeleteModal from "./DeleteModal";

interface Props {
  date?: string;
  id?: string;
  type: "expense" | "category" | "budget";
}

export default function DeleteTrigger({ date, id, type }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DeleteIcon onDelete={() => setOpen(true)} />
      <DeleteModal
        type={type}
        date={date}
        id={id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
