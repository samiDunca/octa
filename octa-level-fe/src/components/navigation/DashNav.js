import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

const DashNav = () => {
  // const [current, setCurrent] = useState(2);
  // const onClick = (e) => {
  //   setCurrent(e.);
  // }
  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // selectedKeys={[current]}
          // defaultSelectedKeys={['2']}
          items={[
            { label: 'Home', key: '1', icon: <Link to="/" /> },
            { label: 'Roluri', key: '2', icon: <Link to="/roles" /> },
            { label: 'Angajati', key: '3', icon: <Link to="/employees" /> },
          ]}
        ></Menu>
      </Header>
    </Layout>
  )
}

export default DashNav
