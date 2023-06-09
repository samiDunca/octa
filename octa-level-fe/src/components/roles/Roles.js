import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Button, Table, Space } from 'antd'

import DashNav from 'components/navigation/DashNav'
import AddRoleModal from 'components/roles/addRole/AddRoleModal'
import { getAllRoles } from 'redux/role/RoleActions'

import styles from 'components/roles/Roles.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

const Roles = () => {
  const dispatch = useDispatch()
  const [newRoleModalIsOpen, setNewRoleModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllRoles())
  }, [])

  const showNewRoleModal = () => {
    setNewRoleModalIsOpen(true)
  }

  const showEditModal = () => {
    setEditModalIsOpen(true)
  }

  const handleCancelNewRoleModal = () => {
    setNewRoleModalIsOpen(false)
  }

  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const roles = useSelector(state => state.role.roles)

  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Autorități',
      // dataIndex: 'authorities',
      key: 'authorities',
      render: (_, record) => (
        <Space className={styles['cell-authorities-container']}>
          {_.authorities.map((el, i) => (
            <div key={i} className={styles['cell-authorities']}>
              {el}
            </div>
          ))}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <DashNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Roles</h1>
          <Button type="primary" onClick={showNewRoleModal}>
            Adaugă Rol
          </Button>
        </div>
        <AddRoleModal isOpen={newRoleModalIsOpen} handleCancel={handleCancelNewRoleModal} />
        <Table columns={columns} dataSource={roles} />
      </Content>
    </div>
  )
}

export default Roles
