import { fetchPostsAndUsers } from './actions'

export default function initStore (store) {
  const state = store.getState()
  if (!state.posts || state.posts.length <= 0) {
    return store.dispatch(fetchPostsAndUsers())
  }
}
