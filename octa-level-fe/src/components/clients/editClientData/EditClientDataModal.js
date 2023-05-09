import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as CONSTANTS from './../../../GlobalConstants'

import { Form, Input, Button, Modal, Popconfirm } from 'antd'
import { deleteClient, updateClient } from 'redux/client/ClientActions'

import { storage } from './../../../firebase'
import { ref, deleteObject } from 'firebase/storage'

import styles from 'components/clients/editClientData/EditClientDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const EditClientDataModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(props.offer.offersUploaded)
    form.setFieldsValue({
      name: props.client.name,
      phone: props.client.phone,
      address: props.client.address,
    })
  }, [props.client, props.triggerRerender])

  const handleSubmit = values => {
    if (props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_CLIENT)) {
      dispatch(updateClient(values, props.client._id))
    }

    handleCancel()
  }

  const handleCancel = () => {
    props.handleCancel()
    form.resetFields()
  }

  const deleteClientHandler = () => {
    const offersDocToDelete = props.offer.offersUploaded

    if (props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_CLIENT)) {
      dispatch(deleteClient(props.client._id)).then(response => {
        if (response === 'success') {
          if (offersDocToDelete.length > 0) {
            console.log('suntem la sters')
            offersDocToDelete.map(file => {
              const refStorage = ref(storage, file.location)
              deleteObject(refStorage)
            })
          }
        }
      })

      handleCancel()
    }
  }

  return (
    <>
      <Modal
        onOk={form.submit}
        open={props.isOpen}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: !props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_ASSESSMENT),
        }}
        centered
      >
        <div className={styles['edit-modal-subtitle-box']}>
          <div>
            <h1 className={styles['edit-modal-heading']}>Editează client</h1>
          </div>
          <Popconfirm
            title="Sunteți sigur că doriți să ștergeți clientul?"
            onConfirm={deleteClientHandler}
            okText="Da"
            cancelText="Nu"
          >
            <Button
              type="primary"
              disabled={!props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_CLIENT)}
              danger
            >
              Șterge Client
            </Button>
          </Popconfirm>
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Nume" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Telefon" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Adresă" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditClientDataModal
