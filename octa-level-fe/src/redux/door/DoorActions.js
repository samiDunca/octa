import { ConsoleSqlOutlined } from '@ant-design/icons'
import { DoorActions } from 'redux/door/DoorSlice'

export const getAllDoors = () => {
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
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/door`, requestOptions)

      if (!response.ok) {
        throw new Error(response.message)
      }

      const data = await response.json()
      return data
    }

    try {
      const { data } = await fetchData()
      dispatch(
        DoorActions.getAllDoors({
          doors: data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewDoor = ({ newDoor }) => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newDoor),
      redirect: 'follow',
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/door`, requestOptions)
      const { data } = await response.json()

      if (response.status === 201) {
        dispatch(DoorActions.addDoor({ newDoor: data }))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateDoor = (values, doorId) => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/door/${doorId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: 'follow',
      })

      if (!response.ok) {
        throw new Error(response.message)
      }

      const { data } = await response.json()
      console.log({ data }, 'line 85')
      dispatch(DoorActions.updateDoor({ updatedDoor: data }))
      // dispatch(OrderActions.updateOrder({ updatedMontage: data.data, objectName: 'montage' }))
    } catch (err) {
      console.log(err)
    }
  }
}
