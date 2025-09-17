import { createSlice } from "@reduxjs/toolkit/react";
import { ProductParams } from "../../app/models/productParams";

const initialState: ProductParams = {
  orderBy: "name",
  searchBy: "",
  category: [],
  genre: [],
  pageNumber: 1,
  pageSize: 8,
};

export const merchandiseSlice = createSlice({
  name: "merchandise",
  initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
      state.pageNumber = 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.pageNumber = 1;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
      state.pageNumber = 1;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const {
  setOrderBy,
  setSearchBy,
  setCategory,
  setGenre,
  setPageNumber,
  setPageSize,
  resetParams,
} = merchandiseSlice.actions;
