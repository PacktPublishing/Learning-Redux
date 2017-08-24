import React from 'react'

const ErrorMessage = ({ message }) =>
  message
    ? <span style={{ color: 'red' }}>Error: {message}</span>
    : null

export default ErrorMessage
