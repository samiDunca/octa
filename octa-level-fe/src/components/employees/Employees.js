import DashNav from 'components/navigation/DashNav'
import React from 'react'
import { useState } from 'react'
import { Layout, Modal, Button, Form } from 'antd'
import Input from 'rc-input'
const { Content } = Layout

const MyFormItemContext = React.createContext([])
function toArr(str) {
  return Array.isArray(str) ? str : [str]
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext)
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix])
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>
}
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext)
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined
  return <Form.Item name={concatName} {...props} />
}

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = value => {
    console.log(value)
  }

  const onFinish = value => {
    console.log(value)
  }
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  return (
    <div>
      <DashNav />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <h1>Employees</h1>
      </Content>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
        {/* <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="customizeGender"
            label="Customize Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form> */}
        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
          <MyFormItemGroup prefix={['user']}>
            <MyFormItemGroup prefix={['name']}>
              <MyFormItem name="firstName" label="First Name">
                <Input />
              </MyFormItem>
              <MyFormItem name="lastName" label="Last Name">
                <Input />
              </MyFormItem>
            </MyFormItemGroup>

            <MyFormItem name="age" label="Age">
              <Input />
            </MyFormItem>
          </MyFormItemGroup>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default Employees
