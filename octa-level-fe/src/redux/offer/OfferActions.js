import { OfferActions } from 'redux/offer/OfferSlice'

export const getAllOffers = () => {
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
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/offer`, requestOptions)

      if (!response.ok) {
        throw new Error('Could not fetch offers data!')
      }

      const data = await response.json()
      return data
    }

    try {
      const offerData = await fetchData()
      console.log('in getAllOffers actions', offerData.data)

      dispatch(
        OfferActions.getAllOffers({
          offers: offerData.data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewOffer = (newOffer, clientId) => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('clientid', clientId)
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newOffer),
      redirect: 'follow',
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/offer`, requestOptions)
      const data = await response.json()

      if (response.status === 201) {
        dispatch(OfferActions.addNewOffer(data.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const getOneOffer = ID => {
  return async dispatch => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    const fetchOffer = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/offer/${ID}`,
        requestOptions,
      )

      if (!response.ok) {
        throw new Error(response.message)
      }
      const data = await response.blob()
      return data
    }

    try {
      const oneOffer = await fetchOffer()
      const url = URL.createObjectURL(new Blob([oneOffer], { type: 'application/pdf' }))

      return url
      // dispatch(AssessmentActions.storeOneAssessment(oneAssessment.data.data))
      // return oneAssessment.data.data
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateOffer = (values, offerId) => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/offer/${offerId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: 'follow',
      })
      console.log(values, offerId)
      if (!response.ok) {
        throw new Error(response.message)
      }

      const updatedOffer = await response.json()
      console.log(updatedOffer)
      dispatch(OfferActions.updateOffer({ updatedOffer: updatedOffer.data }))
    } catch (err) {
      console.log(err)
    }
  }
}
