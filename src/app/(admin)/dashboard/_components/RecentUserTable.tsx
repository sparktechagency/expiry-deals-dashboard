"use client";

import { ConfigProvider, TableProps } from "antd";
import { Table } from "antd";
import { UserX } from "lucide-react";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import getTagColor from "@/utils/getTagColor";
import ProfileModal from "@/components/shared-modals/ProfileModal";

interface UserData {
  key: number;
  name: string;
  userImg: StaticImageData;
  email: string;
  contact: string;
  date: string;
  accountType: "User" | "Vendor";
}

// Dummy Data
const data: UserData[] = Array.from({ length: 5 }).map((_, inx) => ({
  key: inx + 1,
  name: "Soumaya",
  userImg: userImage,
  email: "soumaya@gmail.com",
  contact: "+1 (234) 567-890",
  date: "Oct 24 2024, 11:10 PM",
  accountType: inx % 3 === 0 ? "User" : "Vendor",
}));

const RecentUserTable = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // =============== Table columns ===============
  const columns: TableProps<UserData>["columns"] = [
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
            width={40}
            height={40}
            className="aspect-square rounded-full"
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
      title: "Date",
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
            <button onClick={() => setShowProfileModal(true)}>
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <button>
              <UserX color="#F16365" size={22} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <h4 className="text-2xl font-semibold">Recent Registration</h4>

      <div className="my-5">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
