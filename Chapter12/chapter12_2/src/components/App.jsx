import React from 'react'
import { Route } from 'react-router-dom'

import ConnectedPostList from '../containers/ConnectedPostList.jsx'
import ConnectedFilterList from '../containers/ConnectedFilterList.jsx'
import ConnectedLoading from '../containers/ConnectedLoading.jsx'
import ConnectedErrorMessage from '../containers/ConnectedErrorMessage.jsx'
import ConnectedHeader from '../containers/ConnectedHeader.jsx'
import Navigation from './Navigation.jsx'

import MainPage from './pages/MainPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

import DevTools from '../containers/DevTools.jsx'

const App = () =>
  <div>
    <h1>React/Redux blog</h1>
    <Navigation />
    <ConnectedLoading />
    <ConnectedErrorMessage />
    <hr />
    <ConnectedHeader />
    <hr />
    <Route exact path="/" component={MainPage} />
    <Route path="/about" component={AboutPage} />
    { (process.env.NODE_ENV !== 'production') && <DevTools /> }
  </div>

export default App
