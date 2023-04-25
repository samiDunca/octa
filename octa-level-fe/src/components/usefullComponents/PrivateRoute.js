import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { loading, userToken } = useSelector(state => state.auth)

  return loading ? <h1>LOADING...</h1> : userToken ? children : <Navigate to="/login" />
}

export default PrivateRoute
