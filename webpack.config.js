const path = require('path');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common');

module.exports = merge(commonConfiguration, {
  entry: ['babel-polyfill', path.join(__dirname, 'client/main/src/app.js')],
  devtool: 'cheap-module-eval-source-map',
  watch: true
});
