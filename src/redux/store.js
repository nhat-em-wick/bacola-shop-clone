import { configureStore, combineReducers } from "@reduxjs/toolkit";

import productModalSlice from "./modal-product/productModalSlice";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";
import authSlice from "./auth/authSlice";
import filtersSlice from "./filters/filtersSlice";
import methodBuySlice from "./shopping-cart/methodBuySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['productModal', ],
  whitelist: ['auth', 'filters', 'method', 'cartItems']
}

const rootReducer = combineReducers({
  auth: authSlice,
  productModal: productModalSlice,
  cartItems: cartItemsSlice,
  filters: filtersSlice,
  method: methodBuySlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export let persistor = persistStore(store)