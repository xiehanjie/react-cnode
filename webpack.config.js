
const webpack = require('webpack');
const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const PATHS = {
    src: path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './public')
}
const postcssOpts = {
    importLoaders: 1,
    minimize: true,
    ident: 'postcss',
    plugins: () => [
        autoprefixer(),
        pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
};
module.exports = {
    entry: {
        app: './src/app.js',
        react: [
            'react', 
            'react-dom', 
            'react-router-dom'
        ]
    },
    output: {
        path: PATHS.dist,
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },{
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },
            { 
                test: /\.(jpg|png|svg)$/, 
                loader: "url-loader?limit=8192&name=img/[name].[ext]" 
            },
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader?modules=false",
                        options: postcssOpts,
                    },
                    {
                        loader:"less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                "hd": "2px"
                            }
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', 'jsx', '.js', '*', '.json', 'less']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: `../views/index.ejs`
        }),
        //webpack4 新分离css方法
        new MiniCssExtractPlugin({
            filename: `css/style.css`,
            chunkFilename: "[id].css"
        })
    ],
    //webpack4 新分离js方法
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "react",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}