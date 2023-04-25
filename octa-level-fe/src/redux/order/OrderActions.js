import { OfferActions } from 'redux/offer/OfferSlice'
import { OrderActions } from 'redux/order/OrderSlice'

export const getAllOrders = () => {
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
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/order`, requestOptions)

      if (!response.ok) {
        throw new Error(response.message)
      }

      const data = await response.json()
      return data
    }

    try {
      const orderData = await fetchData()
      console.log('in getAllOrders actions', orderData.data)

      dispatch(
        OrderActions.getAllOrders({
          orders: orderData.data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewOrder = newOrder => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newOrder),
      redirect: 'follow',
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/order`, requestOptions)
      const { data } = await response.json()

      console.log({ newOrder })
      console.log({ data })
      if (!response.ok) {
        throw new Error(response.message)
      }
      dispatch(OrderActions.addOrder({ newOrder: data }))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateOrder = (values, orderId) => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/order/${orderId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: 'follow',
      })

      if (!response.ok) {
        throw new Error(response.message)
      }

      const { data } = await response.json()
      console.log(data)
      dispatch(OrderActions.updateOrder({ updatedOrder: data, objectName: 'order' }))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteOrder = orderID => {
  return async dispatch => {
    // TO DELETE YOU NEED THE BEARE TOKEN AND TO HAVE THE ADMIN ROLE ASSIGN TO YOU
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    const deleteOrder = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/order/${orderID}`,
        requestOptions,
      )

      if (response.status !== 204) {
        throw new Error('Could not delete employee data!')
      }

      dispatch(OrderActions.deleteOrder(orderID))
    }
    try {
      await deleteOrder()
    } catch (err) {
      console.log(err)
    }
  }
}
