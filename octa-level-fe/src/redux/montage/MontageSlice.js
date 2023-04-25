import { createSlice, current } from '@reduxjs/toolkit'

const MontageSlice = createSlice({
  name: 'MontageSlice',
  initialState: {
    montages: [],
  },
  reducers: {
    getAllMontages: (state, { payload }) => {
      return {
        ...state,
        montages: payload.montages,
      }
    },
    getMontage: (state, { payload }) => {},
    addMontage: (state, { payload }) => {
      return {
        ...state,
        montages: [...state.montages, payload.newMontage],
      }
    },
    updateMontage: (state, { payload }) => {
      const newArray = state.montages.map(element => {
        if (element.montage._id === payload.updatedMontage._id) {
          return {
            ...element,
            montage: payload.updatedMontage,
          }
        } else {
          return element
        }
      })

      return {
        ...state,
        montages: newArray,
      }
    },
    deleteMontage: (state, { payload }) => {},
  },
})

export const MontageActions = MontageSlice.actions

export default MontageSlice
