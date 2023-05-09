import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as CONSTANTS from './../../GlobalConstants'

import { Layout, Button, Table, Space, Popover, Tag } from 'antd'
import { FolderViewOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import MainNav from 'components/navigation/MainNav'
import ViewAssessmentDataModal from 'components/offers/viewAssessmentData/ViewAssessmentDataModal'

import { getAllMontages } from 'redux/montage/MontageActions'
import { formatDate } from 'components/usefullComponents/dateUtils'

import styles from 'components/montages/Montages.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import EditMontageDataModal from './editMontageData/EditMontageDataModal'

const { Content } = Layout

const Montages = () => {
  const dispatch = useDispatch()
  const [assessment, setAssessment] = useState({})
  const [record, setRecord] = useState({})
  const [assessmentModalIsOpen, setAssessmentModalIsOpen] = useState(false)
  const [assessmentToggle, setAssessmentToggle] = useState(false)
  const [montageEditModalIsOpen, setMontageEditModalIsOpen] = useState(false)
  const [montageToggle, setMontageToggle] = useState(false)

  const montages = useSelector(state => state.montage.montages)
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    console.log('suntem in useEffect-ul Montages')
    dispatch(getAllMontages())
  }, [])

  // view assessment modal
  const viewAssessmentHandler = record => {
    setRecord(record)
    setAssessmentModalIsOpen(true)
    setAssessmentToggle(!assessmentToggle)
  }

  const handleCancelAssessmentModal = () => {
    setAssessmentModalIsOpen(false)
  }

  // edit montage modal
  const showMontageEditModal = record => {
    setMontageEditModalIsOpen(true)
    setMontageToggle(!montageToggle)
    setRecord(record)
  }

  const cancelEditMontageModalHandler = () => {
    setMontageEditModalIsOpen(false)
  }

  const displayStatusHandler = record => {}

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
    },
    {
      title: 'Detalii Măsură',
      dataIndex: 'assessmentDetails',
      key: 'vizualizare',
      render: (_, record) => (
        <Space size="middle">
          {record.assessment.assessmentDetailsAvailable ? (
            <div
              onClick={() => viewAssessmentHandler(record)}
              className={styles['view-assessment-link']}
            >
              <FolderViewOutlined className={commonStyles.icon} />
              &nbsp; disp
            </div>
          ) : (
            <Popover
              title="Detalii inexistente"
              content="Nu există detalii completate pentru această ofertă"
              trigger="hover"
              placement="leftTop"
            >
              <div className={styles['view-assessment-link']}>
                <EyeInvisibleOutlined className={commonStyles.icon} />
                &nbsp; indisp
              </div>
            </Popover>
          )}
        </Space>
      ),
    },
    {
      title: 'DEM',
      dataIndex: ['montage', 'DEM'],
      key: 'DEM',
      render: (_, { montage }) => (montage.DEM ? formatDate(montage.DEM) : null),
    },
    {
      title: 'Echipa',
      dataIndex: ['montage', 'team'],
      key: 'team',
      render: (_, { montage }) =>
        montage.team?.name ? <Tag color="cyan">{montage.team?.name}</Tag> : null,
    },
    {
      title: 'Status',
      dataIndex: ['montage', 'status'],
      key: 'status',
      render: (_, record) =>
        record.montage.mounted ? (
          <Tag color="green">executat</Tag>
        ) : (
          <Tag color="error">de executat</Tag>
        ),
    },
    {
      title: 'Observații',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, record) => (
        <Space size="middle">
          {record.montage.comment ? (
            <Popover
              title="Observații: "
              content={`${record.montage.comment}`}
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
              userInfo?.role.authorities.includes(CONSTANTS.WRITE_MONTAGE) &&
              showMontageEditModal(record)
            }
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.WRITE_MONTAGE)}
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
          <h1>Montaj</h1>
        </div>
        {userInfo?.role.authorities.includes(CONSTANTS.READ_ASSESSMENT) ? (
          <ViewAssessmentDataModal
            record={record}
            isOpen={assessmentModalIsOpen}
            handleCancel={handleCancelAssessmentModal}
            triggerRerender={assessmentToggle}
          />
        ) : null}
        {userInfo?.role.authorities.includes(CONSTANTS.WRITE_MONTAGE) ? (
          <EditMontageDataModal
            record={record}
            isOpen={montageEditModalIsOpen}
            handleCancel={cancelEditMontageModalHandler}
            triggerRerender={montageToggle}
          />
        ) : null}
        <Table columns={columns} dataSource={montages} />
      </Content>
    </div>
  )
}

export default Montages
