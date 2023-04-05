import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Table, Button, Space, Form, Select, Tag, Popover } from 'antd'

import DashNav from 'components/navigation/DashNav'
import { getAllEmployees } from 'redux/employee/EmployeeActions'

import styles from 'components/employees/Employees.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import AddEmployeeModal from './addEmployee/AddEmployeeModal'
import EditEmployeeDataModal from './editEmployeeData/EditEmployeeDataModal'

const { Content } = Layout

const Employees = () => {
  const [newEmployeeModalIsOpen, setNewEmployeeModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [employee, setEmployee] = useState({})
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()

  const employees = useSelector(state => state.employee.employees)

  useEffect(() => {
    dispatch(getAllEmployees())
  }, [])

  const showNewEmployeeModal = () => {
    setNewEmployeeModalIsOpen(true)
  }

  const showEditModal = () => {
    setEditModalIsOpen(true)
  }

  const handleCancelNewEmployeeModal = () => {
    setNewEmployeeModalIsOpen(false)
  }

  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const editEmployeeHandler = record => {
    console.log(record)

    setEmployee(record)
    showEditModal(true)
    setToggle(!toggle)
  }

  // Nume, Prenume, Email, Adresa, Telefon, Rol
  const renderAuthorities = authorities => {
    return (
      <div className={styles['display-authorities']}>
        {authorities?.map(el => (
          <p key={el} value={el}>
            {el}
          </p>
        ))}
      </div>
    )
  }
  // const content = (
  // );

  const columns = [
    {
      title: 'Nume',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Prenume',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Adresă',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Rol',
      // dataIndex: ['role', 'name'],
      dataIndex: 'role',
      key: 'role',
      render: record => {
        if (record?.name !== undefined) {
          return (
            <Popover
              content={renderAuthorities(record?.authorities)}
              title={`${record?.name.charAt(0).toUpperCase() + record?.name.slice(1)}`}
              trigger="hover"
              placement="leftTop"
            >
              <Button size="small" type="primary" ghost>
                {record?.name.toUpperCase()}
              </Button>
            </Popover>
          )
        } else {
          return <></>
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editEmployeeHandler(record)}>Edit</a>
        </Space>
      ),
    },
  ]

  // Nume, Prenume,
  // Email, Telefon,
  // Adresa
  // Rol
  return (
    <div>
      <DashNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Angajați</h1>
          <Button type="primary" onClick={showNewEmployeeModal}>
            Adaugă Angajat
          </Button>
        </div>
        <AddEmployeeModal
          isOpen={newEmployeeModalIsOpen}
          handleCancel={handleCancelNewEmployeeModal}
        />
        <EditEmployeeDataModal
          isOpen={editModalIsOpen}
          handleCancel={handleCancelEditModal}
          employee={employee}
          triggerRerender={toggle}
        />
        <Table columns={columns} dataSource={employees} />
      </Content>
    </div>
  )
}

export default Employees
