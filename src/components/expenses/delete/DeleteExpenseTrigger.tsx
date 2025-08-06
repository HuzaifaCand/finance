"use client";

import { useState } from "react";
import DeleteIcon from "../../table/DeleteIcon";
import DeleteModal from "./DeleteModal";

interface Props {
  date: string;
  id: string | undefined;
}

export default function DeleteTrigger({ date, id }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DeleteIcon onDelete={() => setOpen(true)} />
      <DeleteModal
        date={date}
        id={id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
