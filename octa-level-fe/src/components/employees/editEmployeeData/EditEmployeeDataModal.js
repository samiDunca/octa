import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Modal, Select, Popconfirm } from 'antd'

import { deleteEmployeeById, updateEmployeeById } from 'redux/employee/EmployeeActions'

import styles from 'components/employees/editEmployeeData/EditEmployeeDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { Option } from 'antd/es/mentions'

const EditEmployeeDataModal = props => {
  const [form] = Form.useForm()
  const [employeeId, setEmployeeId] = useState('')
  const [roleId, setRoleId] = useState('')
  const dispatch = useDispatch()

  const roles = useSelector(state => state.role.roles)

  useEffect(() => {
    form.setFieldsValue({
      firstName: props.employee.firstName,
      lastName: props.employee.lastName,
      phone: props.employee.phone,
      email: props.employee.email,
      address: props.employee.address,
      role: props.employee.role?.name === undefined ? '' : props.employee.role?.name,
    })
    setEmployeeId(props.employee._id)
    setRoleId(props.employee.role?._id)
  }, [props?.employee, props.triggerRerender])

  const handleSubmit = values => {
    let newObject = {}
    for (let key in values) {
      if (values.hasOwnProperty(key) && values[key] !== undefined) {
        key === 'role' ? (newObject[key] = roleId) : (newObject[key] = values[key])
      }
    }
    dispatch(updateEmployeeById(newObject, employeeId))

    // form.resetFields()
    props.handleCancel()
  }

  const handleCancel = () => {
    // form.resetFields()
    props.handleCancel()
  }

  const deleteEmployeeHandler = () => {
    console.log('suntem in delete employee handler')
    dispatch(deleteEmployeeById(employeeId))
  }

  return (
    <>
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel} centered>
        <div className={styles['role-name-and-delete-btn-box']}>
          <h1 className={commonStyles['modal-heading']}>Editează angajatul</h1>
          <Popconfirm
            title="Sunteți sigur că doriți să ștergeți angajatul?"
            onConfirm={deleteEmployeeHandler}
            okText="Da"
            cancelText="Nu"
          >
            <Button type="primary" danger>
              Șterge angajatul
            </Button>
          </Popconfirm>
        </div>
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
              <Select placeholder="Selectează un rol" onChange={record => setRoleId(record)}>
                {roles.map(el => (
                  <Select.Option key={el._id} value={el._id}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form>
      </Modal>
    </>
  )
}

export default EditEmployeeDataModal
