const webpack = require('webpack')
const path = require('path')

module.exports = (env) => {
  return {
    context: path.resolve(__dirname, env),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, env),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
      contentBase: `./${env}`,
      watchOptions: {
        poll: true
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2017', 'stage-3']
            }
          }
        }
      ]
    }
  }
}
