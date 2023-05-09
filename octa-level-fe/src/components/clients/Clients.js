import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as CONSTANTS from './../../GlobalConstants'

import { Layout, Tag, Table, Space } from 'antd'

import MainNav from 'components/navigation/MainNav'

import { getAllClients } from 'redux/client/ClientActions'

import commonStyles from 'sharedStyles/CommonStyles.module.css'
import EditClientDataModal from 'components/clients/editClientData/EditClientDataModal'

const { Content } = Layout

const Clients = () => {
  const dispatch = useDispatch()
  const [client, setClient] = useState({})
  const [offer, setOffer] = useState({})
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)

  const { userInfo } = useSelector(state => state.auth)
  const clients = useSelector(state => state.client.clients)

  useEffect(() => {
    dispatch(getAllClients())
  }, [])

  const showClientEditModal = record => {
    setEditModalIsOpen(true)
    setToggle(!toggle)
    setClient(record.client)
    setOffer(record.offer)
  }

  const cancelClientEditModal = () => {
    setEditModalIsOpen(false)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: ['client', 'name'],
      key: 'name',
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
      title: 'Ofertă / Comandă',
      dataIndex: 'offer',
      key: 'offer',
      render: (_, record) =>
        record.offer.orderIsPlaced ? <Tag color="green">Comandă</Tag> : <Tag>Ofertă</Tag>,
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              userInfo?.role.authorities.includes(CONSTANTS.WRITE_CLIENT) &&
              showClientEditModal(record)
            }
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.WRITE_CLIENT)}
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
          <h1>Clienți</h1>
        </div>
        <EditClientDataModal
          client={client}
          offer={offer}
          isOpen={editModalIsOpen}
          handleCancel={cancelClientEditModal}
          userInfo={userInfo}
          triggerRerender={toggle}
        />
        <Table columns={columns} dataSource={clients} />
      </Content>
    </div>
  )
}

export default Clients
