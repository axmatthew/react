// karma.conf.js
var webpack = require('webpack');

module.exports = function (config) {
  // e.g. https://github.com/lelandrichardson/enzyme-example-karma-webpack/blob/master/karma.conf.js
  config.set({
    browsers: ['PhantomJS'],
    hostname: process.env.IP,
    port: process.env.PORT,
    runnerPort: 0,
    // list of files / patterns to load in the browser
    files: [
      'system/angle/vendor/modernizr/modernizr.custom.js',
      'system/angle/vendor/matchMedia/matchMedia.js',
      'system/angle/vendor/jquery/dist/jquery.js',
      'system/angle/vendor/bootstrap/dist/js/bootstrap.js',
      'system/angle/vendor/jQuery-Storage-API/jquery.storageapi.js',
      'system/angle/vendor/jquery.easing/js/jquery.easing.js',
      'system/angle/vendor/animo.js/animo.js',
      'system/angle/vendor/slimScroll/jquery.slimscroll.min.js',
      'system/angle/vendor/screenfull/dist/screenfull.js',
      'system/angle/vendor/moment/min/moment-with-locales.min.js',
      'system/angle/vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'system/angle/vendor/datatables/media/js/jquery.dataTables.min.js',
      'system/angle/vendor/datatables-colvis/js/dataTables.colVis.js',
      'system/angle/vendor/datatables/media/js/dataTables.bootstrap.js',
      'system/angle/vendor/sweetalert/dist/sweetalert.min.js',
      'system/angle/app/js/app.js',
      'tests.bundle.js'
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai',
      'karma-sinon'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    // webpack config object
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
        ]
      },
      watch: true,
      // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
