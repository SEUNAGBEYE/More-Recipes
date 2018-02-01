const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = merge(commonConfiguration, {
  entry: ['babel-polyfill', path.join(__dirname, 'client/dist/src/app.js')],
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
});
