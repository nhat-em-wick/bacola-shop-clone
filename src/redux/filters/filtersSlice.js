import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {_page: 1, _limit: 12 , cate: [], q: ""}
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.values = {
        ...state.values,
        ...action.payload,
      };
    },
    clearFilters: (state, action) => {
      state.values = action.payload
    }
  },
});

export const { updateFilters, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
