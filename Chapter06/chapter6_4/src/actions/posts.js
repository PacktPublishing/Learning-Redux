import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE,
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  EDIT_POST, DELETE_POST
} from '../actionTypes'
import { thunkCreator } from './utils'

import { fetchUser, fetchUsersByUsernames } from './users'

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

const _createPost = (user, post) => thunkCreator({
  types: [ CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE ],
  promise: fetch('http://localhost:8080/api/posts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...post, user
    })
  })
  .then(response => response.json())
})

export const createPost = (user, post, doFetchUser = true) => (dispatch) =>
  _createPost(user, post)(dispatch)
    .then(result => {
      if (doFetchUser) {
        return fetchUser(result.user)(dispatch)
      }
    })
    .catch(err =>
      console.error('could not create post:', err.message)
    )

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
