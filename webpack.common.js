const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.join(__dirname, 'client/main/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      use: ['babel-loader'],
      test: /\.jsx?$/,
      exclude: /node_modules/
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: ['file-loader']
    }]
  },
  devServer: {
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'CLOUDINARY_UPLOAD_PRESET',
      'CLOUDINARY_UPLOAD_URL'
    ]),
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  }
};
