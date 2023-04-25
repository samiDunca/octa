import MainNav from 'components/navigation/MainNav'
import { Layout, Button, Table, Space } from 'antd'

import styles from 'components/doors/Doors.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

const Doors = () => {
  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Furnizor',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Detalii Măsură',
      dataIndex: 'assessmentDetails',
      key: 'asssessmentDetails',
    },
    {
      title: 'DEM',
      dataIndex: 'DEM',
      key: 'DEM',
    },
    {
      title: 'Echipa',
      dataIndex: 'employeesTeam',
      key: 'employeesTeam',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Observații',
      dataIndex: 'comment',
      key: 'comment',
    },
  ]
  return (
    <div>
      <MainNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Uși</h1>
        </div>
        <Table columns={columns} />
      </Content>
    </div>
  )
}

export default Doors
