import React from 'react'

const Counter = ({ count, increment, decrement, reset }) =>
  <span>
    <b>Counter:</b> {count}
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={reset}>reset</button>
  </span>

export default Counter
