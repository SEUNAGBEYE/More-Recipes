const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common');
const uglifyJs = require('uglifyjs-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = merge(commonConfiguration, {
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new uglifyJs({
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
});

