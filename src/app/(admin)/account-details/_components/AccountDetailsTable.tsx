"use client";

import { Flex, Input, Table, TableProps } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { UserCheck } from "lucide-react";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import CustomConfirm from "@/components/custom/CustomConfirm";
import ProfileModal from "@/components/shared-modals/ProfileModal";
import { Tag } from "antd";
import getTagColor from "@/utils/getTagColor";
import {
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} from "@/redux/features/user/usersApi";
import { IUser } from "@/types";
import CustomAvatar from "@/components/custom/CustomAvatar";
import dayjs from "dayjs";
import catchAsync from "@/utils/catchAsync";
import { toast } from "sonner";
const { Search } = Input;

export default function AccountDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Get all users
  const { data: usersRes, isLoading: usersLoading } = useGetAllUsersQuery({
    limit: "999999",
    searchTerm: searchText,
  });
  const users = usersRes?.data?.data || [];
 

  // User status update handle
  const [toggleUserStatus] = useToggleUserStatusMutation();
  const handleToggleStatus = (userId: string) => {
    catchAsync(async () => {
      await toggleUserStatus(userId).unwrap();
      toast.success("User status updated successfully!");
    });
  };

  // ================== Table Columns ================
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Name",
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomAvatar size={30} src={record?.profile} name={record?.name} />
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
      render(value) {
        return value || "N/A";
      },
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      render(value) {
        return dayjs(value).format("YYYY-MM-DD hh:mm A");
      },
    },
    {
      title: "Account Type",
      dataIndex: "role",
      filters: [
        {
          text: "User",
          value: "user",
        },
        {
          text: "Vendor",
          value: "vendor",
        },
        {
          text: "Admin",
          value: "admin",
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
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Blocked",
          value: "blocked",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
      render(value) {
        return (
          <Tag color={getTagColor(value)} className="capitalize">
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setProfileModalOpen(true);
                setSelectedUser(record);
              }}
            >
              <Eye color="var(--primary)" size={22} />
            </button>
          </Tooltip>
          {record?.status === "active" ? (
            <CustomConfirm
              title="Block User"
              description="Are you sure to block this user?"
              onConfirm={() => handleToggleStatus(record?._id)}
            >
              <Tooltip title="Block User">
                <button>
                  <UserX color="#F16365" size={22} />
                </button>
              </Tooltip>
            </CustomConfirm>
          ) : (
            <CustomConfirm
              title="Unblock User"
              description="Are you sure to unblock this user?"
              onConfirm={() => handleToggleStatus(record?._id)}
            >
              <Tooltip title="Block User">
                <button>
                  <UserCheck color="green" size={22} />
                </button>
              </Tooltip>
            </CustomConfirm>
          )}
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
        <Flex justify="end" gap={10} align="center" className="h-full w-1/3">
          <Search
            placeholder="Search users..."
            onSearch={(value) => setSearchText(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />
        </Flex>
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={users}
        scroll={{ x: "100%" }}
        loading={usersLoading}
        pagination={{
          pageSize: 10,
        }}
      ></Table>

      {profileModalOpen && selectedUser && (
        <ProfileModal
          open={profileModalOpen}
          setOpen={setProfileModalOpen}
          profile={selectedUser}
        />
      )}
    </ConfigProvider>
  );
}
