import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Modal } from 'antd'

import { addNewAssessment } from 'redux/assessment/AssessmentActions'

import styles from 'components/assessments/addAssessment/AddAssessmentModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const AddAssessmentModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = values => {
    dispatch(addNewAssessment(values))
    form.resetFields()
    props.handleCancel()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  return (
    <>
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel}>
        {/* <div className={commonStyles['style-assesment-modal']}> */}
        <h1 className={styles['heading-new-assessment']}>Măsură nouă</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Nume"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefon">
            <Input placeholder="ex. +4058654072" />
          </Form.Item>
          <Form.Item name="address" label="Adresă">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
        {/* </div> */}
      </Modal>
    </>
  )
}

export default AddAssessmentModal
