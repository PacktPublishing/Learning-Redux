import { combineReducers } from 'redux'

import counterReducer from './counter'

const appReducer = combineReducers({
  counter: counterReducer,
})

export default appReducer
