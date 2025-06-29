"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UTextArea from "@/components/form-components/UTextArea";
import { IWithdrawRequest } from "@/types/withdrawRequest.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "antd";
import { z } from "zod";

interface RejectionRequestModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRejectRequest: (id: string, reason: string) => void;
  selectedRequest: IWithdrawRequest;
}

const FormSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .min(10, "Reason must be at least 10 characters long."),
});

export default function RejectionRequestModal({
  open,
  setOpen,
  onRejectRequest,
  selectedRequest,
}: RejectionRequestModalProps) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Withdrawal Request Details"
      width={600}
      footer={null}
    >
      <FormWrapper
        onSubmit={(data) => onRejectRequest(selectedRequest?._id, data?.reason)}
        resolver={zodResolver(FormSchema)}
      >
        <UTextArea
          name="reason"
          placeholder="Tell vendor why their withdrawal request was rejected..."
          required
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
