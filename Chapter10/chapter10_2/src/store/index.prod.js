import { createStore } from 'redux'

import appReducer from '../reducers'
import createMiddleware from './middleware'

export default function configureStore (initialState, history) {
  const middleware = createMiddleware(history)
  return createStore(appReducer, initialState, middleware)
}
