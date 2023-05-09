import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as CONSTANTS from './../../GlobalConstants'

import { Layout, Table, Space, Tag, Popover } from 'antd'
import { FolderViewOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import MainNav from 'components/navigation/MainNav'
import { getAllDoors } from 'redux/door/DoorActions'
import EditDoorDataModal from 'components/doors/editDoorData/EditDoorDataModal'
import { formatDate } from 'components/usefullComponents/dateUtils'

import styles from 'components/doors/Doors.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

const Doors = () => {
  const dispatch = useDispatch()
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [assessments, setAssessments] = useState({})
  const [record, setRecord] = useState({})
  const [toggle, setToggle] = useState(false)

  const doors = useSelector(state => state.door.doors)
  const assessment = useSelector(state => state.assessment.assessments)
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    console.log('suntem in useEffect-ul Doors')
    dispatch(getAllDoors())
  }, [assessment])

  const showEditModal = record => {
    setEditModalIsOpen(true)
    setRecord(record)
    setToggle(!toggle)
  }

  const cancelEditModalHandler = () => {
    setEditModalIsOpen(false)
    setAssessments(assessments)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: ['client', 'name'],
      key: 'name',
    },
    {
      title: 'Furnizor',
      dataIndex: ['door', 'provider'],
      key: 'provider',
      render: (_, { door }) => (door?.provider ? <Tag color="green">{door?.provider}</Tag> : null),
    },
    {
      title: 'Intrare',
      dataIndex: ['door', 'date'],
      key: 'date',
      render: (_, { door }) => (door.date ? formatDate(door.date) : null),
    },
    {
      title: 'DEL',
      dataIndex: ['door', 'DEL'],
      key: 'DEL',
      render: (_, { door }) => (door.DEL ? formatDate(door.DEL) : null),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { door }) =>
        door.delivered ? <Tag color="green">livrat</Tag> : <Tag color="error">de livrat</Tag>,
      // render status bazat pe livrat sau nu
    },
    {
      title: 'Quantity',
      dataIndex: ['assessment', 'quantity'],
      key: 'quantity',
    },
    {
      title: 'Observații',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, record) => (
        <Space size="middle">
          {record.door.comment ? (
            <Popover
              title="Observații: "
              content={`${record.door.comment}`}
              trigger="hover"
              placement="leftTop"
            >
              <div className={styles['view-comment-label']}>
                <FolderViewOutlined className={commonStyles.icon} />
                &nbsp;disp
              </div>
            </Popover>
          ) : (
            <Popover title="Observații inexistente" trigger="hover" placement="leftTop">
              <div className={styles['view-comment-label']}>
                <EyeInvisibleOutlined className={commonStyles.icon} />
                &nbsp;indisp
              </div>
            </Popover>
          )}
        </Space>
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              userInfo?.role.authorities.includes(CONSTANTS.READ_DOOR)
                ? showEditModal(record)
                : null
            }
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.READ_DOOR)}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ]
  return (
    <div>
      <MainNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Uși</h1>
        </div>
        <EditDoorDataModal
          isOpen={editModalIsOpen}
          handleCancel={cancelEditModalHandler}
          record={record}
          userInfo={userInfo}
          triggerRerender={toggle}
        />
        <Table columns={columns} dataSource={doors} />
      </Content>
    </div>
  )
}

export default Doors
