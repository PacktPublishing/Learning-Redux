import React from 'react'

const ErrorMessage = ({ message }) =>
  message
    ? <div style={{ color: 'red' }}>Error: {message}</div>
    : null

export default ErrorMessage
