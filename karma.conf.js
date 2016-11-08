var path = require('path');
console.log('where at: ', path.resolve(__dirname, 'src', 'form_builder'));
// console.log('where at: ', path.resolve('./src/form_builder'));

// var IgnorePlugin = require('webpack').IgnorePlugin;
console.log('Karma: test server will run ', (process.env.SINGLE_RUN ? 'once': 'until stopped manually'));
module.exports = function(config){
  config.set({
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      // 'src/**/**/*.js',
      // './src/shared/Home.jsx',
      // './src/shared/Demo.jsx',
      // './src/shared/Footer.jsx',
      './src/App.jsx',
      './src/shared/*.jsx',
      // './src/**/*.js*',
      './src/**/*.spec.js'
      // 'tests.webpack.js'
      // 'src/**/**/*-test.js'
    ],

    preprocessors: {
      // 'node_modules/react/react.js': ['babel'],
      // './src/**/**' : ['webpack', 'sourcemap'],
      './src/**/*.js' : ['webpack', 'sourcemap'],
      './src/**/*.jsx' : ['webpack', 'sourcemap'],
      // 'tests.webpack.js' : ['webpack', 'sourcemap']
      './src/**/*.spec.js' : [ 'webpack', 'sourcemap']
    },
    // basePath: path.resolve(__dirname),
    browsers: ['PhantomJS'],
    singleRun: false,
    // autoWatch: true,
    frameworks: ['mocha'],

    reporters: ['mocha', 'coverage' ],

     coverageReporter: {
      //  instrumenters: { 'istanbul-react' : require('istanbul-react') },
      //  instrumenter: {
      //    '**/*.jsx': 'istanbul-react'
      //  },
       reporters: [
         { type: 'html', subdir: 'html' },
         { type: 'lcov', subdir: '.'},
        //  { type: 'lcovonly', subdir: '.', file: 'lcov-js.info' },
         { type: 'text-summary' }
       ]
     },

    //
    resolve: {
      extensions : ['', '.js', '.jsx']
    },

    webpack : {
      // noInfo: true,
      cache: false,
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      // plugins: [
      //   new IgnorePlugin(/ReactContext/),
      // ],
      node: {
        fs: "empty"
      },
      module: {
        loaders: [
          {
            test: /\.(less|css)$/,
            loader : 'style-loader!css-loader!less'
            // loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
          },
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          }
        ],
        postLoaders: [{
          test: /\.(js|jsx?)$/, exclude: /(node_modules|__tests__)/,
          loader: 'istanbul-instrumenter'
        }]

      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webPackServer: {
     noInfo: true,
   }
 });
};
