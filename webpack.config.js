const path = require('path');

console.log(path.join(__dirname, 'client/public'))

module.exports = {
  entry: path.join(__dirname, 'client/src/app.js'),
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },{
      test: /\.(png|jpg|gif|jpeg)$/,
      use: ['file-loader',]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    publicPath: '/',
  },
  watch: true
};