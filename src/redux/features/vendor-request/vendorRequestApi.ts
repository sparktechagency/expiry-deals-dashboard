 
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "@/redux/api/baseApi";
import { IApiResponseWithMeta, IQueryParams } from "@/types";
import { IVendorRequest } from "@/types/vendorRequest.type";

const vendorRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendorRequests: builder.query<IApiResponseWithMeta<IVendorRequest[]>,IQueryParams >
    ({
      query: (params) => ({
        url: "/vendor-request",
        method: "GET",
        params,
      }),

      providesTags: [tagTypes.vendorRequests],
    }),

    approveVendorRequest: builder.mutation({
      query: (requestId) => ({
        url: `/vendor-request/approve/${requestId}`,
        method: "PATCH",
      }),

      invalidatesTags: [tagTypes.vendorRequests],
    }),

    rejectVendorRequest: builder.mutation({
      query: (data) => {
        return {
          url: `/vendor-request/reject/${data.id}`,
          method: "PATCH",
          body: data.payload,
        };
      },

      invalidatesTags: [tagTypes.vendorRequests],
    }),
  }),
});

export const {
  useGetAllVendorRequestsQuery,
  useApproveVendorRequestMutation,
  useRejectVendorRequestMutation,
} = vendorRequestApi;
