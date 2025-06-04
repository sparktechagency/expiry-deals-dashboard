/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Flex, TableProps, Tooltip } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Eye } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import getTagColor from "@/utils/getTagColor";
import CustomConfirm from "@/components/custom/CustomConfirm";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  useApproveWithdrawRequestMutation,
  useGetAllWithdrawRequestsQuery,
  useRejectWithdrawRequestMutation,
} from "@/redux/features/withdraw-request/withdrawRequestApi";
import { IWithdrawRequest } from "@/types/withdrawRequest.type";
import CustomAvatar from "@/components/custom/CustomAvatar";
import WithdrawRequestModal from "./WithdrawRequestModal";
import { IQueryParams } from "@/types";
import RejectionRequestModal from "./RejectionRequestModal";
const { Search } = Input;

export default function WithdrawRequestsContainer() {
  const [showRequestDetailsModal, setShowRequestDetailsModal] =
    useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] =
    useState<IWithdrawRequest | null>(null);
  const [showRejectionReasonModal, setShowRejectionReasonModal] =
    useState(false);
  const [searchText, setSearchText] = useState<string>("");

  // Pagination, search queries
  const query: IQueryParams = {};
  const limit = "999999";
  query.limit = limit;
  query.searchTerm = searchText;

  // Get all withdraw requests
  const { data: withdrawRequestsRes, isLoading: withdrawRequestsLoading } =
    useGetAllWithdrawRequestsQuery(query);
  const withdrawRequests = withdrawRequestsRes?.data?.data || [];

  const [approveRequest] = useApproveWithdrawRequestMutation();
  const [rejectRequest] = useRejectWithdrawRequestMutation();

  const handleRejectRequest = async (requestId: string, reason: string) => {
    const toastId = toast.loading("Processing...");
    try {
      await rejectRequest({
        id: requestId,
        payload: {
          reason,
        },
      }).unwrap();
      toast.success("Request Rejected Successfully!", {
        id: toastId,
      });

      setShowRejectionReasonModal(false);
      if (showRequestDetailsModal === true) {
        setShowRequestDetailsModal(false);
      }
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Failed to reject request!",
        {
          id: toastId,
        },
      );
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    const toastId = toast.loading("Processing...");
    try {
      await approveRequest(requestId).unwrap();
      toast.success("Request Approved Successfully!", {
        id: toastId,
      });

      if (showRequestDetailsModal === true) {
        setShowRequestDetailsModal(false);
      }
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Failed to approve request!",
        {
          id: toastId,
        },
      );
    }
  };

  // ---------------- Table columns ----------------
  const columns: TableProps<IWithdrawRequest>["columns"] = [
    {
      title: "Vendor",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomAvatar
            size={30}
            src={record?.vendor?.profile}
            name={record?.vendor?.name}
          />
          <p className="font-medium">{record?.vendor?.name}</p>
        </div>
      ),
    },
    {
      title: "Email/Phone",
      render(_, record) {
        return (
          <div className="flex-center-start flex-col gap-x-2">
            <p className="font-medium">{record?.vendor?.email}</p>
            <p className="font-medium">{record?.vendor?.phoneNumber}</p>
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => `$${value}`,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={getTagColor(value)} className="capitalize">
          {value}
        </Tag>
      ),
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      render: (value) => (
        <span>{dayjs(value).format("DD MMM YYYY, hh:mm A")}</span>
      ),
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setShowRequestDetailsModal(true);
                setSelectedRequest(record);
              }}
            >
              <Eye color="var(--primary)" size={22} />
            </button>
          </Tooltip>

          {record?.status?.toLowerCase() === "pending" && (
            <>
              <CustomConfirm
                title="Approve Withdrawal"
                description="Are you sure to approve this withdrawal request?"
                onConfirm={() => handleApproveRequest(record._id)}
              >
                <Tooltip title="Approve Withdrawal">
                  <button>
                    <Icon
                      color="#008000"
                      height={22}
                      width={22}
                      icon="tdesign:check-circle"
                    />
                    <div className="sr-only">Approve withdrawal</div>
                  </button>
                </Tooltip>
              </CustomConfirm>

              <Tooltip title="Reject Withdrawal">
                <button
                  onClick={() => {
                    setShowRejectionReasonModal(true);
                    setSelectedRequest(record);
                  }}
                >
                  <Icon
                    color="#F16365"
                    height={22}
                    width={22}
                    icon="charm:circle-cross"
                  />
                  <div className="sr-only">Reject withdrawal</div>
                </button>
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="!space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Withdrawal Requests</h4>

        <Flex justify="end" gap={10} align="center" className="h-full w-1/3">
          <Search
            placeholder="Search withdrawals..."
            onSearch={(value) => setSearchText(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />
        </Flex>
      </Flex>

      <Table
        columns={columns}
        dataSource={withdrawRequests}
        loading={withdrawRequestsLoading}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 10,
        }}
      />

      {showRequestDetailsModal && selectedRequest && (
        <WithdrawRequestModal
          open={showRequestDetailsModal}
          setOpen={setShowRequestDetailsModal}
          selectedRequest={selectedRequest}
          onApproveRequest={handleApproveRequest}
          onRejectRequest={() => {
            setShowRejectionReasonModal(true);
          }}
        />
      )}

      {showRejectionReasonModal && selectedRequest && (
        <RejectionRequestModal
          open={showRejectionReasonModal}
          setOpen={setShowRejectionReasonModal}
          selectedRequest={selectedRequest}
          onRejectRequest={handleRejectRequest}
        />
      )}
    </div>
  );
}
