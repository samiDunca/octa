import { createSlice, current } from '@reduxjs/toolkit'

const ClientSlice = createSlice({
  name: 'ClientSlice',
  initialState: {
    clients: [],
  },
  reducers: {
    getAllClients: (state, { payload }) => {},
    addNewClient: (state, { payload }) => {},
    updateClient: (state, { payload }) => {},
    deleteClient: (state, { payload }) => {},
  },
})

export const ClientActions = ClientSlice.actions

export default ClientSlice
