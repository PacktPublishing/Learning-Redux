import React from 'react'

import MainPage from './pages/MainPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

const Router = ({ store, route }) => {
  switch (route) {
    case 'about':
      return <AboutPage store={store} />

    default:
    case 'main':
      return <MainPage store={store} />
  }
}

export default Router
