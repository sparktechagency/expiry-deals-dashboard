import FormWrapper from "@/components/form-components/FormWrapper";
import UTextArea from "@/components/form-components/UTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "antd";
import React from "react";
import z from "zod";

interface VendorRequestRejectModalProps {
  requestId: string;
  handleRejectRequest: Function;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .min(10, "Reason must be at least 10 characters long."),
});

const RejectRequestModal = ({
  handleRejectRequest,
  requestId,
  open,
  setOpen,
}: VendorRequestRejectModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Vendor Request Rejected"
      width={600}
      footer={null}
    >
      <FormWrapper
        onSubmit={(data) => handleRejectRequest(requestId, data)}
        resolver={zodResolver(FormSchema)}
      >
        <UTextArea
          name="reason"
          placeholder="Tell vendor why their account request was rejected..."
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
};

export default RejectRequestModal;
