import { createSlice } from '@reduxjs/toolkit'

import { setPassword } from 'redux/authentication/(re)setPassword/SetPasswordAction'

const employeeToken = localStorage.getItem('employeeToken')
  ? localStorage.getItem('employeeToken')
  : null

const initialState = {
  loading: false,
  employeeInfo: null,
  employeeToken,
  error: null,
  success: false,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [setPassword.pending]: state => {
      console.log('suntem in pending setPassword')
      state.loading = true
      state.error = null
    },
    [setPassword.fulfilled]: (state, { payload }) => {
      // console.log(payload)
      // console.log(payload.token)
      state.loading = false
      state.employeeInfo = payload
      state.employeeToken = payload.token
    },
    [setPassword.rejected]: (state, { payload }) => {
      console.log(payload)
      state.loading = false
      state.error = payload
    },
  },
})

export const AuthActions = AuthSlice.actions

export default AuthSlice
