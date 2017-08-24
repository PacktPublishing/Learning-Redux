import React from 'react'

import ConnectedPostList from '../containers/ConnectedPostList.jsx'
import ConnectedFilterList from '../containers/ConnectedFilterList.jsx'
import ConnectedLoading from '../containers/ConnectedLoading.jsx'
import ConnectedErrorMessage from '../containers/ConnectedErrorMessage.jsx'
import ConnectedHeader from '../containers/ConnectedHeader.jsx'
import ConnectedRouter from '../containers/ConnectedRouter.jsx'
import ConnectedNavigation from '../containers/ConnectedNavigation.jsx'

import DevTools from '../containers/DevTools.jsx'

const App = ({ store }) =>
  <div>
    <h1>React/Redux blog</h1>
    <div><ConnectedLoading store={store} /></div>
    <div><ConnectedErrorMessage store={store} /></div>
    <div><ConnectedNavigation store={store} /></div>
    <hr />
    <div><ConnectedHeader store={store} /></div>
    <hr />
    <ConnectedRouter store={store} />
    { (process.env.NODE_ENV !== 'production') && <DevTools store={store} /> }
  </div>

export default App
