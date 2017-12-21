const path = require('path');
const webpack = require('webpack');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  entry: path.join(__dirname, 'client/src/app.js'),
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
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.EnvironmentPlugin([
      'CLOUDINARY_UPLOAD_PRESET',
      'CLOUDINARY_UPLOAD_URL',

    ]),
  ],
  devServer: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js']
  }
};
