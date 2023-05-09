import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input, Modal, Button, DatePicker, Select, Checkbox } from 'antd'
import dayjs from 'dayjs'

import { getAllTeams } from 'redux/team/TeamActions'
import { updateOrder } from 'redux/order/OrderActions'
import { updateMontage } from 'redux/montage/MontageActions'
import { formatDate } from 'components/usefullComponents/dateUtils'

import styles from 'components/montages/editMontageData/EditMontageDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

// import { addNewOrder } from 'redux/order/OrderActions'

const EditMontageDataModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const teams = useSelector(state => state.team.teams)

  useEffect(() => {
    console.log(props.record.door?.delivered)
    form.setFieldsValue({
      team: props.record.montage?.team?.name,
      DEM: dayjs(props.record.montage?.DEM),
      comment: props.record.montage?.comment,
      mounted: props.record.door?.delivered ? props.record.montage?.mounted : false,
    })

    dispatch(getAllTeams())
  }, [props.triggerRerender])

  const handleSubmit = values => {
    const teamsCopy = [...teams]
    const objectForUpdate = {}

    if (values.DEM !== undefined) objectForUpdate['DEM'] = new Date(values.DEM)
    if (values.comment !== undefined) objectForUpdate['comment'] = values.comment
    if (values.mounted !== undefined) objectForUpdate['mounted'] = values.mounted

    let teamName = teamsCopy.filter(el => el.name === values.team)
    let teamId = teamsCopy.filter(el => el._id === values.team)

    if (teamName.length > 0) {
      // daca value din Select.Option ii numele echipei, transformam numele in id pt update
      objectForUpdate['team'] = props.record.montage?.team._id
    }

    if (teamId.length > 0) {
      objectForUpdate['team'] = values.team
    }

    console.log(objectForUpdate)
    // 2 dispatched:
    // b. update montage (DEM)
    dispatch(updateMontage(objectForUpdate, props.record?.montage._id))

    // a. update order (date, comment)
    // dispatch(updateOrder(orderUpdateObj, props.record?.order._id))

    props.handleCancel()
    form.resetFields()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  return (
    <>
      <Modal
        onCancel={handleCancel}
        onOk={form.submit}
        open={props.isOpen}
        okText="Salvează"
        cancelText="Anulează"
        width={400}
      >
        <div className={styles['edit-modal-subtitle-box']}>
          <div>
            <h1 className={styles['edit-modal-heading']}>Editează</h1>
            <h4>Client: ({props.record.client?.name})</h4>
          </div>
        </div>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Input.Group className={styles['dates-container']}>
            <Form.Item
              name="team"
              className={styles['select-team-input']}
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  Echipa:
                </label>
              }
            >
              <Select placeholder="Selecteaza o echipă">
                {teams?.map(team => (
                  <Select.Option key={team?._id} value={team?._id}>
                    {team?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="DEM"
              className={styles['select-team-input']}
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  DEM:
                </label>
              }
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Input.Group>
          <Form.Item name="mounted" valuePropName="checked" style={{ fontWeight: 'bold' }}>
            <Checkbox disabled={!props.record.door?.delivered}>Montat</Checkbox>
          </Form.Item>
          <Form.Item
            name="comment"
            label={
              <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                Observații
              </label>
            }
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditMontageDataModal
