import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Button, Table, Space } from 'antd'
import { Document, Page } from 'react-pdf'
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons'

import MainNav from 'components/navigation/MainNav'
import OrderPaymentModal from 'components/orders/orderPayment/OrderPaymentModal'
import { getOneOffer } from 'redux/offer/OfferActions'

import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { getAllOrders } from 'redux/order/OrderActions'
import EditOrderDataModal from './editOrderData/EditOrderDataModal'
const { Content } = Layout

const Orders = () => {
  const dispatch = useDispatch()
  const [paymentToggle, setPaymentToggle] = useState(false)
  const [editToggle, setEditToggle] = useState(false)
  const [record, setRecord] = useState({})
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const orders = useSelector(state => state.order.orders)

  useEffect(() => {
    console.log('suntem in useEffect-ul Orders')
    dispatch(getAllOrders())
  }, [])

  const formatDate = date => {
    const copyDate = new Date(date)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    return copyDate.toLocaleDateString('en-US', options)
  }

  const restHandlerFunction = record => {
    setRecord(record)
    const { price, paid } = record.order
    if (price === paid) {
      return (
        <div className={commonStyles['icon-box']}>
          Achitat &nbsp;&nbsp;
          <CheckCircleOutlined className={commonStyles['icon-paid-complete']} />
        </div>
      )
    } else if (price > paid) {
      return (
        <div className={commonStyles['icon-box']} onClick={() => showPaymentModal()}>
          {price - paid} &nbsp;&nbsp;
          <EditOutlined className={commonStyles.icon} />
        </div>
      )
    }
  }

  // PAYMENY MODAL
  const handleCancelPaymentModal = () => {
    setPaymentModalIsOpen(false)
  }

  const showPaymentModal = () => {
    setPaymentModalIsOpen(true)
    setPaymentToggle(!paymentToggle)
  }

  // EDIT MODAL
  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const showEditModal = () => {
    setEditModalIsOpen(true)
    setEditToggle(!editToggle)
  }

  // const handleCancel =

  const columns = [
    {
      title: 'Nume',
      dataIndex: ['client', 'name'],
      key: 'name',
    },
    {
      title: 'Intrare',
      dataIndex: ['order', 'date'],
      key: 'date',
      render: (_, { order }) => (order.date ? formatDate(order.date) : null),
    },
    {
      title: 'Preț',
      dataIndex: ['order', 'price'],
      key: 'price',
    },
    {
      title: 'Achitat',
      dataIndex: ['order', 'paid'],
      key: 'paid',
    },
    {
      title: 'Rest',
      dataIndex: ['order', 'rest'],
      key: 'rest',
      render: (_, record) => <div>{restHandlerFunction(record)} </div>,
    },
    {
      title: 'DEM',
      dataIndex: ['montage', 'DEM'],
      key: 'DEM',
      render: (_, { montage }) => (montage.DEM ? formatDate(montage.DEM) : null),
    },
    {
      title: 'Status',
      dataIndex: ['order', 'status'],
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>Edit</a>
        </Space>
      ),
    },
  ]

  const [url, setUrl] = useState('')
  const handleGetOneOffer = async () => {
    const offerId = '64310edba8994eac6e4922a7'
    const urlfirs = await dispatch(getOneOffer(offerId))
    console.log(urlfirs)
    setUrl(urlfirs)
    // generateHtmlCode(urlfirs)
  }

  const generateHtmlCode = url => {
    let id = 123

    let link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'offer.pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // setLoading(false)
    let myDiv = document.getElementById('myDiv')
    myDiv.appendChild(link)
  }

  return (
    <div>
      <MainNav />
      <div id="myDiv"></div>
      {/* {url && <embed src={url} width="800px" height="2100px" />} */}
      <OrderPaymentModal
        isOpen={paymentModalIsOpen}
        handleCancel={handleCancelPaymentModal}
        record={record}
        triggerRerender={paymentToggle}
      />
      <EditOrderDataModal
        isOpen={editModalIsOpen}
        handleCancel={handleCancelEditModal}
        record={record}
        triggerRerender={editToggle}
      />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Comenzi</h1>
        </div>

        <Table columns={columns} dataSource={orders} />
      </Content>
    </div>
  )
}

export default Orders
