var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var APP_FOLDER = 'system';

module.exports = {

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './' + APP_FOLDER + '/src/index.jsx' // Your appʼs entry point
  ],

  output: {
    path: './' + APP_FOLDER + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss!'
      }
    ]
  },

  postcss: [autoprefixer],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'components', 'node_modules/bootstrap/dist/css']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: './' + APP_FOLDER,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    colors: true,
    stats: 'normal'
  }

};
