"use client";

import EarningChart from "./EarningChart";
import RecentUserTable from "./RecentUserTable";
import UsersChart from "./UsersChart";
import { Icon } from "@iconify/react";
import { Flex } from "antd";
import { useSearchParams } from "next/navigation";
import { useGetDashboardDataQuery } from "@/redux/features/earnings/earningsApi";
import formatCurrency from "@/utils/formatCurrency";
export interface DashboardDataQueryParams {
  incomeYear?: string;
  JoinYear?: string;
  role?: string;
}

export default function DashboardContainer() {
  const searchParams = useSearchParams();

  const query: DashboardDataQueryParams = {};
  const incomeYear = searchParams?.get("incomeYear") || "";
  const joinYear = searchParams?.get("JoinYear") || "";
  const role = searchParams?.get("role") || "user";

  query.incomeYear = incomeYear;
  query.JoinYear = joinYear;
  query.role = role;

  const { data: dashboardDataRes, isLoading } = useGetDashboardDataQuery(query);
  const dashboardData = dashboardDataRes?.data;
  console.log({ dashboardData });

  const userStats = [
    {
      key: "users",
      label: "Total Users",
      value: isLoading ? "--" : dashboardData?.totalUsers || "--",
      icon: "clarity:users-line",
    },
    {
      key: "vendor",
      label: "Total Vendors",
      value: isLoading ? "--" : dashboardData?.totalVendor || "--",
      icon: "iconoir:shop",
    },
    {
      key: "revenue",
      label: "Total Revenue",
      value: isLoading
        ? "--"
        : formatCurrency(Number(dashboardData?.totalIncome)) || "--",
      icon: "lucide:hand-coins",
    },
    {
      key: "products",
      label: "Total Products Listed",
      value: isLoading ? "--" : dashboardData?.totalProducts || "--",
      icon: "majesticons:box-line",
    },
  ];

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
      <section className="flex-center-between flex-col gap-5 xl:flex-row">
        {dashboardData?.monthlyUsers && (
          <UsersChart data={dashboardData?.monthlyUsers} />
        )}
        {dashboardData?.monthlyIncome && (
          <EarningChart data={dashboardData?.monthlyIncome} />
        )}
      </section>

      {/* Recent Users Table */}
      <section>
        {dashboardData?.userDetails && (
          <RecentUserTable data={dashboardData?.userDetails} />
        )}
      </section>
    </div>
  );
}
