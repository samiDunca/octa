import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Layout, Menu, Button } from 'antd'

import { AuthActions } from 'redux/authentication/AuthSlice'

const { Header } = Layout

const MainNav = () => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(AuthActions.logout())
  }
  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
            { label: 'Home', key: '1', icon: <Link to="/" /> },
            { label: 'Masuri', key: '2', icon: <Link to="/assessments" /> },
            { label: 'Oferte', key: '3', icon: <Link to="/offers" /> },
            { label: 'Comenzi', key: '4', icon: <Link to="/orders" /> },
            { label: 'Montaj', key: '5', icon: <Link to="/montages" /> },
            { label: 'Clienti', key: '6', icon: <Link to="/clients" /> },
            {
              label: (
                <Button type="primary" onClick={logoutHandler} danger>
                  Logout
                </Button>
              ),
              key: '7',
            },
          ]}
        ></Menu>
      </Header>
    </Layout>
  )
}

export default MainNav
