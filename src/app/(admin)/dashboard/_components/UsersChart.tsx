"use client";

import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { IDashboardData } from "@/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const UsersChart = ({ data }: { data: IDashboardData["monthlyUsers"] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 xl:w-1/2">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-bold">Users Overview</h1>

        <div className="flex items-center justify-end gap-x-3">
          <Select
            value={searchParams?.get("role") || "user"}
            style={{
              width: 120,
              marginLeft: "5px",
            }}
            onChange={(value) => updateSearchParam("role", value)}
            options={[
              { value: "user", label: "User" },
              { value: "vendor", label: "Vendor" },
            ]}
          />

          <DatePicker
            onChange={(_, dateString) =>
              updateSearchParam(
                "JoinYear",
                dayjs(dateString as string).format("YYYY"),
              )
            }
            picker="year"
            defaultValue={dayjs()}
            className="!border-none !py-1.5 !text-white"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            formatter={(value) => [`Monthly Users Joined: ${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={22}
            radius={0}
            background={false}
            dataKey="total"
            fill="var(--primary)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersChart;
