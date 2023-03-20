import { Route, Routes } from 'react-router-dom'

import './App.css'
import Assessments from './components/assessments/Assessments'
import Roles from './components/roles/Roles'
import Employees from './components/employees/Employees'
import Offers from 'components/offers/Offers'
import Dashboard from 'components/dashboard/Dashboard'
import MainNav from './components/navigation/MainNav'
import Clients from 'components/clients/Clients'
import Montages from 'components/montages/Montages'
import Orders from 'components/orders/Order'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/montages" element={<Montages />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}

export default App
