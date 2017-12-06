const webpack = require('webpack')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')

let env = (process.env.NODE_ENV === 'product' || process.env.NODE_ENV === 'stage') ? 'production' : 'development'

const config = Object.assign({}, base, {
  resolve: {
    alias: Object.assign({}, base.resolve.alias, {

    })
  },
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ])
})

if (process.env.NODE_ENV === 'product' || process.env.NODE_ENV === 'stage') {
  // Use ExtractTextPlugin to extract CSS into a single file
  // so it's applied on initial render.
  // vueConfig is already included in the config via LoaderOptionsPlugin
  // here we overwrite the loader config for <style lang="stylus">
  // so they are extracted.
  vueConfig.loaders = {
    // stylus: ExtractTextPlugin.extract({
    //   loader: 'css-loader!stylus-loader',
    //   fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader
    // }),
    less: ExtractTextPlugin.extract({
      loader: 'css-loader!less-loader',
      fallbackLoader: 'vue-style-loader'
    })
  }

  config.plugins.push(
    // new ExtractTextPlugin('styles.[hash].css'),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: true
    }),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
    // new SWPrecachePlugin({
    //   cacheId: 'vue-hn',
    //   filename: 'service-worker.js',
    //   dontCacheBustUrlsMatching: /./,
    //   staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    // })
  )
}

module.exports = config
