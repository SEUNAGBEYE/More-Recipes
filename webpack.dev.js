const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common');

module.exports = merge(commonConfiguration, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  devtool: 'cheap-module-source-map',
  watch: true
});

