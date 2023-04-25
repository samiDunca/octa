import { TeamActions } from 'redux/team/TeamSlice'

export const getAllTeams = () => {
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
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/team`, requestOptions)

      if (!response.ok) {
        throw new Error(response.message)
      }

      const data = await response.json()
      return data
    }

    try {
      const { data } = await fetchData()
      console.log('in getAllTeams actions', data)

      dispatch(
        TeamActions.getAllTeams({
          teams: data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewTeam = newTeam => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newTeam),
      redirect: 'follow',
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/team`, requestOptions)
      const { data } = await response.json()

      console.log({ newTeam })
      console.log({ data })
      if (!response.ok) {
        throw new Error(response.message)
      }
      dispatch(TeamActions.addTeam({ newTeam: data }))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateTeam = (values, teamId) => {
  return async dispatch => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/v1/team/${teamId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: 'follow',
      })

      if (!response.ok) {
        throw new Error(response.message)
      }

      const { data } = await response.json()
      console.log(data)
      dispatch(TeamActions.updateTeam({ updatedTeam: data }))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteTeam = teamId => {
  return async dispatch => {
    // TO DELETE YOU NEED THE BEARE TOKEN AND TO HAVE THE ADMIN ROLE ASSIGN TO YOU
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    const deleteTeam = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/team/${teamId}`,
        requestOptions,
      )

      if (response.status !== 204) {
        throw new Error('Could not delete employee data!')
      }

      dispatch(TeamActions.deleteTeam(teamId))
    }
    try {
      await deleteTeam()
    } catch (err) {
      console.log(err)
    }
  }
}
