const glob = require('glob');

function getEntrys() {
  return glob.sync('./public/javascripts/**/*.js')
  .map(file => {
    return {
      name: file.substring(0, file.length - 3).replace('/javascripts/', '/js/'),
      path: file
    }
  }).reduce((memo, file) => {
    memo[file.name] = file.path
    return memo;
  }, {});
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: getEntrys,
  output: {
    filename: '[name].min.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
