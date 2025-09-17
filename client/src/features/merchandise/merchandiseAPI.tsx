import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import { ProductParams } from "../../app/models/productParams";
import { filterEmptyValues } from "../../lib/util";
import { Pagination } from "../../app/models/pagination";

export const merchandiseApi = createApi({
  reducerPath: "merchandiseApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<{items: Product[], pagination: Pagination}, ProductParams>({
      query: (productParams) => {
        return {
          url: "products",
          params: filterEmptyValues(productParams),
        };
      },
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response?.headers.get("Pagination");
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return {items, pagination}

      }
    }),
    fetchProduct: builder.query<Product, number>({
      query: (id) => `Products/${id}`,
    }),
    fetchFilter: builder.query<
      { category: string[]; band: string[]; genre: string[] },
      void
    >({ query: () => "products/filters" }),

    fetchNew: builder.query<Product[], void>({
      query: () => `Products/New`,
    }),
    fetchBest: builder.query<Product[], void>({
      query: () => `Products/Best`,
    }),
    fetchSoon: builder.query<Product[], void>({
      query: () => `Products/Soon`,
    }),
  }),

});

export const {
  useFetchAllProductsQuery,
  useFetchProductQuery,
  useFetchFilterQuery,
  useFetchNewQuery,
  useFetchBestQuery,
  useFetchSoonQuery
} = merchandiseApi;
