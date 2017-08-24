import { combineReducers } from 'redux'

import counterReducer from './counter'

import undoable from '../undoable'

const appReducer = combineReducers({
  counter: undoable(counterReducer),
})

export default appReducer
