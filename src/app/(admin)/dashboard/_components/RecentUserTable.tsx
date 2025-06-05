"use client";

import { ConfigProvider, TableProps } from "antd";
import { Table } from "antd";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import getTagColor from "@/utils/getTagColor";
import ProfileModal from "@/components/shared-modals/ProfileModal";
import { IDashboardData } from "@/types";
import CustomAvatar from "@/components/custom/CustomAvatar";
import dayjs from "dayjs";

const RecentUserTable = ({ data }: { data: IDashboardData["userDetails"] }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    IDashboardData["userDetails"][0] | null
  >(null);

  // =============== Table columns ===============
  const columns: TableProps<IDashboardData["userDetails"][0]>["columns"] = [
    {
      title: "Name",
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomAvatar src={record?.profile} name={record?.name} size={30} />
          <p className="font-medium">{record?.name}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "phoneNumber",
      render: (value) => value || "--",
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      render: (value) => dayjs(value).format("DD-MM-YYYY"),
    },
    {
      title: "Account Type",
      dataIndex: "role",

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
      onFilter: (value, record) => record.role.indexOf(value as string) === 0,

      render: (value) => (
        <Tag color={getTagColor(value)} className="capitalize">
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Tooltip title="Show Details">
          <button
            onClick={() => {
              setShowProfileModal(true);
              setSelectedUser(record);
            }}
          >
            <Eye color="var(--primary)" size={22} />
          </button>
        </Tooltip>
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
          dataSource={data ? data?.slice(0, 5) : []}
          scroll={{ x: "100%" }}
          pagination={false}
        ></Table>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedUser && (
        <ProfileModal
          open={showProfileModal}
          setOpen={setShowProfileModal}
          profile={selectedUser}
        />
      )}
    </ConfigProvider>
  );
};

export default RecentUserTable;
