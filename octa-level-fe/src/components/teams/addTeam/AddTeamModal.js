import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Modal, Switch } from 'antd'

import { addNewTeam } from 'redux/team/TeamActions'
import { getAllEmployees } from 'redux/employee/EmployeeActions'

import styles from 'components/teams/addTeam/AddTeamModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const AddTeamModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [employeesFetched, setEmployeesFetched] = useState(false)

  const employees = useSelector(state => state.employee.employees)

  useEffect(() => {
    console.log('FALSE')
    if (props.isOpen && !employeesFetched) {
      console.log('TRUE')
      dispatch(getAllEmployees())
      setEmployeesFetched(true)
    }
  }, [props.isOpen, employeesFetched])

  const handleSubmit = values => {
    console.log(employees)

    let { name, ...justTheEmployeesObj } = values
    let arrayOfEmployees = Object.keys(justTheEmployeesObj).filter(
      key => justTheEmployeesObj[key] === true,
    )
    let finalObject = { name, employees: arrayOfEmployees }

    dispatch(addNewTeam(finalObject))

    form.resetFields()
    props.handleCancel()
  }

  const handleCancel = () => {
    form.resetFields()
    props.handleCancel()
  }

  const onChange = (checked, event) => {
    let htmlTag = event.target
    let employeeId
    htmlTag.localName === 'button'
      ? (employeeId = htmlTag.offsetParent.innerText)
      : (employeeId = htmlTag.offsetParent.offsetParent.innerText)
    let employeeFinalVersion = employeeId.slice(0, -1)

    form.setFieldsValue({
      [`${employeeFinalVersion}`]: checked,
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
            <h3>Angajați</h3>
            <Input.Group className={styles['options-container']}>
              {employees.map(el => {
                return (
                  <Input.Group key={el._id} className={styles['options-box']}>
                    <span>
                      {el.firstName} {el.lastName}
                    </span>
                    <Form.Item
                      name={`${el._id}`}
                      className={styles['form-item']}
                      valuePropName="checked"
                    >
                      <Switch onClick={onChange} />
                    </Form.Item>
                  </Input.Group>
                )
              })}
            </Input.Group>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default AddTeamModal
