import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'

import commonAuthStyles from 'sharedStyles/Authentication.module.css'
import { setPassword } from 'redux/authentication/(re)setPassword/SetPasswordAction'

const SetNewPassword = () => {
  const [form] = Form.useForm()
  const params = useParams()
  const dispatch = useDispatch()

  const handleSubmit = values => {
    console.log('Received values of form: ', values)
    const token = params.token
    values['token'] = token
    dispatch(setPassword(values))
  }

  return (
    <div className={commonAuthStyles['authentication-container']}>
      <img
        alt="octaLogo"
        className={commonAuthStyles['octaLogoImage']}
        src={require('assets/pictures/officialLogo.png')}
      />
      <Form
        form={form}
        className={commonAuthStyles.form}
        name="set-password"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label={
            <label style={{ color: '#c7c1c1', fontSize: '2rem', fontWeight: 'bold' }}>
              (re)Setează Parola
            </label>
          }
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label={
            <label style={{ color: '#c7c1c1', fontSize: '2rem', fontWeight: 'bold' }}>
              Confirmă Parola
            </label>
          }
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <button className={commonAuthStyles.button} type="submit">
            Setează Parola
          </button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SetNewPassword
