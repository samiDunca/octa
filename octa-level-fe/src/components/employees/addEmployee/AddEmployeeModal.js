import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Modal, Select } from 'antd'

import { addNewEmployee } from 'redux/employee/EmployeeActions'

import styles from 'components/employees/addEmployee/AddEmployeeModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { Option } from 'antd/es/mentions'

const AddEmployeeModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const roles = useSelector(state => state.role.roles)

  // console.log(roles)

  const handleSubmit = values => {
    let newObject = {}
    for (let key in values) {
      if (values.hasOwnProperty(key) && values[key] !== undefined) {
        newObject[key] = values[key]
      }
    }
    dispatch(addNewEmployee(values))
    console.log(newObject)

    form.resetFields()
    props.handleCancel()
  }

  const handleCancel = () => {
    props.handleCancel()
  }

  // nume, prenume, email, adresă, telefon, rol

  return (
    <>
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel}>
        <h1 className={commonStyles['modal-heading']}>Angajat nou</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Input.Group className={styles['two-columns-box']}>
            <Input.Group>
              <span>Nume</span>
              <Form.Item name="lastName">
                <Input />
              </Form.Item>
            </Input.Group>
            <Input.Group>
              <span>Prenume</span>
              <Form.Item name="firstName">
                <Input />
              </Form.Item>
            </Input.Group>
          </Input.Group>
          <Input.Group className={styles['two-columns-box']}>
            <Input.Group>
              <span>Email</span>
              <Form.Item name="email">
                <Input />
              </Form.Item>
            </Input.Group>
            <Input.Group>
              <span>Telefon</span>
              <Form.Item name="phone">
                <Input />
              </Form.Item>
            </Input.Group>
          </Input.Group>
          <Input.Group>
            <span>Adresă</span>
            <Form.Item name="address">
              <Input />
            </Form.Item>
          </Input.Group>
          <Input.Group>
            <span>Rol</span>
            <Form.Item name="role">
              <Select placeholder="Selectează un rol">
                {roles.map(el => (
                  <Option key={el._id} value={el._id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form>
      </Modal>
    </>
  )
}

export default AddEmployeeModal
