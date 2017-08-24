import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'

import configureStore from './store'
import initStore from './initStore'
import App from './components/App.jsx'
import DevTools from './containers/DevTools.jsx'

if (module.hot) {
  module.hot.accept()
}

const store = configureStore(window.__PRELOADED_STATE__)
initStore(store)

console.log('initial state:', JSON.stringify(store.getState(), null, 2))
store.subscribe(() =>
  console.log('state changed:', store.getState())
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={createHistory()}>
      <App store={store} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
