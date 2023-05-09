import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as CONSTANTS from './../../../GlobalConstants'

import { Form, Input, Modal, DatePicker, Select, InputNumber, Checkbox } from 'antd'
import dayjs from 'dayjs'

import { updateMontage } from 'redux/montage/MontageActions'
import { updateDoor } from 'redux/door/DoorActions'
import { formatDate } from 'components/usefullComponents/dateUtils'

import styles from 'components/doors/editDoorData/EditDoorDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { updateAssessment } from 'redux/assessment/AssessmentActions'

// import { addNewOrder } from 'redux/order/OrderActions'

const EditDoorDataModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('useEffect edit door data modal')
    form.setFieldsValue({
      provider: props.record.door?.provider,
      date: dayjs(props.record.door?.date),
      DEL: dayjs(props.record.door?.DEL),
      comment: props.record.door?.comment,
      quantity: props.record?.assessment?.quantity,
      delivered: props.record?.door?.delivered,
    })
  }, [props.triggerRerender])

  const handleSubmit = values => {
    console.log(values)
    // const teamsCopy = [...teams]
    const doorUpdateObj = {}
    const assessmentUpdateObj = {}

    if (values.DEL !== undefined) doorUpdateObj['DEL'] = new Date(values.DEL)
    if (values.date !== undefined) doorUpdateObj['date'] = new Date(values.date)
    if (values.provider !== undefined) doorUpdateObj['provider'] = values.provider
    if (values.comment !== undefined) doorUpdateObj['comment'] = values.comment
    if (values.delivered !== undefined) doorUpdateObj['delivered'] = values.delivered
    if (values.quantity !== undefined) assessmentUpdateObj['quantity'] = values.quantity

    // 2 dispatched:
    // a. update door
    dispatch(updateDoor(doorUpdateObj, props.record?.door._id))

    // b. update assessment (DEM)
    dispatch(updateAssessment(assessmentUpdateObj, props.record?.assessment._id))

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
        okButtonProps={{
          disabled: !props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_DOOR),
        }}
        // width={400}
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
              name="provider"
              className={styles['select-team-input']}
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  Furnizor:
                </label>
              }
            >
              <Select placeholder="Selecteaza un furnizor">
                <Select.Option key="1" value="Salamander System">
                  Salamander System
                </Select.Option>
                <Select.Option key="2" value="Smilo Holding">
                  Smilo Holding
                </Select.Option>
                <Select.Option key="3" value="Smilo Holding">
                  Alfa Doors
                </Select.Option>
                <Select.Option key="4" value="Vevor">
                  Vevor
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="quantity"
              className={styles['quantity-input']}
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  Cantitate:
                </label>
              }
            >
              <InputNumber />
            </Form.Item>
            {/* </Input.Group>
          <Input.Group className={styles['dates-container']}> */}
            <Form.Item
              name="date"
              className={styles['select-entry-date']}
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  Data intrare:
                </label>
              }
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="DEL"
              className={styles['select-DEL-date']}
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  DEL:
                </label>
              }
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Input.Group>
          <Form.Item name="delivered" valuePropName="checked" style={{ fontWeight: 'bold' }}>
            <Checkbox>Livrat</Checkbox>
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

export default EditDoorDataModal
