import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input, Modal, Button, DatePicker, Popconfirm } from 'antd'
import dayjs from 'dayjs'

import { deleteOrder, updateOrder } from 'redux/order/OrderActions'
import { updateMontage } from 'redux/montage/MontageActions'
import { updateOffer } from 'redux/offer/OfferActions'
import { formatDate } from 'components/usefullComponents/dateUtils'

import styles from 'components/orders/editOrderData/EditOrderDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

// import { addNewOrder } from 'redux/order/OrderActions'

const EditOrderDataModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(props.record.order?.date),
      DEM: dayjs(props.record.montage?.DEM),
      comment: props.record.order?.comment,
    })
    console.log('useEffect Edit Order Data Modal')
  }, [props.triggerRerender])

  const handleSubmit = values => {
    console.log(values)
    const DEM = new Date(values.DEM)
    const date = new Date(values.date)
    const orderUpdateObj = {
      date,
      comment: values.comment,
    }

    const montageUpdateObj = {
      DEM,
    }

    // 2 dispatched:
    // b. update montage (DEM)
    dispatch(updateMontage(montageUpdateObj, props.record?.montage._id))

    // a. update order (date, comment)
    dispatch(updateOrder(orderUpdateObj, props.record?.order._id))

    props.handleCancel()
    form.resetFields()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  const deleteOrderHandler = () => {
    // the following updateOffer is now made in the delete request
    // offer field "orderIsPlaced" is set back to false

    dispatch(deleteOrder(props.record?.order._id))
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
          <Popconfirm
            title="Sunteți sigur că doriți să anulați comanda?"
            onConfirm={deleteOrderHandler}
            okText="Da"
            cancelText="Nu"
          >
            <Button type="primary" danger>
              Anulează Comanda
            </Button>
          </Popconfirm>
        </div>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Input.Group className={styles['dates-container']}>
            <Form.Item
              name="date"
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  Data:
                </label>
              }
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="DEM"
              label={
                <label className={styles['input-label']} style={{ fontSize: '17px' }}>
                  DEM:
                </label>
              }
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Input.Group>
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

export default EditOrderDataModal
