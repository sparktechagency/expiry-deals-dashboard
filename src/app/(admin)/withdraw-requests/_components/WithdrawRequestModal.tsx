/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IWithdrawRequest } from "@/types/withdrawRequest.type";
import getTagColor from "@/utils/getTagColor";
import { Divider, Modal, Tag } from "antd";
import dayjs from "dayjs";

interface WithdrawRequestModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRequest: IWithdrawRequest;
  onApproveRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
}

export default function WithdrawRequestModal({
  open,
  setOpen,
  selectedRequest,
  onApproveRequest,
  onRejectRequest,
}: WithdrawRequestModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Withdrawal Request Details"
      width={600}
      footer={null}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">User Name:</p>
            <p>{selectedRequest.vendor.name}</p>
          </div>
          <div>
            <p className="font-medium">Amount:</p>
            <p>${selectedRequest.amount}</p>
          </div>
          <div>
            <p className="font-medium capitalize">Status:</p>
            <Tag
              className={`capitalize`}
              color={getTagColor(selectedRequest?.status?.toLocaleLowerCase())}
            >
              {selectedRequest?.status}
            </Tag>
          </div>
          <div>
            <p className="font-medium">Request Date:</p>
            <p>
              {selectedRequest.createdAt
                ? dayjs(selectedRequest?.createdAt).format("DD MMM, YYYY")
                : ""}
            </p>
          </div>
          {selectedRequest?.status === "rejected" && (
            <div className="col-span-2 w-full space-y-1">
              <p className="font-medium">Rejection Reason</p>
              <p>{selectedRequest?.reason}</p>
            </div>
          )}
        </div>

        {selectedRequest.bankDetails && (
          <div className="mt-6">
            <h3 className="font-medium">Bank Details</h3>
            <Divider className="!mt-2 !mb-4" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Account Number:</p>
                <p>{selectedRequest.bankDetails.accountNumber}</p>
              </div>
              <div>
                <p className="font-medium">Bank Name:</p>
                <p>{selectedRequest.bankDetails.bankName}</p>
              </div>
            </div>
          </div>
        )}

        {selectedRequest?.status == "pending" && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => onRejectRequest(selectedRequest?._id)}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Reject
            </button>
            <button
              onClick={() => onApproveRequest(selectedRequest?._id)}
              className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
