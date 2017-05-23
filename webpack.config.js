const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'browser-demo'),
  entry: './demo.js',
  output: {
    path: path.resolve(__dirname, 'browser-demo'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './browser-demo'
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
