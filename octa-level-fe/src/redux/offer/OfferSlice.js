import { createSlice, current } from '@reduxjs/toolkit'

const OfferSlice = createSlice({
  name: 'OfferSlice',
  initialState: {
    offers: [],
  },
  reducers: {
    getAllOffers: (state, { payload }) => {
      console.log(payload)
      return {
        ...state,
        offers: payload.offers,
      }
    },
    addNewOffer: (state, { payload }) => {
      return {
        ...state,
        offers: [...state.offers, payload],
      }
    },
    updateOffer: (state, { payload }) => {
      console.log('alo, suntem in updateOffer slice', payload)
      const newArray = state.offers.map(element => {
        if (element.offer._id === payload.updatedOffer._id) {
          return {
            ...element,
            offer: payload.updatedOffer,
          }
        } else {
          return element
        }
      })

      return {
        ...state,
        offers: newArray,
      }
    },
    deleteOffer: (state, { payload }) => {
      console.log('suntem in deleteOffer din offerSlice')
      const index = state.offers.findIndex(el => el.client._id === payload.clientId)
      const newArray = [...state.offers]
      newArray.splice(index, 1)
      return {
        ...state,
        offers: newArray,
      }
    },
  },
})

export const OfferActions = OfferSlice.actions

export default OfferSlice
