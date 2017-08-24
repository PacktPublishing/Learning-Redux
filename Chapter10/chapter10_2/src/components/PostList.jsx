import React from 'react'
import Post from './Post.jsx'

const PostList = ({ posts }) =>
  <ul>
    {posts.map(
      (post, i) =>
        <li key={i.toString()}>
          <Post {...post} />
        </li>
    )}
  </ul>

export default PostList

