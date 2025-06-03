import { Popconfirm } from "antd";
import React from "react";

interface CustomConfirmProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
}

export default function CustomConfirm({
  children,
  title,
  description,
  onConfirm,
  okText = "Yes",
  cancelText = "No",
}: CustomConfirmProps) {
  return (
    <Popconfirm
      title={title || "Delete"}
      description={description || "Are you sure you want to do it?"}
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  );
}
