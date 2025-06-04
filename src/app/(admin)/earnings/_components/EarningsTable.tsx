"use client";

import { Col, Flex, Row, Table, TableProps } from "antd";
import { Tag } from "antd";
import { Copy, Filter } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
// import { DatePicker } from "antd";
import { formatString } from "@/utils/formatString";
import { useState } from "react";
import { useGetAllEarningsQuery } from "@/redux/features/earnings/earningsApi";
import { IEarning } from "@/types";
import formatCurrency from "@/utils/formatCurrency";
import dayjs from "dayjs";
import CustomAvatar from "@/components/custom/CustomAvatar";
import copyToClipboard from "@/utils/copyToClipboard";
import getTagColor from "@/utils/getTagColor";
const { Search } = Input;

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Get earnings data
  const { data: earningsRes, isLoading: earningsLoading } =
    useGetAllEarningsQuery({
      limit: "99999",
      searchTerm: searchText,
    });
  const earnings = earningsRes?.data;
  const earningsTableData: IEarning[] = earnings?.allData || [];

  // ---------------- Table columns ----------------
  const columns: TableProps<IEarning>["columns"] = [
    {
      title: "Paid By",
      dataIndex: "user",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={12}>
            <CustomAvatar src={value?.profile} name={value?.name} size={40} />
            <div>
              <p>{value?.name}</p>
              <p className="text-sm text-gray-500">{value?.email}</p>
            </div>
          </Flex>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Paid",
          value: "paid",
        },
        {
          text: "Unpaid",
          value: "unpaid",
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
        record?.status?.indexOf(value as string) === 0,
      render: (value) => (
        <Tag
          color={getTagColor(value?.toLowerCase())}
          className="!text-sm capitalize"
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "price",
      render: (value) => formatCurrency(Number(value)),
    },
    {
      title: "Transaction Id",
      dataIndex: "trnId",
      render: (value) => (
        <Flex>
          <Tag
            color="magenta"
            className="cursor-pointer !text-sm"
            onClick={() => setShowFormattedTnxId(!showFormattedTnxId)}
            role="button"
          >
            {showFormattedTnxId
              ? formatString.formatTransactionId(value)
              : value}
          </Tag>

          <button onClick={() => copyToClipboard(value)}>
            <Copy size={16} className="text-primary hover:text-primary/70" />
          </button>
        </Flex>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => dayjs(value).format("DD-MM-YYYY, hh:mm A"),
    },
  ];

  return (
    <div className="!space-y-5">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>

        <Flex justify="end" gap={10} align="center" className="h-full w-1/3">
          <Search
            placeholder="Search Earnings..."
            onSearch={(value) => setSearchText(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />

          {/* <Flex justify="end" gap={14} align="center" className="h-16 w-max">
            <DatePicker
              picker="month"
              placeholder="Filter Month"
              style={{ height: "65%" }}
            />
          </Flex> */}
        </Flex>
      </Flex>

      <Row gutter={16}>
        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="bg-primary w-full rounded-lg !px-4 !py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Today&apos;s Earnings</h4>
              <h4 className="text-lg font-bold">
                {formatCurrency(Number(earnings?.todayEarnings))}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="w-full rounded-lg bg-green-600 !px-4 !py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Total Earnings</h4>
              <h4 className="text-lg font-bold">
                {formatCurrency(Number(earnings?.totalEarnings))}
              </h4>
            </Flex>
          </Flex>
        </Col>
      </Row>

      <div className="">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={earningsTableData}
          loading={earningsLoading}
          scroll={{ x: "100%" }}
          pagination={{
            pageSize: 10,
          }}
        ></Table>
      </div>
    </div>
  );
}
