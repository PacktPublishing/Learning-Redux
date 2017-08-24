import React from 'react'

import ConnectedPostList from '../containers/ConnectedPostList.jsx'
import ConnectedFilterList from '../containers/ConnectedFilterList.jsx'

const App = ({ store }) =>
  <div>
    <h1>React/Redux blog app</h1>
    <div><ConnectedFilterList store={store} /></div>
    <div><ConnectedPostList store={store} /></div>
  </div>

export default App

