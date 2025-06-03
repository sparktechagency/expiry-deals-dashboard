/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Flex, TableProps, Tooltip } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Eye } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { Image } from "antd";
import getTagColor from "@/utils/getTagColor";
import CustomConfirm from "@/components/custom/CustomConfirm";
import { useState } from "react";
import VendorRequestModal from "./VendorRequestModal";
import {
  useApproveVendorRequestMutation,
  useGetAllVendorRequestsQuery,
  useRejectVendorRequestMutation,
} from "@/redux/features/vendor-request/vendorRequestApi";
import { useSearchParams } from "next/navigation";
import { IVendorRequest } from "@/types/vendorRequest.type";
import dayjs from "dayjs";
import { toast } from "sonner";
const { Search } = Input;

export default function VendorRequestsTable() {
  const [showRequestDetailsModal, setShowRequestDetailsModal] =
    useState<boolean>(false);
  const searchParams = useSearchParams();

  const query = {
    page: "1",
    limit: "10",
  };
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  query["page"] = page;
  query["limit"] = limit;

  // Get all vendor requests
  const { data: vendorRequestsRes, isLoading: vendorRequestsLoading } =
    useGetAllVendorRequestsQuery(query);
  const vendorRequests = vendorRequestsRes?.data?.data || [];
  // const vendorRequestsMeta = vendorRequestsRes?.data?.meta || {};

  const [approveRequest] = useApproveVendorRequestMutation();
  const [rejectRequest] = useRejectVendorRequestMutation();

  const handleRejectRequest = async (requestId: string) => {
    const toastId = toast.loading("Processing...");
    try {
      await rejectRequest(requestId).unwrap();
      toast.success("Request Rejected Successfully!", {
        id: toastId,
      });
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
  const columns: TableProps<IVendorRequest>["columns"] = [
    {
      title: "Vendor Name",
      dataIndex: "name",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Document",
      dataIndex: "document",
      render(value) {
        return (
          <Image
            src={value}
            alt={"Vendor proof documents"}
            height={50}
            width={50}
            className="object-cover"
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render(value) {
        return (
          <Tag color={getTagColor(value)} className="capitalize">
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Apply Date",
      dataIndex: "createdAt",
      render(value) {
        return <span>{dayjs(value).format("DD MMM YYYY, hh:mm A")}</span>;
      },
    },
    {
      title: "Action",
      render: (value) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setShowRequestDetailsModal(true)}>
              <Eye color="var(--primary)" size={22} />
            </button>
          </Tooltip>
          {/* {JSON.stringify(value?._id)} */}

          <CustomConfirm
            title="Approve Request"
            description="Are you sure to approve this request?"
            onConfirm={() => handleApproveRequest(value?._id)}
          >
            <Tooltip title="Approve Request">
              <button>
                <Icon
                  color="#008000"
                  height={22}
                  width={22}
                  icon="tdesign:check-circle"
                />

                <div className="sr-only">Approve request</div>
              </button>
            </Tooltip>
          </CustomConfirm>

          <CustomConfirm
            title="Reject Request"
            description="Are you sure to reject this request?"
            onConfirm={() => handleRejectRequest(value?._id)}
          >
            <Tooltip title="Reject Request">
              <button>
                <Icon
                  color="#F16365"
                  height={22}
                  width={22}
                  icon="charm:circle-cross"
                />

                <div className="sr-only">Reject request</div>
              </button>
            </Tooltip>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="!space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">
          Vendor Approval Requests
        </h4>

        <Flex justify="end" gap={10} align="center" className="h-full w-1/3">
          <Search
            placeholder="Search vendors by mail..."
            onSearch={(value) => console.log(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />
        </Flex>
      </Flex>

      <div className="">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={vendorRequests}
          loading={vendorRequestsLoading}
          scroll={{ x: "100%" }}
          pagination={{
            pageSize: 15,
          }}
        ></Table>
      </div>

      {/* Modals */}
      {showRequestDetailsModal && (
        <VendorRequestModal
          open={showRequestDetailsModal}
          setOpen={setShowRequestDetailsModal}
        />
      )}
    </div>
  );
}
