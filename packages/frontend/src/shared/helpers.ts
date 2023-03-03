export const getTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000)
}

export const convertUnixToDatetime = (unix: any) => {
  const date = new Date(unix * 1000)
  // Hours part from the timestamp
  const hours = date.getHours()
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes()
  // Seconds part from the timestamp
  const seconds = '0' + date.getSeconds()
  // Will display time in 10:30:23 format
  const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  return formattedTime
}
