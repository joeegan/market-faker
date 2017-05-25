const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'demo'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './demo',
    watchOptions: {
      poll: true
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets:             ['es2017', 'stage-3'],
        }
      }]
    }]
  },
}

module.exports = config
