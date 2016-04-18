module.exports = {
  entry: './js/app.js',
  output: {
    path: './bundle',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['','.js','.json']
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loaders: ['jsx','babel'], exclude: /node_modules/}
    ]
  }
}
