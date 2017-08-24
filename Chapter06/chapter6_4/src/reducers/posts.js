import {
  CREATE_POST_SUCCESS, EDIT_POST, DELETE_POST, FETCH_POSTS_SUCCESS
} from '../actionTypes'

export default function postsReducer (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS: {
      return action.result
    }

    case CREATE_POST_SUCCESS: {
      const { type, result } = action
      return [ ...state, result ]
    }

    case EDIT_POST: {
      const { type, id, post } = action
      return state.map((oldPost, index) =>
        action.id === index
          ? {
            ...oldPost,
            ...post,
            updated: Date.now(),
          }
          : oldPost
      )
    }

    case DELETE_POST: {
      const { type, id } = action
      return state.filter((post, index) =>
        action.id !== index
      )
    }

    default:
      return state
  }
}
