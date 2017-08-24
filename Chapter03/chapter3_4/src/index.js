import React from 'react'
import ReactDOM from 'react-dom'

import PostList from './components/PostList.jsx'

const posts = [
  { user: 'dan', text: 'hello world!' },
  { user: 'des', text: 'hi!' }
]

ReactDOM.render(
  <PostList posts={posts} />,
  document.getElementById('root')
)
