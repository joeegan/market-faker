const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'browser-demo'),
  entry: './demo.js',
  output: {
    path: path.resolve(__dirname, 'browser-demo'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './browser-demo',
    watchOptions: {
      poll: true
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'browser-demo'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    }]
  }
}

module.exports = config
