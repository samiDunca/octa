import zxcvbn from 'zxcvbn'
import 'bootstrap/dist/css/bootstrap.min.css'

import commonAuthStyles from 'sharedStyles/Authentication.module.css'

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password)
  const num = (testResult.score * 100) / 4

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#e9ecefas'
      case 1:
        return '#EA1111'
      case 2:
        return '#FFAD00'
      case 3:
        return '#9bc158'
      case 4:
        return '#00b500'
      default:
        return '#FFAD00'
    }
  }

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
  })
  return (
    <>
      <div
        className={`progress ${commonAuthStyles['password-indicator']}`}
        style={{ height: '4px' }}
      >
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
    </>
  )
}

export default PasswordStrengthMeter
