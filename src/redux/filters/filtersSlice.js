import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: ''
};

const filtersSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateValueSearch: (state, action) => {
      state.q = action.payload;
    },
  },
});

export const { updateValue } = filtersSlice.actions;

export default filtersSlice.reducer;
