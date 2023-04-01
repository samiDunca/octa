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

export const addNewRole = newRole => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(newRole)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/role`, requestOptions)
      const data = await response.json()

      if (response.status === 201) {
        dispatch(RoleActions.addNewRole(data.data.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateRoleById = (newRole, roleID) => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(newRole),
      redirect: 'follow',
    }

    const updateRole = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/role/${roleID}`,
        requestOptions,
      )
      console.log({ response })
      if (!response.ok) {
        throw new Error(response.message)
      }
      const data = await response.json()

      console.log({ data })
      return data.data.data
    }
    try {
      const updatedRole = await updateRole()
      dispatch(RoleActions.updateRole(updatedRole))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteRoleById = roleID => {
  return async dispatch => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    const deleteRole = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/role/${roleID}`,
        requestOptions,
      )

      if (response.status !== 204) {
        throw new Error('Could not delete role data!')
      }

      dispatch(RoleActions.deleteRole(roleID))
    }

    try {
      await deleteRole()
    } catch (err) {
      console.log(err)
    }
  }
}
