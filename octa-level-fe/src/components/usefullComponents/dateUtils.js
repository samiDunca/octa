export const formatDate = dateString => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
  const offsetMinutes = -date.getTimezoneOffset()
  const offsetHours = Math.floor(offsetMinutes / 60)
  const offsetMinutesRemainder = offsetMinutes % 60
  const offsetString = `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(
    2,
    '0',
  )}:${String(Math.abs(offsetMinutesRemainder)).padStart(2, '0')}`

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetString}`
}
