import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

import appReducer from './reducers'
import App from './components/App.jsx'

let store = createStore(appReducer)

console.log('initial state:', JSON.stringify(store.getState()))
store.subscribe(() =>
  console.log('state changed:', JSON.stringify(store.getState()))
)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
