import { createSlice } from '@reduxjs/toolkit'

import { forgotPassword, setPassword } from 'redux/authentication/SetPasswordAction'
import { userLogin } from 'redux/authentication/LoginActions'

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  message: null,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: state => {
      console.log('suntem in userLogin PENDING')
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      console.log('suntem in userLogin FULFULLED')
      console.log(payload)
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.token
    },
    [userLogin.rejected]: (state, { payload }) => {
      console.log('suntem in userLogin REJECTED')
      console.log(payload)
      state.loading = false
      state.error = payload
    },

    // set password reducer
    [setPassword.pending]: state => {
      console.log('suntem in pending setPassword')
      state.loading = true
      state.error = null
    },
    [setPassword.fulfilled]: (state, { payload }) => {
      console.log('suntem in fulfilled setPassword')
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.token
    },
    [setPassword.rejected]: (state, { payload }) => {
      console.log('suntem in reject setPassword')
      state.loading = false
      state.error = payload
    },

    // forgot password reducer
    [forgotPassword.pending]: state => {
      console.log('suntem in pending forgotPassword')
      state.loading = true
      state.error = null
      state.message = null
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      console.log('suntem in fulfilled forgotPassword')
      console.log(payload)
      state.loading = false
      state.error = null
      state.message = payload.message
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      console.log(payload)
      console.log('suntem in reject forgotPassword')
      state.loading = false
      state.error = payload
      state.message = null
    },
  },
})

export const AuthActions = AuthSlice.actions

export default AuthSlice
