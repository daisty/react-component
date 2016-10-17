var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var NODE_ENV = process.env.NODE_ENV;
var publicPath = NODE_ENV === 'dev' ? '/dist/' : '';
const envConfig = NODE_ENV === 'prod' ? {'process.env': { NODE_ENV: JSON.stringify('production')} } : {}

module.exports = {
    entry: "./demo/entre.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'demo.js',
        publicPath: publicPath
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new CaseSensitivePathsPlugin(),
        new webpack.DefinePlugin(envConfig)
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false
        // })
    ],
    module: {
        loaders: [
        	{ 
            	test: /\.less$/,
            	loader: "style-loader!css-loader!postcss-loader!less-loader"
            }, { 
            	test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },	{ 
            	test: /\.js$/,
	            exclude: /(node_modules|bower_components)/,
            	loader: "babel" 
            }, {
	            test: /\.jsx?$/,
	            exclude: /(node_modules|bower_components)/,
	            loader: 'babel',
            }
        ],
        postcss: function () {
            return [autoprefixer, precss];
        }
    },
    
};