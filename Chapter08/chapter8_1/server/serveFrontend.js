const express = require('express')
const joinPath = require('path').join
const dirname = require('path').dirname
const fs = require('fs')

// adapted from https://github.com/rangle/serve-webpack-client
module.exports = function createRouter (
  path, index = 'index.html', config = 'webpack.config.dev.js', dist = 'dist'
) {
  const router = new express.Router()

  if (!path) {
    throw new Error('please specify a path')
  }

  const distPath = joinPath(path, dist)
  const webpackConfig = require(joinPath(path, config))

  if (process.env.NODE_ENV === 'production') {
    // In production, assets are bundled at build time and served statically from
    // the 'dist' folder. This is more efficient.
    console.log('prod mode: serving client static assets')
    router.use(express.static(distPath))
    router.get('*', (req, res) => res.sendFile(joinPath(distPath, index)))
  } else {
    // In development, assets are bundled and hot-loaded on the fly. This is
    // resource intensive, but allows auto-rebuilding of client and server code
    // for developer convenience.
    console.log('dev mode: serving frontend from webpack... please wait')

    const requireFrontend = (module) =>
      require(joinPath(path, 'node_modules', module))

    const webpack = requireFrontend('webpack')

    const compiler = webpack(webpackConfig)
    const devMiddleware = requireFrontend('webpack-dev-middleware')(compiler, {
      noInfo: true,
    })

    const loadAndCacheFile = (req, res) => {
      const file = (req.path === '/') ? '/index.html' : req.path
      const filePath = joinPath(path, file)

      // load index file into memory-fs if it does not exist yet
      if (!devMiddleware.fileSystem.existsSync(filePath)) {
        // if file really doesn't exist, show 404
        if (!fs.existsSync(filePath)) return res.status(404).end()
        // otherwise, create the folder
        const folderPath = dirname(filePath)
        devMiddleware.fileSystem.mkdirpSync(folderPath)
        // then create the file
        devMiddleware.fileSystem.writeFileSync(filePath, fs.readFileSync(filePath))
      }

      return res.end(devMiddleware.fileSystem.readFileSync(filePath))
    }

    router.use(devMiddleware)
    router.use(requireFrontend('webpack-hot-middleware')(compiler))
    router.get('*', loadAndCacheFile)
  }

  return router
}
