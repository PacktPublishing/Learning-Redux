import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

import appReducer from './reducers'
import { createUser, createPost } from './actions'
import App from './components/App.jsx'

let store = createStore(appReducer)

// create users
store.dispatch(createUser('dan', 'Daniel Bugl'))
store.dispatch(createUser('max', 'Max Mustermann'))

// create posts
store.dispatch(createPost('dan', {
  title: 'First post',
  text: 'Hello world! This is the first blog post.',
  category: 'welcome',
}))
store.dispatch(createPost('max', {
  title: 'Another test',
  text: 'This is another test blog post.',
  category: 'test',
}))

console.log('initial state:', store.getState())
store.subscribe(() =>
  console.log('state changed:', store.getState())
)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

