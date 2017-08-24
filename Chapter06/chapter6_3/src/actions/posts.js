import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE,
  CREATE_POST, EDIT_POST, DELETE_POST
} from '../actionTypes'
import { thunkCreator } from './utils'

import { fetchUsersByUsernames } from './users'

export const fetchPosts = () => thunkCreator({
  types: [ FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE ],
  promise: fetch('http://localhost:8080/api/posts')
             .then(response => response.json())
})

const getUsernamesFromPosts = (posts) =>
  posts.reduce((usernames, post) => {
    if (!usernames.includes(post.user)) {
      return [ ...usernames, post.user ]
    }
    return usernames
  }, [])

export const fetchPostsAndUsers = () => (dispatch) =>
  fetchPosts()(dispatch)
    .then(getUsernamesFromPosts)
    .then(usernames => fetchUsersByUsernames(usernames)(dispatch))
    .catch(err =>
      console.error('could not fetch posts and users:', err.message)
    )

export const createPost = (user, post) => {
  const { title, text, category = 'random' } = post

  if (!title || !text) {
    throw new Error('invalid post, title and text required')
  }

  return {
    type: CREATE_POST,
    post: { user, title, text, category },
  }
}

export const editPost = (id, post) => {
  return {
    type: EDIT_POST,
    id,
    post,
  }
}

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id,
  }
}
