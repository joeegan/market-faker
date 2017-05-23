const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'interview-exercise'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'interview-exercise'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './interview-exercise',
    watchOptions: {
      poll: true
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'interview-exercise'),
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
