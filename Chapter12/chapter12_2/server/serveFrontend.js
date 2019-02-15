const express = require('express')
const joinPath = require('path').join
const dirname = require('path').dirname
const fs = require('fs')

const serverSideRendering = require('./render').default

// adapted from https://github.com/rangle/serve-webpack-client
module.exports = function createRouter (
  path, index = 'index.html', config = 'webpack.config.dev.js', dist = 'dist'
) {
  const router = new express.Router()

  if (!path) {
    throw new Error('please specify a path')
  }

  if (process.env.NODE_ENV === 'production') {
    // In production, assets are bundled at build time and served statically from
    // the 'dist' folder. This is more efficient.
    console.log('prod mode: serving client static assets')

    const distPath = joinPath(path, dist)
    const mainPath = joinPath(distPath, 'main.js')
    router.get('/main.js', (req, res) => res.sendFile(mainPath))

    const indexPath = joinPath(distPath, index)
    const indexFile = fs.readFileSync(indexPath)
    router.get('*', serverSideRendering(indexFile,
      (req, res) => res.sendFile(indexPath)
    ))

    // let the server pre-render the main page before the first request
    serverSideRendering(indexFile)({ url: indexPath })
  } else {
    // In development, assets are bundled and hot-loaded on the fly. This is
    // resource intensive, but allows auto-rebuilding of client and server code
    // for developer convenience.
    console.log('dev mode: serving frontend from webpack... please wait')

    const requireFrontend = (module) =>
      require(joinPath(path, 'node_modules', module))

    const webpack = requireFrontend('webpack')

    const webpackConfig = require(joinPath(path, config))
    const compiler = webpack(webpackConfig)
    const devMiddleware = requireFrontend('webpack-dev-middleware')(compiler, {
      noInfo: true,
    })

    const indexPath = '/index.html'

    const loadAndCacheFile = (requestedPath) => {
      const file = (requestedPath === '/') ? indexPath : requestedPath
      const filePath = joinPath(path, file)

      // load index file into memory-fs if it does not exist yet
      if (!devMiddleware.fileSystem.existsSync(filePath)) {
        // if file really doesn't exist, show 404
        if (!fs.existsSync(filePath)) return false
        // otherwise, create the folder
        const folderPath = dirname(filePath)
        devMiddleware.fileSystem.mkdirpSync(folderPath)
        // then create the file
        devMiddleware.fileSystem.writeFileSync(filePath, fs.readFileSync(filePath))
      }

      return devMiddleware.fileSystem.readFileSync(filePath)
    }

    router.use(devMiddleware)
    router.use(requireFrontend('webpack-hot-middleware')(compiler))
    router.get('*', serverSideRendering(
      loadAndCacheFile(indexPath),
      (req, res) => {
        const data = loadAndCacheFile(req, res)
        if (!data) return res.status(404).end()
        return res.end(data)
      }
    ))
    // let the server pre-render the main page before the first request
    serverSideRendering(loadAndCacheFile(indexPath))({ url: indexPath })
  }

  return router
}
