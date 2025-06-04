"use client";

import { Modal } from "antd";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import React from "react";
import { IDashboardData, IUser } from "@/types";
import CustomAvatar from "../custom/CustomAvatar";

interface ProfileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profile: IUser | IDashboardData["userDetails"][0];
}

export default function ProfileModal({
  open,
  setOpen,
  profile,
}: ProfileModalProps) {
  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="bg-primary flex flex-col items-center gap-4 rounded-lg py-4">
        <CustomAvatar size={100} src={profile?.profile} name={profile?.name} />

        <h4 className="text-3xl font-bold text-white">{profile?.name}</h4>
      </div>

      <div className="px-12 py-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <div className="text-black">
            <h5 className="font-bold">Name</h5>
            <p className="text-base"> {profile?.name}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Email</h5>
            <p className="text-base">{profile?.email}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Contact</h5>
            <p className="text-base"> {profile?.phoneNumber || "--"}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Account Type</h5>
            <p className="">
              <Tag
                color={getTagColor(profile?.role)}
                className="!mt-1 !font-semibold capitalize"
              >
                {profile?.role}
              </Tag>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
