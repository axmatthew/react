// include gulp
var gulp = require('gulp');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var awspublish = require('gulp-awspublish');
var credentials = require('./credentials.js');

gulp.task('build', function(cb) {
  // FIXME: duplicated code with webpack.config.js
  webpack({
    entry: [
      './system/src/index.jsx' // Your appʼs entry point
    ],
    output: {
      path: './system/build',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: ['babel']
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  }, function webpackCallback(err, stats) {
    cb(err);
  });
});

// Publish files to amazon s3
gulp.task('publish', function() {
  var publisher = awspublish.create({
    region: 'ap-southeast-1',
    params: {
      Bucket: 'premium.appx.hk'
    },
    accessKeyId: credentials.AWS_ACCESS_KEY_ID,
    secretAccessKey: credentials.AWS_SECRET_ACCESS_KEY
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=8, no-transform, public'
  };

  return gulp.src('system/build/**/*')
    // gzip, Set Content-Encoding headers and add .gz extension
    // .pipe($.awspublish.gzip({ ext: '.gz' }))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // this will delete old files from the bucket
    .pipe(publisher.sync())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awspublish.reporter());
});
