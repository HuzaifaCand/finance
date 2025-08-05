"use client";

import { useState } from "react";
import AddButtonPopover from "./AddButton";
import AddExpenseModal from "../add/AddExpense";
import QuickAddModal from "../add/QuickAdd";

export default function ExpenseModalController({ date }: { date: Date }) {
  const [modalType, setModalType] = useState<null | "addExpense" | "quickAdd">(
    null
  );

  return (
    <>
      <AddButtonPopover onActionSelect={(action) => setModalType(action)} />

      <AddExpenseModal
        date={date}
        show={modalType === "addExpense"}
        setShow={(v) => (v ? setModalType("addExpense") : setModalType(null))}
      />
      <QuickAddModal
        show={modalType === "quickAdd"}
        setShow={(v) => (v ? setModalType("quickAdd") : setModalType(null))}
      />
    </>
  );
}
