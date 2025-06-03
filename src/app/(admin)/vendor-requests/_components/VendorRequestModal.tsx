import { Modal } from "antd";
import React from "react";

interface VendorRequestModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VendorRequestModal({
  open,
  setOpen,
}: VendorRequestModalProps) {
  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      // title
    >
      <h1>Hello</h1>
    </Modal>
  );
}
