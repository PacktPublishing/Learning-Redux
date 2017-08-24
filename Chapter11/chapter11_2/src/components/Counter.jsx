import React from 'react'

const Counter = ({ count, increment, decrement, reset, undo, redo }) =>
  <span>
    <b>Counter:</b> {count}
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={reset}>reset</button>
    {' '}
    <button onClick={undo}>undo</button>
    {' '}
    <button onClick={redo}>redo</button>
  </span>

export default Counter
