import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Modal, Switch } from 'antd'

import { addNewRole } from 'redux/role/RoleActions'

import styles from 'components/roles/addRole/AddRoleModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const AddRoleModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = values => {
    let { name, ...justTheAuthoritiesObj } = values
    let arrayOfAuthorities = Object.keys(justTheAuthoritiesObj).filter(
      key => justTheAuthoritiesObj[key] === true,
    )
    let finalObject = { name, authorities: arrayOfAuthorities }
    console.log(finalObject)

    dispatch(addNewRole(finalObject))

    form.resetFields()
    props.handleCancel()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  const onChange = (checked, event) => {
    let htmlTag = event.target
    let authoritieName
    htmlTag.localName === 'button'
      ? (authoritieName = htmlTag.offsetParent.innerText)
      : (authoritieName = htmlTag.offsetParent.offsetParent.innerText)
    let authoritieFinalVersion = authoritieName.slice(0, -1)

    form.setFieldsValue({
      [`${authoritieFinalVersion}`]: checked,
    })
  }

  return (
    <>
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel} width={800}>
        <div className={commonStyles['style-role-modal']}>
          {/* <div> */}
          <h1 className={commonStyles['modal-heading']}>Rol nou</h1>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="name"
              label={
                <label style={{ color: '#333', fontSize: '2rem', fontWeight: 'bold' }}>
                  Username
                </label>
              }
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {/* <span className={styles.categories}>* Nume</span> */}
              <Input className={styles['role-input-width']} />
              {/* <label>Nume</label> */}
            </Form.Item>
            <h3>Autorități</h3>
            <Input.Group className={styles['options-container']}>
              <Form.Item name="READ_EMPLOYEE" valuePropName="checked" labelAlign="right">
                <div className={styles['options-box']}>
                  <span>READ_EMPLOYEE: </span>
                  <Switch onClick={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="WRITE_EMPLOYEE" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>WRITE_EMPLOYEE: </span>
                  <Switch name="WRITE_EMPLOYEE" onClick={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="READ_ASSESSMENT" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>READ_ASSESSMENT: </span>
                  <Switch id="READ_ASSESSMENT" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="WRITE_ASSESSMENT" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>WRITE_ASSESSMENT: </span>
                  <Switch id="WRITE_ASSESSMENT" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="READ_OFFER" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>READ_OFFER: </span>
                  <Switch id="READ_OFFER" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="WRITE_OFFER" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>WRITE_OFFER: </span>
                  <Switch id="WRITE_OFFER" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="READ_ORDER" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>READ_ORDER: </span>
                  <Switch id="READ_ORDER" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="WRITE_ORDER" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>WRITE_ORDER: </span>
                  <Switch id="WRITE_ORDER" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="READ_MONTAGE" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>READ_MONTAGE: </span>
                  <Switch id="READ_MONTAGE" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="WRITE_MONTAGE" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>WRITE_MONTAGE: </span>
                  <Switch name="WRITE_MONTAGE" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="READ_CLIENT" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>READ_CLIENT: </span>
                  <Switch name="READ_CLIENT" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="WRITE_CLIENT" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>WRITE_CLIENT: </span>
                  <Switch name="WRITE_CLIENT" onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item name="READ_REPORT" valuePropName="checked">
                <div className={styles['options-box']}>
                  <span>READ_REPORT: </span>
                  <Switch name="READ_REPORT" onChange={onChange} />
                </div>
              </Form.Item>
            </Input.Group>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default AddRoleModal
