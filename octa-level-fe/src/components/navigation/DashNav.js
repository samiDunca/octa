import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'

import { AuthActions } from 'redux/authentication/AuthSlice'
import { logout } from 'redux/authentication/AuthSlice'

import styles from 'components/navigation/Nav.module.css'
import Dashboard from 'components/dashboard/Dashboard'

const { Header, Content, Footer } = Layout
const { Item } = Menu

const DashNav = () => {
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
          // selectedKeys={[current]}
          className={styles['navbar-layout']}
          defaultSelectedKeys={['1']}
          items={[
            { label: 'Home', key: '1', icon: <Link to="/" /> },
            { label: 'Roluri', key: '2', icon: <Link to="/roles" /> },
            { label: 'Angajati', key: '3', icon: <Link to="/employees" /> },
            {
              label: (
                <Button type="primary" onClick={logoutHandler} danger>
                  Logout
                </Button>
              ),
              key: '4',
            },
          ]}
        ></Menu>
      </Header>
    </Layout>
  )
}

export default DashNav
