import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { loading, userToken } = useSelector(state => state.auth)

  // console.log('Suntem in PRIVATE ROUTES COMPONENT')
  // console.log(userToken)
  const isAuth = useAuth()
  return loading ? <h1>LOADING...</h1> : userToken ? children : <Navigate to="/login" />
  // return isAuth ? children : <Navigate to="/login" />
  // return userToken ? children : <Navigate to="/login" />
}

function useAuth() {
  return true
}
export default PrivateRoute
