import { createSlice } from "@reduxjs/toolkit";
import { notifyError, notifySuccess } from "../../components/toast/Toast";

const items =
  localStorage.getItem("cartItems") === null
    ? { items: [], subTotal: 0, totalProduct: 0, totalPrice: 0 }
    : JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
  values: {
    items: items.items,
    subTotal: items.subTotal,
    totalProduct: items.totalProduct,
    totalPrice: items.totalPrice,
  },
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const newCart = action.payload;
      state.values.items = newCart;
      state.values.subTotal = subTotal(state.values.items);
      state.values.totalProduct = totalProduct(state.values.items);
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = findItem(state.values.items, newItem);
      if (duplicate.length > 0) {
        state.values.items = delItem(state.values.items, newItem);
        state.values.items = [
          ...state.values.items,
          {
            ...newItem,
            productId: duplicate[0].productId,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
        state.values.subTotal = subTotal(state.values.items);
        state.values.totalProduct = totalProduct(state.values.items);
        state.values.totalPrice = subTotal(state.values.items);
      } else {
        state.values.items = [...state.values.items, newItem];
        state.values.subTotal = subTotal(state.values.items);
        state.values.totalProduct = totalProduct(state.values.items);
        state.values.totalPrice = subTotal(state.values.items);
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          items: sortItems(state.values.items),
          subTotal: state.values.subTotal,
          totalProduct: state.values.totalProduct,
          totalPrice: state.values.totalPrice,
        })
      );
    },
    updateItem: (state, action) => {
      const itemUpdate = action.payload;
      const item = findItem(state.values.items, itemUpdate);

      if (item.length > 0) {
        state.values.items = delItem(state.values.items, itemUpdate);
        state.values.items = [
          ...state.values.items,
          {
            ...itemUpdate,
            productId: item[0].productId,
          },
        ];
        state.values.subTotal = subTotal(state.values.items);
        state.values.totalProduct = totalProduct(state.values.items);
        state.values.totalPrice = subTotal(state.values.items);
        localStorage.setItem(
          "cartItems",
          JSON.stringify({
            items: sortItems(state.values.items),
            subTotal: state.values.subTotal,
            totalProduct: state.values.totalProduct,
            totalPrice: state.values.totalPrice,
          })
        );
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.values.items = delItem(state.values.items, item);
      state.values.subTotal = subTotal(state.values.items);
      state.values.totalProduct = totalProduct(state.values.items);
      state.values.totalPrice = subTotal(state.values.items);
      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          items: sortItems(state.values.items),
          subTotal: state.values.subTotal,
          totalProduct: state.values.totalProduct,
          totalPrice: state.values.totalPrice,
        })
      );
      notifySuccess("Đã xóa sản phẩm");
    },
    freeShip: (state) => {
      state.values.totalPrice = subTotal(state.values.items);
      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          items: sortItems(state.values.items),
          subTotal: state.values.subTotal,
          totalProduct: state.values.totalProduct,
          totalPrice: state.values.totalPrice,
        })
      );
    },
    fastShip: (state, action) => {
      state.values.totalPrice =
        subTotal(state.values.items) + Number(action.payload);
      console.log(state.values);
      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          items: sortItems(state.values.items),
          subTotal: state.values.subTotal,
          totalProduct: state.values.totalProduct,
          totalPrice: state.values.totalPrice,
        })
      );
    },
  },
});

const findItem = (arr, item) =>
  arr.filter((e) => e.productId === item.productId);
const delItem = (arr, item) =>
  arr.filter((e) => e.productId !== item.productId);
const sortItems = (arr) =>
  arr.sort((a, b) =>
    a.productId > b.productId ? 1 : a.productId < b.productId ? -1 : 0
  );
const subTotal = (arr) =>
  arr.reduce((total, item) => total + Number(item.quantity) * item.price, 0);
const totalProduct = (arr) =>
  arr.reduce((total, item) => total + Number(item.quantity), 0);
export const {
  addItem,
  updateItem,
  removeItem,
  updateCart,
  freeShip,
  fastShip,
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
