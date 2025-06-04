/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../../api/baseApi";
import { IApiResponseWithMeta, IUser, IQueryParams, IMyProfile } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IApiResponseWithMeta<IUser[]>, IQueryParams>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),

    toggleUserStatus: builder.mutation({
      query: (userId) => ({
        url: `/users/toggle-status/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.users],
    }),

    getProfile: builder.query<{ data: IMyProfile }, void>({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
  useGetProfileQuery,
  useUpdateMyProfileMutation,
} = userApi;
