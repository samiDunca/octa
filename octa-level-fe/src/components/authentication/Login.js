import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import CONSTANTS from 'constants/GlobalConstants'
import AUTHENTICATION_CONSTANTS from 'constants/AuthenticationConstants'

import useInput from 'hooks/useInput'
import { userLogin } from 'redux/authentication/LoginActions'

import commonAuthStyles from 'sharedStyles/Authentication.module.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  useEffect(() => {
    if (error) {
      document.getElementById('loginErrMsg').innerText = error
    }
  }, [error])

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
  }, 'loginErrMsg')

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    isValue: passwordFieldNotEmpty,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(value => {
    if (value.length >= 6) return 'isValid'
    else if (value.length == 0) return 'notCompleted'
    else return 'hasError'
  }, 'loginErrMsg')

  const submitHandler = event => {
    event.preventDefault()
    const errorMessageField = document.getElementById('loginErrMsg')

    if (passwordFieldNotEmpty || emailFieldNotEmpty) {
      return (errorMessageField.innerText = '* The fields are mandatory')
    } else if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return (errorMessageField.innerText = '* Email or password is incorrect')
    } else if (enteredEmailIsValid && enteredPasswordIsValid) {
      dispatch(userLogin({ enteredEmail, enteredPassword, navigate }))
      resetEmailInput()
      resetPasswordInput()
      // return
    }
    return
  }

  const forgotPasswordHandler = () => {
    window.location = '/forgot-password'
  }

  const emailInputClasses = emailInputHasError ? commonAuthStyles.invalid : commonAuthStyles.input
  const passwordInputClasses = passwordInputHasError
    ? commonAuthStyles.invalid
    : commonAuthStyles.input

  return (
    <div className={commonAuthStyles['authentication-container']}>
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
      <form className={commonAuthStyles['form-login']}>
        <h3 className={commonAuthStyles.heading}>{CONSTANTS.LOGIN}</h3>
        <label className={commonAuthStyles.label}>{AUTHENTICATION_CONSTANTS.EMAIL_RO}</label>
        <input
          id="loginEmail"
          placeholder="Email"
          className={emailInputClasses}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></input>
        <label className={commonAuthStyles.label}>{AUTHENTICATION_CONSTANTS.PASSWORD_RO}</label>
        <input
          id="loginPassword"
          type="password"
          placeholder="Password"
          className={passwordInputClasses}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></input>

        <div className={commonAuthStyles['submit-box']}>
          <span id="loginErrMsg" className={commonAuthStyles.error}>
            &nbsp;
          </span>
          <button className={commonAuthStyles.button} onClick={submitHandler}>
            {CONSTANTS.LOGIN}
          </button>
        </div>

        <div className={commonAuthStyles['back-and-forth-page-link-btn']}>
          <button type="button" onClick={() => navigate('/forgot-password')}>
            {AUTHENTICATION_CONSTANTS.RESET_PASSWORD_PAGE_RO}
            <span className={commonAuthStyles['login-btn-span']}> &rarr;</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
