const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const base = {
  entry: ['react-hot-loader/patch', './src/index.bs.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    quiet: true,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss|sass|less)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
      {
        test: /\.(eot|gif|svg|woff|woff2|ttf|jpg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Development server started at http://localhost:8080'],
        clearConsole: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
    }),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  base.plugins.push(new webpack.NamedModulesPlugin());
}
if (process.env.NODE_ENV === 'production') {
  base.devtool = false;
  base.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJsPlugin()
  );
}

module.exports = base;
