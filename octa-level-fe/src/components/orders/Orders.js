import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as CONSTANTS from './../../GlobalConstants'

import { Layout, Table, Space, Popover } from 'antd'
import {
  EditOutlined,
  CheckCircleOutlined,
  FolderViewOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons'

import MainNav from 'components/navigation/MainNav'
import OrderPaymentModal from 'components/orders/orderPayment/OrderPaymentModal'
import EditOrderDataModal from 'components/orders/editOrderData/EditOrderDataModal'
import { getAllOrders } from 'redux/order/OrderActions'

import styles from 'components/orders/Orders.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Content } = Layout

const Orders = () => {
  const dispatch = useDispatch()
  const [paymentToggle, setPaymentToggle] = useState(false)
  const [editToggle, setEditToggle] = useState(false)
  const [record, setRecord] = useState({})
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const orders = useSelector(state => state.order.orders)
  const { userInfo } = useSelector(state => state.auth)

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

  // dispay status
  const dispayStatusHandler = record => {
    if (record.order?.status === 'done') {
      // status 1
      return (
        <div>
          <div className={styles['status-done']}>ușă: livrat</div>
          <div className={styles['status-done']}>montaj: executat</div>
        </div>
      )
    } else if (record.order?.status === 'partially') {
      // status 2
      return (
        <div>
          <div className={styles['status-done']}>ușă: livrat</div>
          <div className={styles['status-undone']}>montaj: de executat</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className={styles['status-undone']}>ușă: de livrat</div>
          <div className={styles['status-undone']}>montaj: de executat</div>
        </div>
      )
    }
  }

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
      render: (_, record) => dispayStatusHandler(record),
    },
    {
      title: 'Observații',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, record) => (
        <Space size="middle">
          {record.order.comment ? (
            <Popover
              title="Observații: "
              content={`${record.order.comment}`}
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              userInfo?.role.authorities.includes(CONSTANTS.WRITE_ORDER) && showEditModal(record)
            }
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.WRITE_ORDER)}
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
      <div id="myDiv"></div>
      {userInfo?.role.authorities.includes(CONSTANTS.WRITE_ORDER) ? (
        <OrderPaymentModal
          isOpen={paymentModalIsOpen}
          handleCancel={handleCancelPaymentModal}
          record={record}
          triggerRerender={paymentToggle}
        />
      ) : null}
      {userInfo?.role.authorities.includes(CONSTANTS.WRITE_ORDER) ? (
        <EditOrderDataModal
          isOpen={editModalIsOpen}
          handleCancel={handleCancelEditModal}
          record={record}
          triggerRerender={editToggle}
        />
      ) : null}
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
