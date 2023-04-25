import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Button, Table, Space } from 'antd'

import DashNav from 'components/navigation/DashNav'
import AddRoleModal from 'components/roles/addRole/AddRoleModal'
import EditRoleDataModal from 'components/roles/editRoleData/EditRoleDataModal'
import { getAllRoles } from 'redux/role/RoleActions'

import styles from 'components/roles/Roles.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

const Roles = () => {
  const dispatch = useDispatch()
  const [newRoleModalIsOpen, setNewRoleModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [oneRole, setOneRole] = useState({})
  const [toggle, setToggle] = useState(false)

  const roles = useSelector(state => state.role.roles)

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

  const editAssessmentHandler = record => {
    setOneRole(record)
    showEditModal(true)
    setToggle(!toggle)
  }

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
          <a onClick={() => editAssessmentHandler(record)}>Edit</a>
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
        <EditRoleDataModal
          isOpen={editModalIsOpen}
          handleCancel={handleCancelEditModal}
          oneRole={oneRole}
          triggerRerender={toggle}
        />
        <Table columns={columns} dataSource={roles} key="name" />
      </Content>
    </div>
  )
}

export default Roles
