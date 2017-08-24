import { createStore, compose } from 'redux'
import { persistState } from 'redux-devtools'

import appReducer from '../reducers'
import createMiddleware from './middleware'
import DevTools from '../containers/DevTools.jsx'

function getSessionKey () {
  const matches = window.location.href.match(/[?&]debug=([^&#]+)\b/)
  return (matches && matches.length > 0)
    ? matches[1]
    : null
}

export default function configureStore (initialState, history, serverSide = false) {
  const enhancer = compose(
    createMiddleware(history),
    DevTools.instrument(),
    persistState(serverSide ? null : getSessionKey())
  )

  const store = createStore(appReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index').default)
    )
  }

  return store
}
