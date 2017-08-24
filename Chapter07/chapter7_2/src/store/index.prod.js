import { createStore } from 'redux'

import appReducer from '../reducers'
import middleware from './middleware'

export default function configureStore (initialState) {
  return createStore(appReducer, initialState, middleware)
}
