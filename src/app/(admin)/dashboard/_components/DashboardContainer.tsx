"use client";

import EarningChart from "./EarningChart";
import RecentUserTable from "./RecentUserTable";
import UsersChart from "./UsersChart";
import { Icon } from "@iconify/react";
import { Flex } from "antd";

// Dummy data
const userStats = [
  {
    key: "users",
    label: "Total Users",
    value: 189,
    icon: "clarity:users-line",
  },
  {
    key: "vendor",
    label: "Total Vendors",
    value: 145,
    icon: "iconoir:shop",
  },
  {
    key: "revenue",
    label: "Total Revenue",
    value: "$4000",
    icon: "lucide:hand-coins",
  },
  {
    key: "products",
    label: "Total Products Listed",
    value: 200,
    icon: "majesticons:box-line",
  },
];

export default function DashboardContainer() {
  return (
    <div className="space-y-10">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {userStats?.map((stat) => (
          <Flex
            key={stat.key}
            align="center"
            justify="start"
            gap={16}
            className="rounded-xl bg-white !p-5"
          >
            <div className="flex-center bg-primary border-red aspect-square size-20 rounded-full text-white">
              <Icon icon={stat.icon} height={42} width={42} />
            </div>

            <div className="space-y-2">
              <p className="text-base font-medium text-[#33363F]">
                {stat.label}
              </p>

              <h2 className="!mt-1 text-3xl font-bold">{stat.value}</h2>
            </div>
          </Flex>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between flex-col gap-10 xl:flex-row">
        <UsersChart />
        <EarningChart />
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentUserTable />
      </section>
    </div>
  );
}
