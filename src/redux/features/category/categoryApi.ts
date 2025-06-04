/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../../api/baseApi";
import { IApiResponseWithMeta, ICategory, IQueryParams } from "@/types";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      IApiResponseWithMeta<ICategory[]>,
      IQueryParams
    >({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.categories],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    editCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/${data.id}`,
        method: "PATCH",
        body: data.payload,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useEditCategoryMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
