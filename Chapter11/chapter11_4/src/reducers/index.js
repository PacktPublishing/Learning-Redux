import { combineReducers } from 'redux'

import counterReducer from './counter'

import undoable from 'redux-undo'

const appReducer = combineReducers({
  counter: undoable(counterReducer, { debug: true }),
})

export default appReducer
