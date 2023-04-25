import { useDispatch } from 'react-redux'

// import { PropertySafetyFilled } from '@ant-design/icons'
import { Form, Input, Button, Modal, InputNumber } from 'antd'
import { updateOffer } from 'redux/offer/OfferActions'
// import { updateAssessment } from 'redux/assessment/AssessmentActions'

import styles from 'components/offers/addComment/AddCommentModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { useEffect } from 'react'

const AddCommentModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(props.record)
    form.setFieldsValue({
      comment: props?.record.offer?.comment,
    })
  }, [props?.record.offer, props.triggerRerender])

  const handleCancel = () => {
    props.handleCancel()
    form.resetFields()
  }

  const handleSubmit = values => {
    console.log(values)
    dispatch(updateOffer(values, props?.record.offer._id))

    props.handleCancel()
    form.resetFields()
  }
  return (
    <>
      <Modal
        onCancel={handleCancel}
        onOk={form.submit}
        open={props.isOpen}
        okText="Salvează"
        cancelText="Anulează"
      >
        <h1 className={styles['modal-heading']}>Observatii</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className={styles['guide-heading-box']}>
            <h3>Adaugati observații pentru această ofertă</h3>
            <span />
            <h5>({props?.record.client?.name})</h5>
          </div>
          <Input.Group>
            <Form.Item
              name="comment"
              label={
                <label className={styles['comment-label']} style={{ fontSize: '20px' }}>
                  Observatii
                </label>
              }
              rules={[
                {
                  required: true,
                  message: 'câmp obligatoriu',
                },
              ]}
            >
              {/* <Input.TextArea style={{ width: '120px' }} /> */}
              <Input.TextArea />
            </Form.Item>
          </Input.Group>
        </Form>
      </Modal>
    </>
  )
}
export default AddCommentModal
