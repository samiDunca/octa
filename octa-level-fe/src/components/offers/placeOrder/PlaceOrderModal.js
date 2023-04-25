import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Modal, InputNumber, DatePicker } from 'antd'

import styles from 'components/offers/placeOrder/PlaceOrderModal.module.css'
import { addNewOrder } from 'redux/order/OrderActions'
import { updateOffer } from 'redux/offer/OfferActions'

const PlaceOrderModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let orderPlaced

  const handleSubmit = values => {
    orderPlaced = true
    const { DEM, paid, price } = values

    const dateEstimateMontage = new Date(DEM)

    const newOrder = {
      clientId: props.record.client._id,
      DEM: dateEstimateMontage,
      payment: {
        price,
        paid,
      },
    }

    const offerUpdatesObj = {
      orderIsPlaced: orderPlaced,
    }

    console.log({ newOrder })

    // 2 dispatches:
    // a. Add Order
    dispatch(addNewOrder(newOrder))
    // b. update the offer setting the "orderIsPlaced" field to true
    dispatch(updateOffer(offerUpdatesObj, props.record?.offer._id))

    props.handleCancel(orderPlaced, props?.record)
    form.resetFields()
    navigate('/orders')
  }

  const handleCancel = () => {
    form.resetFields()
    orderPlaced = false
    console.log(props.record?.client._id)
    props.handleCancel(orderPlaced, props?.record)
  }

  return (
    <>
      <Modal
        onCancel={handleCancel}
        onOk={form.submit}
        open={props.isOpen}
        okText="Generează"
        cancelText="Anulează"
        width={450}
      >
        <h1 className={styles['modal-heading']}>Comandă Fermă</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className={styles['guide-heading-box']}>
            <h3>Introduceți date pentru următoarea comanda</h3>
            <span />
            <h5>({props.record.client?.name})</h5>
          </div>

          <Input.Group className={styles['payment-box']}>
            <Form.Item
              name="price"
              label={
                <label className={styles['price-label']} style={{ fontSize: '17px' }}>
                  Preț
                </label>
              }
              rules={[
                {
                  validator(rule, value) {
                    return new Promise((resolve, reject) => {
                      if (value == undefined) {
                        reject('câmp obligatoriu')
                      } else if (value >= 0) {
                        resolve()
                      } else {
                        reject('valoare negativa')
                      }
                    })
                  },
                },
              ]}
            >
              <InputNumber style={{ width: '130px' }} />
            </Form.Item>
            <Form.Item
              name="paid"
              label={
                <label className={styles['price-label']} style={{ fontSize: '17px' }}>
                  Achitat
                </label>
              }
              rules={[
                {
                  validator(rule, value) {
                    const price = form.getFieldValue('price')
                    return new Promise((resolve, reject) => {
                      if (value == undefined) {
                        reject('câmp obligatoriu')
                      } else if (value > price) {
                        reject('avansul depășește prețul')
                      } else if (value >= 0) {
                        resolve()
                      } else {
                        reject('valoare negativa')
                      }
                    })
                  },
                },
              ]}
            >
              <InputNumber style={{ width: '130px' }} />
            </Form.Item>
          </Input.Group>
          <Input.Group className={styles['price-box']}>
            <Form.Item
              name="DEM"
              label={
                <label className={styles['date-label']} style={{ fontSize: '17px' }}>
                  DEM
                </label>
              }
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Input.Group>
        </Form>
      </Modal>
    </>
  )
}

export default PlaceOrderModal
