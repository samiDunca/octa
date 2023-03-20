import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Space, Table, Button } from 'antd'

import MainNav from 'components/navigation/MainNav'
import AddAssessmentModal from './addAssessment/AddAssessmentModal'
import EditAssessmentDataModal from 'components/assessments/editAssessmentData/editAssessmentDataModal'
import { getAllAssessments, getOneRecipe } from 'redux/assessment/AssessmentActions'

import styles from 'components/assessments/Assessments.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

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
        <a>Edit</a>
      </Space>
    ),
  },
]

const Assessments = () => {
  const dispatch = useDispatch()
  const [newAssessModalIsOpen, setNewAssessModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [assessment, setAssessment] = useState({})
  const [clientId, setClientId] = useState('')
  // const [assessmentId, setAssessmentId] = useState(0)

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

  const assessments1 = useSelector(state => state.assessment.assessments)

  // console.log(assessments1)
  // fetch-uim data
  //facem tabel
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
        {assessments1 && (
          <Table
            columns={columns}
            dataSource={assessments1}
            onRow={(record, rowIndex) => {
              return {
                onClick: async event => {
                  const assessmentObj = await dispatch(getOneRecipe(record.project.assessment))
                  await setClientId(record._id)

                  setAssessment(assessmentObj)
                  showEditModal(true)

                  // console.log({ record })
                  // console.log({ rowIndex })
                  // console.log({ event })
                },
              }
            }}
          />
        )}
      </Content>
    </div>
  )
}

export default Assessments
