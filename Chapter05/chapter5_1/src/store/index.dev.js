import { createStore, compose } from 'redux'
import { persistState } from 'redux-devtools'

import appReducer from '../reducers'
import DevTools from '../containers/DevTools.jsx'

function getSessionKey () {
  const matches = window.location.href.match(/[?&]debug=([^&#]+)\b/)
  return (matches && matches.length > 0)
    ? matches[1]
    : null
}

const enhancer = compose(
  DevTools.instrument(),
  persistState(getSessionKey())
)

export default function configureStore (initialState) {
  return createStore(appReducer, initialState, enhancer)
}
