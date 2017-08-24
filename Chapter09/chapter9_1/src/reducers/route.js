import { NAVIGATE } from '../actionTypes'

export default function routeReducer (state = 'main', action) {
  const { type, page } = action

  if (type === NAVIGATE) {
    return page
  }

  return state
}
