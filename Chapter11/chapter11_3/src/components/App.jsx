import React from 'react'
import { Provider } from 'react-redux'

import ConnectedCounter from '../containers/ConnectedCounter.jsx'

const App = ({ store }) =>
  <Provider store={store}>
    <div>
      <h1>React/Redux counter app</h1>
      <div><ConnectedCounter /></div>
    </div>
  </Provider>

export default App
