import { useDispatch } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router'

import CONSTANTS from 'constants/GlobalConstants'
import AUTHENTICATION_CONSTANTS from 'constants/AuthenticationConstants'

import useInput from 'hooks/useInput'
import { setPassword } from 'redux/authentication/SetPasswordAction'
import PasswordStrengthMeter from 'components/usefullComponents/PasswordStrengthMeter'

import commonAuthStyles from 'sharedStyles/Authentication.module.css'

const SetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const pathContainsReset = location.pathname.split('/')[1].includes('reset')

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    isValue: passwordFieldNotEmpty,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordResetInput,
  } = useInput(value => {
    if (value.length >= 6) return 'isValid'
    else if (value.length == 0) return 'notCompleted'
    else return 'hasError'
  }, 'passwordSetErrMsg')

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    isValue: confirmPasswordFieldNotEmpty,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordResetInput,
  } = useInput(value => {
    if (value.length >= 6) return 'isValid'
    else if (value.length == 0) return 'notCompleted'
    else return 'hasError'
  }, 'passwordSetErrMsg')

  const submitFormHandler = event => {
    event.preventDefault()
    const errorMessageField = document.getElementById('passwordSetErrMsg')
    const token = params.token
    if (passwordFieldNotEmpty || confirmPasswordFieldNotEmpty) {
      return (errorMessageField.innerText = '*The fields are mandatory')
    } else if (!enteredPasswordIsValid || !enteredConfirmPasswordIsValid) {
      return (errorMessageField.innerText = '* Entered password is not valid')
    } else if (enteredPassword !== enteredConfirmPassword) {
      return (errorMessageField.innerText = '* Passwords are not the same')
    } else if (enteredPassword === enteredConfirmPassword) {
      errorMessageField.innerText = '* Passwords are the same'
      // credentials['password'] = enteredPassword
      dispatch(setPassword({ password: enteredPassword, token, navigate }))
      passwordResetInput()
      confirmPasswordResetInput()
    }
    return
  }

  const passwordInputClasses = passwordInputHasError
    ? commonAuthStyles.invalid
    : commonAuthStyles.input
  const confirmPasswordInputClasses = confirmPasswordInputHasError
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
      <form className={commonAuthStyles['form-set-pass']}>
        <h3 className={commonAuthStyles.heading}>
          {pathContainsReset
            ? AUTHENTICATION_CONSTANTS.RESET_PASSWORD_RO
            : AUTHENTICATION_CONSTANTS.SET_PASSWORD_RO}
        </h3>

        <label className={commonAuthStyles.label}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="6 char minimum"
          className={`${passwordInputClasses} ${commonAuthStyles['margin-password-indicator']}`}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></input>

        <PasswordStrengthMeter password={enteredPassword} />
        <label className={commonAuthStyles.label}>Confirm Password </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder=". . ."
          className={confirmPasswordInputClasses}
          value={enteredConfirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
        ></input>

        <div className={commonAuthStyles['submit-box']}>
          <span id="passwordSetErrMsg" className={commonAuthStyles.error}>
            &nbsp;
          </span>
          <button className={commonAuthStyles.button} onClick={submitFormHandler}>
            {CONSTANTS.SUBMIT}
          </button>
          <div className={commonAuthStyles['back-and-forth-page-link-btn']}>
            <button type="button" onClick={() => navigate('/login')}>
              LOGHEAZĂ-TE CU NOUA PAROLĂ
              <span className={commonAuthStyles['login-btn-span']}> &rarr;</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SetPassword
