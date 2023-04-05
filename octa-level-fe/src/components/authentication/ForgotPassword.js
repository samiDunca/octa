import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Button, message } from 'antd'

import AUTHENTICATION_CONSTANTS from 'constants/AuthenticationConstants'

import useInput from 'hooks/useInput'
import { forgotPassword } from 'redux/authentication/SetPasswordAction'

import commonAuthStyles from 'sharedStyles/Authentication.module.css'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const authState = useSelector(state => state.auth)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: AUTHENTICATION_CONSTANTS.VERIFY_EMAIL_RO,
    })
  }

  // success()
  useEffect(() => {
    if (authState.error) {
      document.getElementById('forgotErrMsg').innerText =
        AUTHENTICATION_CONSTANTS.EMAIL_NOT_FOUND_RO
    }
    console.log('Forgot passwor useEffect')
    if (authState.message) {
      success()
    }
  }, [authState.error, authState.message])

  const {
    value: enteredEmail,

    isValid: enteredEmailIsValid,

    isValue: emailFieldNotEmpty,

    hasError: emailInputHasError,

    valueChangeHandler: emailChangeHandler,

    inputBlurHandler: emailBlurHandler,

    reset: resetEmailInput,
  } = useInput(value => {
    if (value.includes('@')) return 'isValid'
    else if (value.length == 0) return 'notCompleted'
    else return 'hasError'
  }, 'forgotErrMsg')

  const submitHandler = event => {
    event.preventDefault()
    const errorMessageField = document.getElementById('forgotErrMsg')

    if (emailFieldNotEmpty) {
      return (errorMessageField.innerText = '* The field is mandatory')
    } else if (!enteredEmailIsValid) {
      return (errorMessageField.innerText = '* Email is incorrect')
    } else if (enteredEmailIsValid) {
      errorMessageField.innerHTML = 'Loading...'
      dispatch(forgotPassword({ email: enteredEmail }))
      resetEmailInput()

      // return
    }

    return
  }

  const emailInputClasses = emailInputHasError ? commonAuthStyles.invalid : commonAuthStyles.input

  return (
    <div className={commonAuthStyles['authentication-container']}>
      {contextHolder}
      <img
        alt="octaLogo"
        className={commonAuthStyles['octaLogoImage']}
        src={require('assets/pictures/officialLogo.png')}
      />

      <img
        className={commonAuthStyles['styleWrittenLogo']}
        alt="octa written logo"
        src={require('assets/pictures/logo_written.png')}
      />

      <form className={commonAuthStyles['form-set-pass']}>
        <h3 className={commonAuthStyles.heading}>{AUTHENTICATION_CONSTANTS.RESET_PASSWORD_RO}</h3>
        <div style={{ marginTop: '2.9rem', display: 'flex', justifyContent: 'center' }}>
          <h3>{AUTHENTICATION_CONSTANTS.RESET_BY_EMAIL_MESSAGE_RO}</h3>
        </div>
        <label className={commonAuthStyles.label}>{AUTHENTICATION_CONSTANTS.EMAIL_RO}</label>
        <input
          id="loginEmail"
          placeholder="Email"
          className={emailInputClasses}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></input>

        <div className={commonAuthStyles['submit-box']}>
          <span id="forgotErrMsg" className={commonAuthStyles.error}>
            &nbsp;
          </span>
          <button className={commonAuthStyles.button} onClick={submitHandler}>
            {AUTHENTICATION_CONSTANTS.SEND_EMAIL_BTN_TEXT_RO}
          </button>
        </div>
        <div className={commonAuthStyles['back-and-forth-page-link-btn']}>
          <button type="button" onClick={() => navigate('/login')}>
            <span className={commonAuthStyles['reset-btn-span']}>&larr; </span>
            {AUTHENTICATION_CONSTANTS.PREVIOUS_PAGE_RO}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
