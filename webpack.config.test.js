const path = require('path');
let glob = require("glob");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ZipPlugin = require('zip-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: glob.sync(__dirname + "/test/*.js"),
  output: {
    path: path.resolve(__dirname, 'test-dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: false,
    port: 8080
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [ 
    new WebpackShellPlugin({
      onBuildExit: "mocha ./test-dist/main.js"
    })
  ]
};