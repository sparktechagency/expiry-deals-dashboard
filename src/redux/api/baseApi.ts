/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { tagTypesList } from "../tagTypes";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";
import { envConfig } from "@/config/envConfig";
import { getFromSessionStorage } from "@/utils/sessionStorage";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.backendBaseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const forgotPassToken = getFromSessionStorage("forgotPassToken");
    const changePassToken = getFromSessionStorage("changePassToken");
    const otpToken = getFromSessionStorage("token");
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (otpToken) {
      headers.set("token", otpToken);
    }
    if (forgotPassToken) {
      headers.set("token", forgotPassToken);
    }
    if (changePassToken) {
      headers.set("token", changePassToken);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 404) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 403) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    const res = await fetch(`${envConfig.backendBaseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
