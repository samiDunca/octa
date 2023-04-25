import { useDispatch } from 'react-redux'

import { PropertySafetyFilled } from '@ant-design/icons'
import { Form, Input, Button, Modal, InputNumber } from 'antd'
import { addNewOffer } from 'redux/offer/OfferActions'

import styles from 'components/offers/uploadOffer/UploadOfferModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { updateAssessment } from 'redux/assessment/AssessmentActions'
import { deleteClient } from 'redux/client/ClientActions'

const UploadOfferModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleCancel = () => {
    props.handleCancel()
    form.resetFields()
  }

  const handleSubmit = values => {
    // props.handleCancel()
    form.resetFields()
  }

  const deleteClientHandler = () => {
    console.log(props.record)
    dispatch(deleteClient(props.record.client?._id))
    props.handleCancel()
  }
  return (
    <>
      <Modal
        onCancel={handleCancel}
        onOk={form.submit}
        open={props.isOpen}
        okText="Generează"
        cancelText="Anulează"
      >
        <h1 className={styles['modal-heading']}>Generează ofertă nouă</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <h3 className={styles['insert-guide-heading']}>
            Introduceți prețul pentru această ofertă
          </h3>
          <Input.Group className={styles['price-box']}>
            <Form.Item
              name="price"
              label={
                <label className={styles['price-label']} style={{ fontSize: '20px' }}>
                  Preț
                </label>
              }
              rules={[
                {
                  required: true,
                  message: 'câmp obligatoriu',
                },
              ]}
            >
              <InputNumber style={{ width: '120px' }} />
            </Form.Item>
            <span className={styles['euro-currency']}>/euros</span>
          </Input.Group>
          <Button type="primary" danger onClick={deleteClientHandler}>
            Șterge Client
          </Button>
        </Form>
      </Modal>
    </>
  )
}
export default UploadOfferModal
