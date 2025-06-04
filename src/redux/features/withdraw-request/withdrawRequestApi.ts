import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../../api/baseApi";
import { IWithdrawRequest } from "@/types/withdrawRequest.type";
import { IApiResponseWithMeta, IQueryParams } from "@/types";

const withdrawRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWithdrawRequests: builder.query<IApiResponseWithMeta<IWithdrawRequest[]>, IQueryParams>({
      query: (params) => ({
        url: "/withdraw-request",
        params,
      }),
      providesTags: [tagTypes.withdrawRequests],
    }),

    approveWithdrawRequest: builder.mutation({
      query: (id) => ({
        url: `/withdraw-request/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.withdrawRequests],
    }),

    rejectWithdrawRequest: builder.mutation({
      query: (data) => ({
        url: `/withdraw-request/reject/${data.id}`,
        method: "PATCH",
        body: data.payload
      }),
      invalidatesTags: [tagTypes.withdrawRequests],
    }),
  }),
});

export const {
  useGetAllWithdrawRequestsQuery,
  useApproveWithdrawRequestMutation,
  useRejectWithdrawRequestMutation,
} = withdrawRequestApi;
