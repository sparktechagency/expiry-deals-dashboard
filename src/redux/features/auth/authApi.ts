/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    profile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: builder.query({
      query: (query) => ({
        url: "/users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useProfileQuery,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useGetAllUserQuery,
} = authApi;
