import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ enteredEmail, enteredPassword, navigate }, { rejectWithValue }) => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee/login`,
        requestOptions,
      )

      let data = await response.json()

      if (!response.ok) {
        console.log('data.json(): ', data)
        throw new Error(data.message)
      }

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
