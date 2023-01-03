"use client";

import { useState } from "react";
import InformationModal from "./InformationModal";
import { IoInformationCircleOutline } from "react-icons/io5";

function InformationButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => setOpen(true)}>
        <IoInformationCircleOutline size={30} />
      </button>
      <InformationModal setOpen={setOpen} isOpen={open} />
    </div>
  );
}

export default InformationButton;
