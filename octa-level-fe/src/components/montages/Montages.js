import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Layout, Button, Table, Space, Popover } from 'antd'

import MainNav from 'components/navigation/MainNav'

import commonStyles from 'sharedStyles/CommonStyles.module.css'
const { Content } = Layout

const Montages = () => {
  const showMontageDetailsModal = () => {}
  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Furnizor',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Detalii Măsură',
      dataIndex: 'assessmentDetails',
      key: 'asssessmentDetails',
    },
    {
      title: 'DEM',
      dataIndex: 'DEM',
      key: 'DEM',
    },
    {
      title: 'Echipa',
      dataIndex: 'employeesTeam',
      key: 'employeesTeam',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Observații',
      dataIndex: 'comment',
      key: 'comment',
      render: record => {
        if (record?.montage.comment !== undefined) {
          return (
            <Popover
              // content={renderAuthorities(record?.authorities)}
              content={record?.montage.comment}
              title={`${
                record?.client.name.charAt(0).toUpperCase() + record?.client.name.slice(1)
              }`}
              trigger="hover"
              placement="leftTop"
            >
              <Button size="small" type="primary" ghost>
                view
              </Button>
            </Popover>
          )
        } else {
          return <></>
        }
      },
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showMontageDetailsModal(record)}>Edit</a>
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
        <Table columns={columns} />
      </Content>
    </div>
  )
}

export default Montages
