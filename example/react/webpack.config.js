var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: fs.readdirSync(__dirname + '/js').reduce(function (entries, dir) {
      if (fs.statSync(path.join(__dirname + '/js', dir)).isDirectory())
        entries[dir] = path.join(__dirname + '/js' , dir, 'app.js')

      return entries
    }, {}),
    output: {
        path: __dirname + '/build',
        filename: "[name].js",
        chunkFilename: '[id].chunk.js',
        publicPath: '/build'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },{
              test: /\.css$/,
              loader: "style!css"
            },{
              test: /\.less/,
              loader: 'style-loader!css-loader!less-loader'
            },{
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    devServer: {
        hot: true,
        inline: true
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin('shared.js'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ]
};
