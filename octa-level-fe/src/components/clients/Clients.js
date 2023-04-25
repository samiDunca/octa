import MainNav from 'components/navigation/MainNav'
import { Layout, Button, Table, Space } from 'antd'

import commonStyles from 'sharedStyles/CommonStyles.module.css'
const { Content } = Layout

const Clients = () => {
  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Adresă',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Identitate',
      dataIndex: 'identity',
      key: 'identity',
    },
    {
      title: 'Referință',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Ofertă / Comandă',
      dataIndex: 'offer',
      key: 'offer',
    },
  ]
  return (
    <div>
      <MainNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Clienți</h1>
        </div>
        <Table columns={columns} />
      </Content>
    </div>
  )
}

export default Clients
