import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Space, Table, Button } from 'antd'

import MainNav from 'components/navigation/MainNav'
import AddAssessmentModal from './addAssessment/AddAssessmentModal'
import EditAssessmentDataModal from 'components/assessments/editAssessmentData/EditAssessmentDataModal'
import { getAllAssessments, getOneAssessment } from 'redux/assessment/AssessmentActions'

import styles from 'components/assessments/Assessments.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const Assessments = () => {
  const { Content } = Layout

  const dispatch = useDispatch()
  const [newAssessModalIsOpen, setNewAssessModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [assessment, setAssessment] = useState({})
  const [clientId, setClientId] = useState('')

  const assessments1 = useSelector(state => state.assessment.assessments)

  useEffect(() => {
    console.log('suntem in useEffect-ul Assessments')
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

  const editAssessmentHandler = async record => {
    const assessmentObj = await dispatch(getOneAssessment(record.project.assessment))
    await setClientId(record._id)

    setAssessment(assessmentObj)
    showEditModal(true)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
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
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      <MainNav />
      <Content className={styles['site-layout']}>
        <div className={commonStyles['header-box']}>
          <h1>Măsuri</h1>
          <Button type="primary" onClick={showNewAssessmentModal}>
            Adaugă Măsură
          </Button>
        </div>
        <AddAssessmentModal
          isOpen={newAssessModalIsOpen}
          handleCancel={handleCancelNewAssessModal}
        />
        <EditAssessmentDataModal
          assessment={assessment}
          clientId={clientId}
          isOpen={editModalIsOpen}
          handleCancel={handleCancelEditModal}
        />
        {assessments1 && <Table columns={columns} dataSource={assessments1} />}
      </Content>
    </div>
  )
}

export default Assessments
