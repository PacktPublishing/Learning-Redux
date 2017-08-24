import { LOGIN_SUCCESS } from '../actionTypes'

export default function sessionReducer (state = false, action) {
  const { type, result } = action

  if (type === LOGIN_SUCCESS) {
    return result
  }

  return state
}
