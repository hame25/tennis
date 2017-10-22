var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './client.js'
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + '/public'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
    { from: './service-worker', to: './'}
    ])
  ]
};
