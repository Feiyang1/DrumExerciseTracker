var webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
    ],
    devServer: {
        contentBase: "./",
        proxy: {
            "/api": {
                target: "http://localhost:3030",
                secure: false
            }
        },
        hot: true
    }
})