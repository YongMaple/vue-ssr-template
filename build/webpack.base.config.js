const path = require('path')
const vueConfig = require('./vue-loader.config')
const isProd = process.env.NODE_ENV === 'product'
const isStage = process.env.NODE_ENV === 'stage'

let baseUrl = '/'
if (isProd || isStage) {
  baseUrl = '/'
}

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    vendor: [
      'es6-promise',
      'isomorphic-fetch',
      'babel-polyfill',
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: `${baseUrl}dist/`,
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      // 'public': path.resolve(__dirname, '../public')
    }
  },
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      }
    ]
  }
}
