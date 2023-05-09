import { AssessmentActions } from 'redux/assessment/AssessmentSlice'
import { ClientActions } from 'redux/client/ClientSlice'
import { OfferActions } from 'redux/offer/OfferSlice'

export const getAllClients = () => {
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
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/client`, requestOptions)

      if (!response.ok) {
        throw new Error(response.message)
      }

      const data = await response.json()
      return data
    }

    try {
      const clientData = await fetchData()
      console.log('in getAllClients actions', clientData.clients)

      dispatch(
        ClientActions.getAllClients({
          clients: clientData.clients,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateClient = (values, clientId) => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/client/${clientId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: 'follow',
      })

      if (!response.ok) {
        throw new Error(response.message)
      }

      const { data } = await response.json()
      dispatch(ClientActions.updateClient({ updatedClient: data.data }))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteClient = clientId => {
  return async dispatch => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    const deleteClient = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/client/${clientId}`,
        requestOptions,
      )

      if (response.status !== 204) {
        throw new Error(response.message)
      }

      // dispatch(clientActions) in the future
      console.log('suntem in clientActions - DELETE FUNCTION')
      dispatch(
        OfferActions.deleteOffer({
          clientId,
        }),
      )
      dispatch(
        AssessmentActions.deleteAssessment({
          clientId,
        }),
      )

      dispatch(
        ClientActions.deleteClient({
          clientId,
        }),
      )
      return 'success'
    }
    try {
      const response = await deleteClient()
      return response
    } catch (err) {
      console.log(err)
      return 'error'
    }
  }
}
