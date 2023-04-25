import { createSlice, current } from '@reduxjs/toolkit'

const OrderSlice = createSlice({
  name: 'OrderSlice',
  initialState: {
    orders: [],
  },
  reducers: {
    getAllOrders: (state, { payload }) => {
      return {
        ...state,
        orders: payload.orders,
      }
    },
    getOrder: (state, { payload }) => {},
    addOrder: (state, { payload }) => {
      console.log(payload.newOrder)
      return {
        ...state,
        orders: [...state.orders, payload.newOrder],
      }
    },
    updateOrder: (state, { payload }) => {
      console.log(current(state).orders)
      const newArray = state.orders.map(element => {
        if (payload.objectName === 'order') {
          if (element.order._id === payload.updatedOrder._id) {
            return {
              ...element,
              order: payload.updatedOrder,
            }
          } else {
            return element
          }
        } else {
          console.log(payload.updatedMontage._id)
          if (element.montage._id === payload.updatedMontage._id) {
            return {
              ...element,
              montage: payload.updatedMontage,
            }
          } else {
            return element
          }
        }
      })

      return {
        ...state,
        orders: newArray,
      }
    },
    deleteOrder: (state, { payload }) => {
      const index = state.orders.findIndex(el => el.order._id === payload.orderID)
      const newArray = [...state.orders]
      newArray.splice(index, 1)
      return {
        ...state,
        orders: newArray,
      }
    },
  },
})

export const OrderActions = OrderSlice.actions

export default OrderSlice
