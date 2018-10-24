const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
  	path: path.join(__dirname, 'public'),
  	filename: 'bundle.js'
  },
  module: {
  	rules: [
  	  {
  	  	test:/\.js$/,
  	  	loader: 'babel-loader',
  	  	exclude: /node_modules/
  	  }
  	]
  }
} 