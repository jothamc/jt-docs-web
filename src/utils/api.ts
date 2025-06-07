import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/index";
import { LOGIN_PAGE } from "../constants/screens";
import { API_TAGS } from "./constants";
import { redirect } from "next/navigation";


type CustomQueryArgs = string | FetchArgs;

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const baseQuery: BaseQueryFn<
  CustomQueryArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  CustomQueryArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  if (!BASE_URL) throw Error("BACKEND_URL is not available.");
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch({ payload: undefined, type: "auth/logout" });
    redirect(LOGIN_PAGE);
  }
  return result;
};

export const api = createApi({
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: Object.entries(API_TAGS).map(([, value]) => value),
  refetchOnMountOrArgChange: 600, // Refetch after 10 minutes
});
