const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
// const handlebars = require('handlebars');

// const { WebpackCordovaBundlePlugin } = require("webpack-cordova-bundle-plugin");

module.exports = {
  mode: "development",
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /index.html/
      },
      {
        test: /\.t\.hbs$/,
        use: [
          'handlebars-loader',
          'html-loader',
        ],
      },
      {
        test: /(?<!\.t)\.hbs$/,
        use: [
          'html-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /(?<!\.m)\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m\.s[ac]ss$/i,
        use: [
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  node: {
    global: true
  },
  resolve: {
    alias: {
      // path.resolve(__dirname, "node_modules"),
      src: path.resolve(__dirname, "src"),
      plugins: path.resolve(__dirname, "plugins"),
    },
    fallback: {
      // Adding polyfills required for node-rsa:
      "assert": require.resolve("assert"),
      "buffer": require.resolve("buffer"),
      "constants": require.resolve("constants-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),

    },
    extensions: [ '.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'cordova_template/index.html'
    }),
    new webpack.ProvidePlugin({
      // jQuery:
      $: 'jquery',
      jQuery: 'jquery',
      "window.$": 'jquery',
      "window.jQuery": 'jquery',
      
      // Lodash:
      _: 'lodash',
      lodash: 'lodash',
      "window._": 'lodash',
      "window.lodash": 'lodash',
      
      // Process - Required by NodeRSA:
      process: 'process/browser',      
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'www'),
  },
};