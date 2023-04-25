import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Layout, Button, Table, Space, Popover } from 'antd'

import DashNav from 'components/navigation/DashNav'

import styles from 'components/teams/Teams.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import AddTeamModal from './addTeam/AddTeamModal'
const { Content } = Layout

const Teams = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)

  const showEditModal = record => {
    setEditModalIsOpen(true)
    setToggle(!toggle)
  }

  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Angajați',
      dataIndex: 'employees',
      key: 'employees',
      render: (_, record) => (
        <Space className={styles['cell-employees-container']}>
          {console.log(_)}
          {console.log(record)}

          {/* {_.employees.map((el, i) => (
            <div key={i}>
              {el.firstName} {el.lastName}
            </div>
          ))} */}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>Edit</a>
        </Space>
      ),
    },
  ]
  return (
    <div>
      <DashNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Echipe</h1>
          <Button type="primary" onClick={showEditModal}>
            Adaugă Echipă
          </Button>
        </div>
        <AddTeamModal
          isOpen={editModalIsOpen}
          handleCancel={handleCancelEditModal}
          triggerRerender={toggle}
        />
        <Table columns={columns} />
      </Content>
    </div>
  )
}

export default Teams
