import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as CONSTANTS from './../../GlobalConstants'

import { Layout, Button, Table, Space, Tag } from 'antd'

import AddTeamModal from './addTeam/AddTeamModal'
import EditTeamDataModal from 'components/teams/editTeamData/EditTeamDataModal'
import DashNav from 'components/navigation/DashNav'

import { getAllTeams } from 'redux/team/TeamActions'

import styles from 'components/teams/Teams.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
const { Content } = Layout

const Teams = () => {
  const dispatch = useDispatch()
  const [addTeamModalIsOpen, setAddTeamModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [team, setTeam] = useState({})
  const [toggle, setToggle] = useState(false)

  const teams = useSelector(state => state.team.teams)
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAllTeams())
  }, [])

  const showAddTeamModal = () => {
    setAddTeamModalIsOpen(true)
  }

  const handleCancelAddTeamModal = () => {
    setAddTeamModalIsOpen(false)
  }

  const showEditModal = team => {
    setEditModalIsOpen(true)
    setTeam(team)
    setToggle(!toggle)
  }

  const handleCancelEditModal = () => {
    setEditModalIsOpen(false)
  }

  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Angajați',
      dataIndex: 'employees',
      key: 'employees',
      render: (_, record) => (
        <Space className={styles['cell-employees-container']}>
          {record?.employees.map((el, i) => (
            // <Tag key={i}>
            <p>
              • {el.firstName} {el.lastName}
            </p>
            // </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, team) => (
        <Space size="middle">
          <a
            onClick={() =>
              userInfo?.role.authorities.includes(CONSTANTS.WRITE_TEAM) && showEditModal(team)
            }
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.WRITE_TEAM)}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ]
  return (
    <div>
      <DashNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className={commonStyles['header-box']}>
          <h1>Echipe</h1>
          <Button
            type="primary"
            onClick={showAddTeamModal}
            disabled={!userInfo?.role.authorities.includes(CONSTANTS.WRITE_TEAM)}
          >
            Adaugă Echipă
          </Button>
        </div>
        {userInfo?.role.authorities.includes(CONSTANTS.WRITE_TEAM) ? (
          <AddTeamModal isOpen={addTeamModalIsOpen} handleCancel={handleCancelAddTeamModal} />
        ) : null}
        {userInfo?.role.authorities.includes(CONSTANTS.WRITE_TEAM) ? (
          <EditTeamDataModal
            isOpen={editModalIsOpen}
            handleCancel={handleCancelEditModal}
            team={team}
            triggerRerender={toggle}
          />
        ) : null}
        <Table columns={columns} dataSource={teams} />
      </Content>
    </div>
  )
}

export default Teams
