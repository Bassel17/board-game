const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const commonConfig = require('./webpack.config.common')

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins:[
    new TerserPlugin({
      parallel: true,
      cache: true,
      sourceMap: true,
    }),
  ]
})