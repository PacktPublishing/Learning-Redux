const webpack = require('webpack')
const prodConfig = require('./webpack.config.prod')

module.exports = Object.assign(prodConfig, {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    prodConfig.entry
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: prodConfig.output.path,
    publicPath: '/' // necessary for HMR to know where to load the hot update chunks
  },
  plugins: prodConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ])
})
