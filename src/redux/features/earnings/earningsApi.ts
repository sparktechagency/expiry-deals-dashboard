/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "@/redux/api/baseApi";
import { IDashboardData, IEarnings, IQueryParams } from "@/types";
import { DashboardDataQueryParams } from "@/app/(admin)/dashboard/_components/DashboardContainer";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query<{ data: IEarnings }, IQueryParams>({
      query: (params) => ({
        url: "/payments/earnings",
        method: "GET",
        params,
      }),

      providesTags: [tagTypes.earnings],
    }),

    getDashboardData: builder.query<
      { data: IDashboardData },
      DashboardDataQueryParams
    >({
      query: (params) => ({
        url: "/payments/dashboard-data",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.dashboardData],
    }),
  }),
});

export const { useGetAllEarningsQuery, useGetDashboardDataQuery } = earningsApi;
