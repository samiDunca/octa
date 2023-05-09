import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getAllEmployees } from 'redux/employee/EmployeeActions'
import { getAllAssessments } from 'redux/assessment/AssessmentActions'
import { AuthActions } from 'redux/authentication/AuthSlice'

import './App.css'
import Assessments from './components/assessments/Assessments'
import Roles from './components/roles/Roles'
import Employees from './components/employees/Employees'
import Offers from 'components/offers/Offers'
import Dashboard from 'components/dashboard/Dashboard'
import Clients from 'components/clients/Clients'
import Montages from 'components/montages/Montages'
import Orders from 'components/orders/Orders'
import SetPassword from 'components/authentication/SetPassword'
import Login from 'components/authentication/Login'
import PrivateRoute from 'components/usefullComponents/PrivateRoute'
import ForgotPassword from 'components/authentication/ForgotPassword'
import Doors from 'components/doors/Doors'
import Teams from 'components/teams/Teams'

const App = () => {
  const dispatch = useDispatch()
  const employeeId = localStorage.getItem('employeeId')
  const { userToken } = useSelector(state => state.auth)

  useEffect(() => {
    console.log('useEffectul APP APP APP APP APP')
    if (userToken) {
      dispatch(getAllEmployees()).then(response => {
        if (response !== 'error') {
          const currentEmployee = response.employees.filter(el => el._id === employeeId)
          if (currentEmployee.length > 0) {
            dispatch(AuthActions.setCurrentUserData({ userInfo: currentEmployee[0] }))
          }
        }
      })
    }
  }, [userToken])
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/set-password/:token" element={<SetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<SetPassword />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assessments"
        element={
          <PrivateRoute>
            <Assessments />
          </PrivateRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute>
            <Roles />
          </PrivateRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <PrivateRoute>
            <Offers />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
      <Route
        path="/montages"
        element={
          <PrivateRoute>
            <Montages />
          </PrivateRoute>
        }
      />
      <Route
        path="/doors"
        element={
          <PrivateRoute>
            <Doors />
          </PrivateRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <PrivateRoute>
            <Teams />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
