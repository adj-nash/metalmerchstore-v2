import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import { createApi } from "@reduxjs/toolkit/query/react";

export const errorApi = createApi({
  reducerPath: "errorAPI",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetch400Error: builder.query<void, void>({
      query: () => ({ url: "Error/not-found" }),
    }),
    fetch401Error: builder.query<void, void>({
      query: () => ({ url: "Error/bad-request" }),
    }),
    fetch404Error: builder.query<void, void>({
      query: () => ({ url: "Error/unauthorized" }),
    }),
    fetchValidationError: builder.query<void, void>({
      query: () => ({ url: "Error/validation-error" }),
    }),
    fetchServerError: builder.query<void, void>({
      query: () => ({ url: "Error/server-error" }),
    }),
  }),
});

export const {
  useLazyFetch400ErrorQuery,
  useLazyFetch401ErrorQuery,
  useLazyFetch404ErrorQuery,
  useLazyFetchValidationErrorQuery,
  useLazyFetchServerErrorQuery,
} = errorApi;
