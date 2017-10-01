const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js', //starting point of the app
  output: {
    path: __dirname + '/build', // stick it all in the build folder
    filename: 'static/js/[name].[chunkhash:8].js', // Helps problems with cache
    publicPath: '/'
  },
  module: {
    loaders: [{test: /\.js$/, loader: 'babel-loader'}]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname + '/index.html' // Ronseal.
    }),
    new webpack.DefinePlugin({
        'process.env': { // React uses this as default. Makes it much faaster esp. on mobile.
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
  ].concat(
    process.env.NODE_ENV === 'production'
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false, comparisons: false},
            output: {comments: false, ascii_only: true}
          })
        ]
      : []
  )
};