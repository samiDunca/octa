import { RoleActions } from 'redux/role/RoleSlice'

export const getAllRoles = () => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }

      const apiResponse = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/role`, {
        method: 'GET',
        headers: requestOptions,
        redirect: 'follow',
      })

      const serializedApiResponse = await apiResponse.json()

      await dispatch(
        RoleActions.getAllRoles({
          roles: serializedApiResponse.data.documents,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}
