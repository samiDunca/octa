import { createSlice, current } from '@reduxjs/toolkit'

const ClientSlice = createSlice({
  name: 'ClientSlice',
  initialState: {
    clients: [],
  },
  reducers: {
    getAllClients: (state, { payload }) => {
      return {
        ...state,
        clients: payload.clients,
      }
    },
    addNewClient: (state, { payload }) => {},
    updateClient: (state, { payload }) => {
      const newArray = state.clients.map(element => {
        if (element.client._id === payload.updatedClient._id) {
          return {
            ...element,
            client: payload.updatedClient,
          }
        } else {
          return element
        }
      })
      return {
        ...state,
        clients: newArray,
      }
    },
    deleteClient: (state, { payload }) => {
      const index = state.clients.findIndex(el => el.client._id === payload.clientId)
      const newArray = [...state.clients]
      newArray.splice(index, 1)
      return {
        ...state,
        clients: newArray,
      }
    },
  },
})

export const ClientActions = ClientSlice.actions

export default ClientSlice
