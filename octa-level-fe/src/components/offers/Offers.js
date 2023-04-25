import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  UploadOutlined,
  CheckSquareOutlined,
  EditOutlined,
  FolderViewOutlined,
  EyeInvisibleOutlined,
  ConsoleSqlOutlined,
} from '@ant-design/icons'
import { Layout, Space, Table, Tag, Form, Select, Popover } from 'antd'
import MainNav from 'components/navigation/MainNav'
import UploadOfferModal from 'components/offers/uploadOffer/UploadOfferModal'
import EditAssessmentDataModal from 'components/offers/editAssessmentData/EditAssessmentDataModal'
import PlaceOrderModal from 'components/offers/placeOrder/PlaceOrderModal'
import AddCommentModal from 'components/offers/addComment/AddCommentModal'

import { getAllOffers } from 'redux/offer/OfferActions'

import styles from 'components/offers/Offers.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

const Offers = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const selectRefs = useRef({})
  const [selectValues, setSelectValues] = useState({})

  const [toggle, setToggle] = useState(false)
  const [commentToggle, setCommentToggle] = useState(false)
  const [assessment, setAssessment] = useState({})
  const [record, setRecord] = useState({})
  const [placeOrderModalIsOpen, setPlaceOrderModalIsOpen] = useState(false)
  const [uploadOfferModalIsOpen, setUploadOfferModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false)
  const [isCommandAllready, setIsCommandAllready] = useState(false)

  const offers = useSelector(state => state.offer.offers)

  useEffect(() => {
    console.log('suntem in useEffect-ul Offers')
    dispatch(getAllOffers())
  }, [])

  const formatDate = date => {
    const copyDate = new Date(date)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    return copyDate.toLocaleDateString('en-US', options)
  }

  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const showOfferUploadModal = record => {
    setRecord(record)
    setUploadOfferModalIsOpen(true)
  }

  const handleCancelUploadModal = () => {
    setUploadOfferModalIsOpen(false)
  }

  const updateSelectValue = (key, value) => {
    setSelectValues(prevValues => {
      return {
        ...prevValues,
        [key]: value,
      }
    })
  }

  const handleCancelPlaceOrderModal = (orderPlaced, record) => {
    if (!orderPlaced) {
      console.log('suntem in functia handleCancelPlaceOrderModal', orderPlaced)
      updateSelectValue(record.client?._id, 'Ofertă')
    } else {
      updateSelectValue(record.client?._id, 'Comandă')
    }
    setPlaceOrderModalIsOpen(false)
  }

  const handleCancelCommentModal = () => {
    setCommentModalIsOpen(false)
  }

  const editAssessmentHandler = assessment => {
    setAssessment(assessment)
    setEditModalIsOpen(true)
    setToggle(!toggle)
  }

  const editOfferCommentHandler = recordParameter => {
    setCommentModalIsOpen(true)
    setRecord(recordParameter)

    setCommentToggle(!commentToggle)
  }

  const handlePlaceOrder = (value, option, record) => {
    // VALIDATION NECESARELY AFTER YOU CREATE THE ORDERS TABLE AND YOU HAVE THE ORDERS GENERATED
    // What you have to validate exactly:
    // In the offers table, at the "Comanda" column, if the value is allready "comanda" and not "oferta"
    // and the "comand" option is choosed and the the modal is aborded, the field will tourn back into "oferta", whatch out
    console.log(value)
    setRecord(record)
    if (value == 'Comandă') {
      setPlaceOrderModalIsOpen(true)
      return
    }
    setIsCommandAllready(false)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: ['client', 'name'],
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Comandă',
      dataIndex: '',
      key: 'comanda',
      render: (_, record) =>
        record.offer?.orderIsPlaced ? (
          <Select disabled={true} defaultValue="Comandă">
            <Select.Option value="Comandă">Comandă</Select.Option>
          </Select>
        ) : (
          <Select
            defaultValue="Ofertă"
            value={selectValues[record.client?._id]}
            onSelect={(value, option) => handlePlaceOrder(value, option, record)}
            disabled={!record.offer.offerIsUploaded}
          >
            <Select.Option value="Ofertă">Ofertă</Select.Option>
            <Select.Option value="Comandă">Comandă</Select.Option>
          </Select>
        ),
    },
    {
      title: 'Ofertă',
      key: 'uploadOffer',
      render: (_, record) => (
        <Space size="middle" className={styles['offer-upload-link']}>
          {record.offer.date ? (
            <div onClick={() => showOfferUploadModal(record)}>
              {/* Trimis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
              <CheckSquareOutlined
                className={styles['upload-icon']}
                onClick={() => showOfferUploadModal(record)}
              />
              Trimis
            </div>
          ) : (
            <div onClick={() => showOfferUploadModal(record)}>
              <UploadOutlined className={styles['upload-icon']} />
              De Trimis
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Data - Trimis',
      dataIndex: 'date',
      key: 'status',
      render: (_, { offer }) => (offer.date ? formatDate(offer.date) : null),
    },
    {
      title: 'Detalii',
      key: 'vizualizare',
      render: (_, record) => (
        <Space size="middle">
          {record.assessment.assessmentDetailsAvailable ? (
            <div
              onClick={() => editAssessmentHandler(record.assessment)}
              className={styles['offer-upload-link']}
            >
              <FolderViewOutlined className={commonStyles.icon} />
              disp
            </div>
          ) : (
            <Popover
              title="Detalii inexistente"
              content="Nu există detalii completate pentru această ofertă"
              trigger="hover"
              placement="leftTop"
            >
              <div className={styles['offer-upload-link']}>
                <EyeInvisibleOutlined className={commonStyles.icon} />
                indisp
              </div>
            </Popover>
          )}
        </Space>
      ),
    },
    {
      title: 'Observații',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editOfferCommentHandler(record)}>
            <EditOutlined className={commonStyles.icon} />
            &nbsp;Edit
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
          <h1>Oferte</h1>
        </div>
        <EditAssessmentDataModal
          assessment={assessment}
          isOpen={editModalIsOpen}
          handleCancel={handleCancelEditModal}
          triggerRerender={toggle}
        />
        <UploadOfferModal
          isOpen={uploadOfferModalIsOpen}
          handleCancel={handleCancelUploadModal}
          record={record}
        />
        <PlaceOrderModal
          isOpen={placeOrderModalIsOpen}
          handleCancel={handleCancelPlaceOrderModal}
          record={record}
        />
        <AddCommentModal
          record={record}
          isOpen={commentModalIsOpen}
          handleCancel={handleCancelCommentModal}
          triggerRerender={commentToggle}
        />
        <Table columns={columns} dataSource={offers} key={record => record.offer?._id}></Table>
      </Content>
    </div>
  )
}

export default Offers
