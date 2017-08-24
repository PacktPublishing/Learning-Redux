import { createStore, compose } from 'redux'
import { persistState } from 'redux-devtools'

import appReducer from '../reducers'
import middleware from './middleware'
import DevTools from '../containers/DevTools.jsx'

function getSessionKey () {
  const matches = window.location.href.match(/[?&]debug=([^&#]+)\b/)
  return (matches && matches.length > 0)
    ? matches[1]
    : null
}

const enhancer = compose(
  middleware,
  DevTools.instrument(),
  persistState(getSessionKey())
)

export default function configureStore (initialState) {
  const store = createStore(appReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index').default)
    )
  }

  return store
}
