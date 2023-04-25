import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Modal, InputNumber, Checkbox } from 'antd'

import { updateOrder } from 'redux/order/OrderActions'

import styles from 'components/orders/orderPayment/OrderPaymentModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'


const OrderPaymentModal = props => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({
      price: props.record.order?.price,
      paid: props.record.order?.paid,
      completePayment: props.record.order?.price === props.record.order?.paid,
    })
    console.log('useEffect payment Modal', checked)
  }, [props.triggerRerender])

  const handleSubmit = values => {
    let rest
    values.completePayment
      ? (rest = props.record.order?.price)
      : (rest = values.achitat + values.paid)

    console.log(rest)
    const objectForUpdate = {
      paid: rest,
    }
    dispatch(updateOrder(objectForUpdate, props.record?.order._id))
    props.handleCancel()
    form.resetFields()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  const handleCheckbox = checked => {
    setChecked(checked)
    if (checked) form.validateFields(['achitat'])
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
        <h1 className={commonStyles['modal-heading']}>Editează</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div style={{ marginBottom: '10px' }}>
            <h3>Client: ({props.record.client?.name})</h3>
          </div>
          <Form.Item
            name="price"
            label={
              <label className={styles['price-label']} style={{ fontSize: '17px' }}>
                Preț stabilit
              </label>
            }
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="paid"
            label={
              <label className={styles['paid-label']} style={{ fontSize: '17px' }}>
                Suma achitată până în prezent
              </label>
            }
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="achitat"
            label={
              <label className={styles['paid-label']} style={{ fontSize: '17px' }}>
                Achitat
              </label>
            }
            rules={[
              {
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    const price = form.getFieldValue('price')
                    const achitat = form.getFieldValue('paid')
                    const completePayment = form.getFieldValue('completePayment')
                    const finalValue = achitat + value
                    const fullyPaid = finalValue === price ? true : false
                    if (completePayment) {
                      resolve()
                    } else if (value === undefined) {
                      reject('câmp obligatoriu')
                    } else if (finalValue > price) {
                      reject('valoare incorectă')
                    } else if (finalValue <= price && value >= 0) {
                      resolve()
                    } else {
                      reject('valoare negativă')
                    }
                  })
                },
              },
            ]}
          >
            <InputNumber disabled={checked} />
          </Form.Item>
          <Form.Item name="completePayment" valuePropName="checked">
            <Checkbox
              className={styles['paid-label']}
              onChange={({ target }) => handleCheckbox(target.checked)}
            >
              Achitat Integral
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default OrderPaymentModal
