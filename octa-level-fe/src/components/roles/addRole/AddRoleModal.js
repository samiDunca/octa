import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Modal, Switch } from 'antd'

// import { addNewAssessment } from 'redux/assessment/AssessmentActions'

import styles from 'components/roles/addRole/AddRoleModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const tailLayout = {
  wrapperCol: {
    offset: 2,
    // span: ,
  },
}

const AddRoleModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = values => {
    // dispatch(addNewAssessment(values))
    form.resetFields()
    props.handleCancel()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  return (
    <>
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel} width={800}>
        {/* <div className={commonStyles['style-assesment-modal']}> */}
        <h1 className={styles['heading-new-assessment']}>Rol nou</h1>
        <Form form={form} onFinish={handleSubmit} layout="horizontal">
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
          <h3 className={styles.categories}>Autorități</h3>
          <Input.Group className={styles['options-container']}>
            <Form.Item label="READ_EMPLOYEE" valuePropName="checked" labelAlign="right">
              <Switch />
            </Form.Item>
            <Form.Item label="WRITE_EMPLOYEE" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="READ_ASSESSMENT" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="WRITE_ASSESSMENT" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="READ_OFFER" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="WRITE_OFFER" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="READ_ORDER" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="WRITE_ORDER" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="READ_MONTAGE" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="WRITE_MONTAGE" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="READ_CLIENT" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="WRITE_CLIENT" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
            <Form.Item label="READ_REPORT" valuePropName="checked" {...tailLayout}>
              <Switch />
            </Form.Item>
          </Input.Group>
        </Form>
        {/* </div> */}
      </Modal>
    </>
  )
}

export default AddRoleModal
