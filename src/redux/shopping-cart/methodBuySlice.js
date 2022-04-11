import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipping: 1,
  payment: 1
}

export const methodBuySlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    shipping: (state, action) => {
      state.shipping = action.payload
    },
    payment: (state, action) => {
      state.payment = action.payload
    }
  }
})

export const {shipping, payment} = methodBuySlice.actions
export default methodBuySlice.reducer;