import { createSlice, current } from '@reduxjs/toolkit'

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
    addNewRole: (state, action) => {
      return {
        ...state,
        roles: [...state.roles, action.payload],
      }
    },

    updateRole: (state, action) => {
      const index = state.roles.findIndex(el => el._id === action.payload._id)
      const newArray = [...state.roles]
      console.log(index)
      newArray.splice(index, 1, action.payload)

      return {
        ...state,
        roles: newArray,
      }
    },

    deleteRole: (state, action) => {
      console.log(action.payload)
      const index = state.roles.findIndex(el => el._id === action.payload)
      const newArray = [...state.roles]
      console.log(index)
      newArray.splice(index, 1)
      return {
        ...state,
        roles: newArray,
      }
    },
  },
})

export const RoleActions = RoleSlice.actions

export default RoleSlice
