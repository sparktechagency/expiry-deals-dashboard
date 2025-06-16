import CustomAvatar from "@/components/custom/CustomAvatar";
import getTagColor from "@/utils/getTagColor";
import { Modal, Tag } from "antd";
import React from "react";

interface VendorRequestModalProps {
  modalData: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VendorRequestModal({
  modalData,
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
      <div className="bg-primary flex flex-col items-center gap-4 rounded-lg py-4">
        <CustomAvatar
          size={100}
          src={modalData?.document}
          name={modalData?.name}
        />

        <h4 className="text-3xl font-bold text-white">{modalData?.name}</h4>
      </div>

      <div className="px-12 py-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <div className="text-black">
            <h5 className="font-bold">Name</h5>
            <p className="text-base"> {modalData?.name}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Email</h5>
            <p className="text-base">{modalData?.email}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Shop Name</h5>
            <p className="text-base"> {modalData?.shopName || "--"}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Status</h5>
            <p className="">
              <Tag
                color={getTagColor(modalData?.status)}
                className="!mt-1 !font-semibold capitalize"
              >
                {modalData?.status}
              </Tag>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
