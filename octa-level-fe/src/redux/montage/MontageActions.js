import { MontageActions } from 'redux/montage/MontageSlice'
import { OrderActions } from 'redux/order/OrderSlice'

export const getAllMontages = () => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append(
      'Cookie',
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzYwZmVkMjg1NzYyMThlOWFmYWM3NCIsImlhdCI6MTY2ODY4MjIwOSwiZXhwIjoxNjc2NDU4MjA5fQ.dNMKmNJrzqlziJA3SaxkX2kd4uXFxBEg7v5fBLAz8Fs',
    )

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/montage`,
        requestOptions,
      )

      if (!response.ok) {
        throw new Error(response.message)
      }

      const data = await response.json()
      return data
    }

    try {
      const montageData = await fetchData()
      console.log('in getAllMontages actions', montageData.data)

      dispatch(
        MontageActions.getAllMontages({
          montages: montageData.data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewMontage = ({ newMontage }) => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newMontage),
      redirect: 'follow',
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/montage`,
        requestOptions,
      )
      const { data } = await response.json()

      if (response.status === 201) {
        dispatch(MontageActions.addMontage({ newMontage: data }))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateMontage = (values, montageId) => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/montage/${montageId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: 'follow',
      })

      if (!response.ok) {
        throw new Error(response.message)
      }

      const { data } = await response.json()
      dispatch(MontageActions.updateMontage({ updatedMontage: data.data }))
      dispatch(OrderActions.updateOrder({ updatedMontage: data.data, objectName: 'montage' }))
    } catch (err) {
      console.log(err)
    }
  }
}
