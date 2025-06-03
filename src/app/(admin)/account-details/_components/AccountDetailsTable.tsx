"use client";

import { Input, Table, TableProps } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import CustomConfirm from "@/components/custom/CustomConfirm";
import { message } from "antd";
import ProfileModal from "@/components/shared-modals/ProfileModal";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";

interface AccountDetailsData {
  key: number;
  name: string;
  userImg: StaticImageData;
  email: string;
  contact: string;
  date: string;
  accountType: string;
}

// Dummy table Data
const data: AccountDetailsData[] = Array.from({ length: 10 }).map((_, inx) => ({
  key: inx + 1,
  name: "Soumaya",
  userImg: userImage,
  email: "soumaya@gmail.com",
  contact: "+1 (234) 567-890",
  date: "Oct 24 2024, 11:10 PM",
  accountType: inx % 2 === 0 ? "Vendor" : "User",
}));

export default function AccountDetailsTable() {
  const [, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Block user handler
  const handleBlockUser = () => {
    message.success("User blocked successfully");
  };

  // ================== Table Columns ================
  const columns: TableProps<AccountDetailsData>["columns"] = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
            width={1200}
            height={1200}
            className="aspect-square h-auto w-10 rounded-full"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Registered At",
      dataIndex: "date",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",

      filters: [
        {
          text: "User",
          value: "User",
        },
        {
          text: "Vendor",
          value: "Vendor",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) =>
        record.accountType.indexOf(value as string) === 0,

      render: (value) => <Tag color={getTagColor(value)}>{value}</Tag>,
    },
    {
      title: "Action",
      render: () => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setProfileModalOpen(true)}>
              <Eye color="var(--primary)" size={22} />
            </button>
          </Tooltip>

          <CustomConfirm
            title="Block User"
            description="Are you sure to block this user?"
            onConfirm={handleBlockUser}
          >
            <Tooltip title="Block User">
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </Tooltip>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--primary)",
          colorInfo: "var(--primary)",
        },
      }}
    >
      <div className="flex-center-between mb-3">
        <h3 className="text-2xl font-bold">Account Details</h3>
        <div className="w-1/3">
          <Input
            placeholder="Search by name or email"
            prefix={<Search className="mr-2 text-black" size={20} />}
            className="h-11 !rounded-lg !border !text-base"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "100%" }}
      ></Table>

      {profileModalOpen && (
        <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} />
      )}
    </ConfigProvider>
  );
}
