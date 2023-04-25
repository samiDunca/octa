import { AssessmentActions } from 'redux/assessment/AssessmentSlice'
import { ClientActions } from 'redux/client/ClientActions'
import { OfferActions } from 'redux/offer/OfferSlice'

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
      console.log('sunte in clientActions - DELETE FUNCTION')
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
    }
    try {
      await deleteClient()
    } catch (err) {
      console.log(err)
    }
  }
}
