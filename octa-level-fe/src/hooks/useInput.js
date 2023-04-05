import { useState } from 'react'

const useInput = (validateValue, id) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(enteredValue) === 'isValid' ? true : false

  const valueIsThere = validateValue(enteredValue) === 'notCompleted' ? true : false

  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value)
    document.getElementById(`${id}`).innerHTML = '&nbsp;'
  }

  const setInputWithPropsValues = props => {
    setEnteredValue(props)
  }

  const inputBlurHandler = event => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    isValue: valueIsThere,
    setInputWithPropsValues,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
}

export default useInput
