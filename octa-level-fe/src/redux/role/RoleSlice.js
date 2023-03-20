import { createSlice } from '@reduxjs/toolkit'

const RoleSlice = createSlice({
  name: 'RoleSlice',
  initialState: {
    roles: [],
    currentRole: null,
  },
  reducers: {
    getAllRoles: (state, action) => {
      return {
        ...state,
        roles: action.payload.roles,
      }
    },
  },
})

export const RoleActions = RoleSlice.actions

export default RoleSlice
