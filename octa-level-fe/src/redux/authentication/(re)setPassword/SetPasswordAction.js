import { createAsyncThunk } from '@reduxjs/toolkit'

export const setPassword = createAsyncThunk(
  'auth/register',
  async ({ password, passwordConfirm, token }, { rejectWithValue }) => {
    try {
      console.log({ password })
      console.log({ passwordConfirm })
      console.log({ token })
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        password,
        passwordConfirm,
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

      console.log(response)
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      let data = await response.json()
      localStorage.setItem('userToken', data.token)
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
