const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'client/main/src/app.js')],
  output: {
    path: path.join(__dirname, 'client/public'),
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
