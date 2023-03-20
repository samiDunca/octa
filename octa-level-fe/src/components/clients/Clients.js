import MainNav from 'components/navigation/MainNav'
import { Layout } from 'antd'
const { Content } = Layout

const Clients = () => {
  return (
    <div>
      <MainNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <h1>Clients</h1>
      </Content>
    </div>
  )
}

export default Clients
