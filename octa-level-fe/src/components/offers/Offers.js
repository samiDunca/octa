import MainNav from 'components/navigation/MainNav'
import { Layout } from 'antd'
const { Content } = Layout

const Offers = () => {
  return (
    <div>
      <MainNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <h1>Offers</h1>
      </Content>
    </div>
  )
}

export default Offers
