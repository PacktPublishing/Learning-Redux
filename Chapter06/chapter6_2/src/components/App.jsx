import React from 'react'

import ConnectedPostList from '../containers/ConnectedPostList.jsx'
import ConnectedFilterList from '../containers/ConnectedFilterList.jsx'
import ConnectedLoading from '../containers/ConnectedLoading.jsx'
import ConnectedErrorMessage from '../containers/ConnectedErrorMessage.jsx'

import DevTools from '../containers/DevTools.jsx'

const App = ({ store }) =>
  <div>
    <h1>React/Redux blog</h1>
    <div><ConnectedFilterList store={store} /></div>
    <div><ConnectedLoading store={store} /></div>
    <div><ConnectedErrorMessage store={store} /></div>
    <div><ConnectedPostList store={store} /></div>
    { (process.env.NODE_ENV !== 'production') && <DevTools store={store} /> }
  </div>

export default App
