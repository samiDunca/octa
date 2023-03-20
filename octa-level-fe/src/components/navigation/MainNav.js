import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd'
import { useState } from 'react'
import Assessments from 'components/assessments/Assessments'
const { Header, Content, Footer } = Layout

const MainNav = () => {
  return (
    <Layout>
      {/* <div> */}
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
          ]}
        ></Menu>
      </Header>
    </Layout>
  )
}

export default MainNav
