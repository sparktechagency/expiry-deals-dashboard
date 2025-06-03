"use client";

import { Button, Col, Flex, Row, TableProps } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { Filter } from "lucide-react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
const { Search } = Input;
import userImg from "@/assets/images/user-avatar.png";
import { Image } from "antd";
import { formatString } from "@/utils/formatString";
import { useState } from "react";
import getTagColor from "@/utils/getTagColor";
import { StaticImageData } from "next/image";

interface EarningsTableData {
  id: string;
  guest: {
    name: string;
    img: StaticImageData;
  };
  amount: string;
  status: string;
  tnxId: string;
  date: string;
  accountType: string;
}

// Dummy Data
const data: EarningsTableData[] = Array.from({ length: 20 }).map((_, inx) => ({
  id: "INV0938",
  guest: {
    name: "Sarah Johnson",
    img: userImg,
  },
  amount: "499",
  status: "Paid",
  tnxId: "454842343454",
  date: "Aug, 15 2023 02:29 PM",
  accountType: inx % 2 === 0 ? "User" : "Vendor",
}));

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true);

  // ---------------- Table columns ----------------
  const columns: TableProps<EarningsTableData>["columns"] = [
    {
      title: "Invoice Id",
      dataIndex: "id",
      render: (value) => `#${value}`,
    },
    {
      title: "Paid By",
      dataIndex: "guest",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <Image
              src={value.img.src}
              alt={value.name}
              height={30}
              width={30}
              className="aspect-square rounded-full object-cover"
            />
            <p>{value.name}</p>
          </Flex>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => {
        return "$" + value;
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      filters: [
        {
          text: "Paid",
          value: "Paid",
        },
        {
          text: "Unpaid",
          value: "Unpaid",
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
      render: (value) => (
        <Tag color="green" className="!text-sm">
          {value}
        </Tag>
      ),
    },

    {
      title: "Tnx Id",
      dataIndex: "tnxId",
      render: (value) => (
        <Tag
          color="magenta"
          className="cursor-pointer !text-sm"
          onClick={() => setShowFormattedTnxId(!showFormattedTnxId)}
          role="button"
        >
          {showFormattedTnxId ? formatString.formatTransactionId(value) : value}
        </Tag>
      ),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      render: (value) => {
        return <Tag color={getTagColor(value)}>{value}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Action",
      render: () => {
        return <Button type="primary">View Details</Button>;
      },
    },
  ];

  return (
    <div className="!space-y-5">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>

        <Flex justify="end" gap={10} align="center" className="h-full w-1/3">
          <Search
            placeholder="Search Earnings..."
            onSearch={(value) => console.log(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />

          <Flex justify="end" gap={14} align="center" className="h-16 w-max">
            <DatePicker
              picker="month"
              placeholder="Filter Month"
              style={{ height: "65%" }}
            />
          </Flex>
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
              <h4 className="text-lg font-bold">$ 1,000</h4>
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
              <h4 className="text-lg font-bold">$ 10,000</h4>
            </Flex>
          </Flex>
        </Col>
      </Row>

      <div className="">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          className="notranslate"
          pagination={{
            pageSize: 15,
          }}
        ></Table>
      </div>
    </div>
  );
}
