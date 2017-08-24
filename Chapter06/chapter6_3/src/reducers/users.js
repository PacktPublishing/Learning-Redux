import { CREATE_USER, FETCH_USER_SUCCESS } from '../actionTypes'

export default function usersReducer (state = [], action) {
  const { type, ...user } = action

  if (type === FETCH_USER_SUCCESS) {
    return [ ...state, action.result ]
  }

  if (type === CREATE_USER) {
    return [ ...state, user ]
  }

  return state
}
