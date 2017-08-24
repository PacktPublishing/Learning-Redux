import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './store'
import { createUser, createPost } from './actions'
import App from './components/App.jsx'
import DevTools from './containers/DevTools.jsx'

const store = configureStore()
const initialState = store.getState()

if (!initialState.users || initialState.users.length === 0) {
  // create users
  store.dispatch(createUser('dan', 'Daniel Bugl'))
  store.dispatch(createUser('max', 'Max Mustermann'))
}

if (!initialState.posts || initialState.posts.length === 0) {
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
}

console.log('initial state:', store.getState())
store.subscribe(() =>
  console.log('state changed:', store.getState())
)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
