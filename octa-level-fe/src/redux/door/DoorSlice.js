import { createSlice, current } from '@reduxjs/toolkit'

const DoorSlice = createSlice({
  name: 'DoorSlice',
  initialState: {
    doors: [],
  },
  reducers: {
    getAllDoors: (state, { payload }) => {
      return {
        ...state,
        doors: payload.doors,
      }
    },
    getDoor: (state, { payload }) => {},
    addDoor: (state, { payload }) => {
      return {
        ...state,
        doors: [...state.doors, payload.newDoor],
      }
    },
    updateDoor: (state, { payload }) => {
      // console.log(payload)
      const newArray = state.doors.map(element => {
        if (element.door._id === payload.updatedDoor._id) {
          return {
            ...element,
            door: payload.updatedDoor,
          }
        } else {
          return element
        }
      })

      return {
        ...state,
        doors: newArray,
      }
    },
    deleteDoor: (state, { payload }) => {},
  },
})

export const DoorActions = DoorSlice.actions

export default DoorSlice
