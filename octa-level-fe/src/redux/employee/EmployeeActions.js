import { EmployeeActions } from 'redux/employee/EmployeeSlice'

export const getAllEmployees = () => {
  return async dispatch => {
    var myHeaders = new Headers()
    const userToken = localStorage.getItem('userToken')
    myHeaders.append('Authorization', `Bearer ${userToken}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee`,
        requestOptions,
      )

      if (!response.ok) {
        throw new Error('Could not fetch employee data!')
      }

      const data = await response.json()
      return data.data.documents
    }

    try {
      const employeeData = await fetchData()

      dispatch(EmployeeActions.getAllEmployees(employeeData))
      return { employees: employeeData }
    } catch (err) {
      return 'error'
      console.log(err)
    }
  }
}

export const addNewEmployee = newEmployee => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newEmployee),
      redirect: 'follow',
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee`,
        requestOptions,
      )
      const data = await response.json()

      if (response.status === 201) {
        console.log(data.data.data)
        dispatch(EmployeeActions.addNewEmployee(data.data.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateEmployeeById = (newEmployee, employeeID) => {
  return async dispatch => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(newEmployee),
      redirect: 'follow',
    }

    const updateEmployee = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee/${employeeID}`,
        requestOptions,
      )

      // TESTEAZĂ CU EROARE
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()

      return data.data.data
    }

    try {
      const updatedEmployee = await updateEmployee()
      console.log(updatedEmployee)
      dispatch(EmployeeActions.updateEmployee(updatedEmployee))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteEmployeeById = employeeID => {
  return async dispatch => {
    // TO DELETE YOU NEED THE BEARE TOKEN AND TO HAVE THE ADMIN ROLE ASSIGN TO YOU
    var myHeaders = new Headers()
    myHeaders.append(
      'Cookie',
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmU5MTY4ZDgxOWU4N2M0ZjQ3NjA3ZSIsImlhdCI6MTY4MTEzNzk4NSwiZXhwIjoxNjg4OTEzOTg1fQ.9OaGExITX8tZb6FJ0NBEzVnjn1m66vwLgELqusEQy1E',
    )
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: myHeaders,
    }

    const deleteEmployee = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/v1/employee/${employeeID}`,
        requestOptions,
      )

      if (response.status !== 204) {
        throw new Error('Could not delete employee data!')
      }

      dispatch(EmployeeActions.deleteEmployee(employeeID))
    }
    try {
      await deleteEmployee()
    } catch (err) {
      console.log(err)
    }
  }
}
