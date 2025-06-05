import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "@/redux/api/baseApi";

const URL_PREFIX = "/contents";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsData: builder.query({
      query: (query) => ({
        url: URL_PREFIX,
        method: "GET",
        params: query,
      }),
      transformResponse: (res) => res.data,

      providesTags: [tagTypes.settings],
    }),

    updateSettingsData: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.settings],
    }),
  }),

  overrideExisting: true,
});

export const { useGetSettingsDataQuery, useUpdateSettingsDataMutation } =
  contentApi;
