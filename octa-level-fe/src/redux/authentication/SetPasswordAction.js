import { createAsyncThunk } from '@reduxjs/toolkit'

export const setPassword = createAsyncThunk(
  'auth/register',
  async ({ password, token, navigate }, { rejectWithValue }) => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      var raw = JSON.stringify({
        password,
        passwordConfirm: password,
      })

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee/resetPassword/${token}`,
        requestOptions,
      )

      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      let data = await response.json()
      localStorage.setItem('userToken', data.token)
      navigate('/')

      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        if (typeof error === 'string') {
          return rejectWithValue(error)
        }
        return rejectWithValue(error.message)
      }
    }
  },
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ email }),
        redirect: 'follow',
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee/forgotPassword`,
        requestOptions,
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        if (typeof error === 'string') {
          return rejectWithValue(error)
        }
        return rejectWithValue(error.message)
      }
    }
  },
)
