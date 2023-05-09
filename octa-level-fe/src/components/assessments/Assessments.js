import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as CONSTANTS from './../../GlobalConstants'

import { Layout, Space, Table, Button, Tag } from 'antd'

import MainNav from 'components/navigation/MainNav'
import AddAssessmentModal from './addAssessment/AddAssessmentModal'
import EditAssessmentDataModal from 'components/assessments/editAssessmentData/EditAssessmentDataModal'
import { getAllAssessments, getOneAssessment } from 'redux/assessment/AssessmentActions'

import styles from 'components/assessments/Assessments.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const Assessments = () => {
  const { Content } = Layout

  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const [record, setRecord] = useState({})
  const [newAssessModalIsOpen, setNewAssessModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const assessments1 = useSelector(state => state.assessment.assessments)
  const { userInfo } = useSelector(state => state.auth)

  // userInfo === null ? dispatch(getAll)
  useEffect(() => {
    console.log('useEffect Assessments')
    dispatch(getAllAssessments())
  }, [])

  const showNewAssessmentModal = () => {
    setNewAssessModalIsOpen(true)
  }

  const showEditModal = () => {
    setEditModalIsOpen(true)
  }

  const handleCancelNewAssessModal = () => {
    setNewAssessModalIsOpen(false)
  }

  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const editAssessmentHandler = async recordPar => {
    setRecord(recordPar)
    showEditModal(true)
    setToggle(!toggle)
  }

  const formatDate = date => {
    const copyDate = new Date(date)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    return copyDate.toLocaleDateString('en-US', options)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: ['client', 'name'],
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Telefon',
      dataIndex: ['client', 'phone'],
      key: 'phone',
    },
    {
      title: 'Adresă',
      dataIndex: ['client', 'address'],
      key: 'address',
    },
    {
      title: 'Data',
      dataIndex: ['assessment', 'date'],
      key: 'data',
      render: (_, { assessment }) => (assessment.date ? <>{formatDate(assessment.date)}</> : null),
    },
    {
      title: 'Status',
      dataIndex: ['assessment', 'dateDetailsAddeded'],
      key: 'status',
      render: (_, { assessment }) =>
        assessment.dateDetailsAddeded ? (
          <Tag color="green">completat: {formatDate(assessment?.dateDetailsAddeded)}</Tag>
        ) : null,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              userInfo?.role.authorities.includes(CONSTANTS.READ_ASSESSMENT) &&
              editAssessmentHandler(record)
            }
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.READ_ASSESSMENT)}
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
      <Content className={styles['site-layout']}>
        <div className={commonStyles['header-box']}>
          <h1>Măsuri</h1>
          <Button
            type="primary"
            onClick={showNewAssessmentModal}
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.WRITE_ASSESSMENT)}
          >
            Adaugă Măsură
          </Button>
        </div>
        {userInfo?.role.authorities.includes(CONSTANTS.WRITE_ASSESSMENT) ? (
          <AddAssessmentModal
            isOpen={newAssessModalIsOpen}
            handleCancel={handleCancelNewAssessModal}
          />
        ) : null}
        {userInfo?.role.authorities.includes(CONSTANTS.READ_ASSESSMENT) ? (
          <EditAssessmentDataModal
            record={record}
            isOpen={editModalIsOpen}
            handleCancel={handleCancelEditModal}
            triggerRerender={toggle}
            userInfo={userInfo}
          />
        ) : null}
        {assessments1 && <Table columns={columns} dataSource={assessments1} key="name" />}
      </Content>
    </div>
  )
}

export default Assessments
