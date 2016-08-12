var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

const javascriptLoader = {
  test: /\.jsx?$/,
  exclude: /(node_modules)/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread']
  }
};

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      javascriptLoader,
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  watchOptions: {
    poll: true
  },
  postcss: function () {
    return [autoprefixer];
  }
};
