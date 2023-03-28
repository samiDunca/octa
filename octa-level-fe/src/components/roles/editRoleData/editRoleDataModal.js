import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Input, Modal, Switch } from 'antd'

import { deleteRoleById, updateRoleById } from 'redux/role/RoleActions'

import styles from 'components/roles/editRoleData/EditRoleDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import Item from 'antd/es/list/Item'

const EditRoleDataModal = props => {
  const [form] = Form.useForm()
  const [roleId, setRoleId] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(props.oneRole)
    let arrayAuth = props.oneRole?.authorities

    let auth = arrayAuth?.reduce((acc, val) => {
      acc[val] = val
      return acc
    }, {})

    form.setFieldsValue({
      name: props.oneRole?.name,
      READ_EMPLOYEE: auth?.READ_EMPLOYEE,
      WRITE_EMPLOYEE: auth?.WRITE_EMPLOYEE,
      READ_ASSESSMENT: auth?.READ_ASSESSMENT,
      WRITE_ASSESSMENT: auth?.WRITE_ASSESSMENT,
      READ_OFFER: auth?.READ_OFFER,
      WRITE_OFFER: auth?.WRITE_OFFER,
      READ_ORDER: auth?.READ_ORDER,
      WRITE_ORDER: auth?.WRITE_ORDER,
      READ_MONTAGE: auth?.READ_MONTAGE,
      WRITE_MONTAGE: auth?.WRITE_MONTAGE,
      READ_CLIENT: auth?.READ_CLIENT,
      WRITE_CLIENT: auth?.WRITE_CLIENT,
      READ_REPORT: auth?.READ_REPORT,
    })

    setRoleId(props.oneRole._id)
  }, [props.oneRole, props.triggerRerender])

  const handleSubmit = values => {
    console.log(values)
    let { name, ...justTheAuthoritiesObj } = values
    let arrayOfAuthorities = Object.keys(justTheAuthoritiesObj).filter(
      key => justTheAuthoritiesObj[key] === true || justTheAuthoritiesObj[key] === `${key}`,
    )
    let finalObject = { name, authorities: arrayOfAuthorities }
    // console.log(finalObject)

    dispatch(updateRoleById(finalObject, roleId))

    props.handleCancel()
    // form.resetFields()
  }

  const handleCancel = () => {
    // form.resetFields()
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

  const deleteRoleHandler = () => {
    if (roleId !== '') dispatch(deleteRoleById(roleId))
    props.handleCancel()
  }

  return (
    <>
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel} width={800}>
        <div className={commonStyles['style-role-modal']}>
          {/* <div> */}
          <h1 className={commonStyles['modal-heading']}>Editează Rol </h1>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Input.Group className={styles['role-name-and-delete-btn-box']}>
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
                <Input style={{ width: '23rem' }} />
              </Form.Item>
              <Button type="primary" danger onClick={deleteRoleHandler}>
                Șterge Rol
              </Button>
            </Input.Group>
            <h3>Autorități</h3>
            <Input.Group className={styles['options-container']}>
              <Input.Group className={styles['options-box']}>
                <span>READ_EMPLOYEE: </span>
                <Form.Item
                  name="READ_EMPLOYEE"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch onClick={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>WRITE_EMPLOYEE: </span>
                <Form.Item
                  name="WRITE_EMPLOYEE"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch onClick={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>READ_ASSESSMENT: </span>
                <Form.Item
                  name="READ_ASSESSMENT"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="READ_ASSESSMENT" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>WRITE_ASSESSMENT: </span>
                <Form.Item
                  name="WRITE_ASSESSMENT"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="WRITE_ASSESSMENT" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>READ_OFFER: </span>
                <Form.Item
                  name="READ_OFFER"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="READ_OFFER" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>WRITE_OFFER: </span>
                <Form.Item
                  name="WRITE_OFFER"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="WRITE_OFFER" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>READ_ORDER: </span>
                <Form.Item
                  name="READ_ORDER"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="READ_ORDER" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>WRITE_ORDER: </span>
                <Form.Item
                  name="WRITE_ORDER"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="WRITE_ORDER" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>READ_MONTAGE: </span>
                <Form.Item
                  name="READ_MONTAGE"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch id="READ_MONTAGE" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>WRITE_MONTAGE: </span>
                <Form.Item
                  name="WRITE_MONTAGE"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch name="WRITE_MONTAGE" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>READ_CLIENT: </span>
                <Form.Item
                  name="READ_CLIENT"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch name="READ_CLIENT" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>WRITE_CLIENT: </span>
                <Form.Item
                  name="WRITE_CLIENT"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch name="WRITE_CLIENT" onChange={onChange} />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles['options-box']}>
                <span>READ_REPORT: </span>
                <Form.Item
                  name="READ_REPORT"
                  className={styles['form-item']}
                  valuePropName="checked"
                >
                  <Switch name="READ_REPORT" onChange={onChange} />
                </Form.Item>
              </Input.Group>
            </Input.Group>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default EditRoleDataModal
