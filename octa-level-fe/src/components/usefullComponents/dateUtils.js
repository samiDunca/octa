export const formatDate = date => {
  const copyDate = new Date(date)
  const options = { day: '2-digit', month: 'long', year: 'numeric' }
  return copyDate.toLocaleDateString('en-US', options)
}
