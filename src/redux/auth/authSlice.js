import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    currentUser: null,
    loading: false,
    error: false,
  },
  register: {
    loading: false,
    success: false,
    error: false,
  },
  logout: {
    loading: false,
    success: false,
    error: false,
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.loading = true
    },
    loginSuccess: (state, action) => {
      state.login.loading = false
      state.login.currentUser = action.payload
      state.login.error = false
    },
    loginFailed: (state, action) => {
      state.login.loading = false
      state.login.currentUser = null
      state.login.error = true
    },
    registerStart: (state) => {
      state.register.loading = true
    },
    registerSuccess: (state, action) => {
      state.register.loading = false
      state.register.success = true
    },
    registerFailed: (state, action) => {
      state.register.loading = false
      state.register.success = false
      state.register.error = action.payload
    },
    logoutSuccess: (state) => {
      state.logout.loading = false
      state.login.currentUser = null
      state.logout.success = true
      state.logout.error = false
    },
    logoutFailed: (state, action) => {
      state.logout.loading = false
      state.logout.success = false
      state.logout.error = false
    },
    logoutStart: (state) => {
      state.logout.loading = true
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutFailed,
  logoutSuccess
} = authSlice.actions

export default authSlice.reducer