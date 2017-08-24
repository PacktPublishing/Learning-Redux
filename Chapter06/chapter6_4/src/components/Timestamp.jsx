import React from 'react'

const Timestamp = ({ data }) => {
  const d = new Date(data)
  return <span>{d.toUTCString()}</span>
}

export default Timestamp

