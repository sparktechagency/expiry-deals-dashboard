"use client";
import { IDashboardData } from "@/types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const EarningChart = ({ data }: { data: IDashboardData["monthlyIncome"] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="w-full rounded-xl bg-white p-6 xl:w-1/2">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Earnings Overview</h1>

        <div className="flex-center-start gap-x-4">
          <DatePicker
            onChange={(_, dateString) =>
              updateSearchParam(
                "incomeYear",
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="var(--primary)" stopOpacity={1} />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            dataKey="month"
          />

          <YAxis tickMargin={20} axisLine={false} tickLine={false} />

          <CartesianGrid
            opacity={0.19}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Tooltip
            formatter={(value) => [`Monthly Earning: $${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "var(--primary)" }}
          />

          <Area
            activeDot={{ fill: "var(--primary)" }}
            type="monotone"
            dataKey="income"
            strokeWidth={0}
            stroke="var(--primary)"
            fill="url(#color)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;
