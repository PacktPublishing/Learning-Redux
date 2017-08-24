const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './server/index.js',
  target: 'node',
  node: {
    __dirname: false
  },
  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  module: {
    exprContextRegExp: /^\.\/.*$/,
    unknownContextRegExp: /^\.\/.*$/,
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
