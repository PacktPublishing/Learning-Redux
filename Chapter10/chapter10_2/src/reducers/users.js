import { CREATE_USER_SUCCESS, FETCH_USER_SUCCESS } from '../actionTypes'

export default function usersReducer (state = [], action) {
  const { type } = action

  if (type === FETCH_USER_SUCCESS) {
    return [ ...state, action.result ]
  }

  if (type === CREATE_USER_SUCCESS) {
    return [ ...state, action.result ]
  }

  return state
}
