import { combineReducers } from 'redux'

import usersReducer from './users'
import postsReducer from './posts'
import filterReducer from './filter'
import loadingReducer from './loading'
import errorReducer from './error'
import sessionReducer from './session'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
  session: sessionReducer,
  route: routerReducer,
})

export default appReducer
