import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import createHistory from 'history/createMemoryHistory'
import { JSDOM } from 'jsdom'
import { Provider } from 'react-redux'

import configureStore from '../src/store'
import initStore from '../src/initStore'
import App from '../src/components/App.jsx'

/*
usually we would do:
server.get('*', serverSideRendering)

but in this case, serveFrontend.js already calls that function
*/

let cachedResult = false

const serverSideRendering = (indexFile, loadStaticFile) => (req, res) => {
  const isIndexPage = req.url === '/' || req.url === '/index.html'
  if (isIndexPage) {
    if (cachedResult) return res.send(cachedResult)
  }

  console.log('server-side rendering started for', req.url)

  const history = createHistory()

  const store = configureStore({}, history, true)
  return initStore(store)
    .then(() => {
      const context = {}
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={isIndexPage ? '/' : req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      )

      const storeState = JSON.stringify(store.getState())
        .replace(/</g, '\\u003c')

      const dom = new JSDOM(indexFile, { runScripts: 'outside-only' })
      dom.window.eval(`
        document.getElementById('root').innerHTML = '${markup}'
      `)
      dom.window.eval(`
        var script = document.createElement('script')
        script.innerHTML = 'window.__PRELOADED_STATE__ = ${storeState}'
        document.body.insertBefore(script,
          document.getElementsByTagName('script')[0]
        )
      `)

      if (isIndexPage) {
        cachedResult = dom.serialize()
        console.log('server-side rendering done, cached result')
        if (res) return res.send(cachedResult)
      } else {
        console.log('server-side rendering done')
        if (res) return res.send(dom.serialize())
      }
    })
    .catch(err => {
      console.error('server-side rendering error:', err)
      if (loadStaticFile) return loadStaticFile(req, res)
    })
}

export default serverSideRendering
