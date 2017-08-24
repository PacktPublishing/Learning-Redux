export default function errorReducer (state = {}, action) {
  if (action.type.endsWith('_FAILURE')) {
    return action.error
  }

  return state
}
