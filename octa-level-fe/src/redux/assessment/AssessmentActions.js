import { AssessmentActions } from 'redux/assessment/AssessmentSlice'
import { updateRole } from 'redux/role/RoleActions'

export const getAllAssessments = () => {
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
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/assessment`,
        requestOptions,
      )

      if (!response.ok) {
        throw new Error('Could not fetch assessments data!')
      }

      const data = await response.json()
      return data
    }

    try {
      const assessmentData = await fetchData()

      dispatch(
        AssessmentActions.getAllAssessments({
          assessments: assessmentData.data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewAssessment = newAssessment => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(newAssessment)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/assessment`,
        requestOptions,
      )
      const data = await response.json()
      if (response.status === 201) {
        dispatch(AssessmentActions.addNewAssessment(data.data))
      } else {
        throw new Error('Could not create new assessment!')
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const getOneAssessment = ID => {
  return async dispatch => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    const fetchAssessment = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/assessment/${ID}`,
        requestOptions,
      )

      if (!response.ok) {
        throw new Error('Could not fetch assessment data!')
      }

      const data = await response.json()

      return data
    }

    try {
      const oneAssessment = await fetchAssessment()
      dispatch(AssessmentActions.storeOneAssessment(oneAssessment.data.data))
      return oneAssessment.data.data
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateAssessment = (values, assessmentId, clientId) => {
  return async dispatch => {
    try {
      // console.log({ assessmentId })
      // console.log({ clientId })
      var myHeaders = new Headers()
      myHeaders.append('idClient', clientId)
      myHeaders.append('Content-Type', 'application/json')

      const updateAssessment = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/assessment/${assessmentId}`,
        {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify(values),
          redirect: 'follow',
        },
      )

      const response = await updateAssessment.json()
      console.log(response)
      // dispatch(AssessmentActions.updateAssessment(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}
