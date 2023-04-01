import { createSlice } from '@reduxjs/toolkit'

const EmployeeSlice = createSlice({
  name: 'EmployeeSlice',
  initialState: {
    employees: [],
  },
  reducers: {
    getAllEmployees: (state, action) => {
      return { ...state, employees: action.payload }
    },
    addNewEmployee: (state, action) => {
      return {
        ...state,
        employees: [...state.employees, action.payload],
      }
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(el => el._id === action.payload._id)
      const newArray = [...state.employees]
      newArray.splice(index, 1, action.payload)

      return {
        ...state,
        employees: newArray,
      }
    },
    deleteEmployee: (state, action) => {
      const index = state.employees.findIndex(el => el._id === action.payload)
      const newArray = [...state.employees]
      newArray.splice(index, 1)
      return {
        ...state,
        employees: newArray,
      }
    },
  },
})

export const EmployeeActions = EmployeeSlice.actions

export default EmployeeSlice
