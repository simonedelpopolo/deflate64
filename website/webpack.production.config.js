import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { dirname, resolve } from 'path'

const __dirname = dirname( new URL( import.meta.url ).pathname )

let web_pack
// eslint-disable-next-line no-unused-vars
export default web_pack = {
    entry: {
        'entrypoint': './src/entrypoint.jsx',
        'ReactDangApp': './src/ReactDangApp.jsx',
        'Index': './src/components/Index.jsx',
    },
    devtool: 'inline-source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/env',
                        '@babel/react',
                    ],
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '*',
            '.js',
            '.jsx',
        ],
    },
    output: {
        path: resolve( __dirname, 'public/js/' ),
        filename: '[contenthash].[name].js',
        clean: true,
        publicPath: '/js',
    },
    plugins: [
        new HtmlWebpackPlugin( {
            title: 'React Dang App',
            // Load a custom template (lodash by default)
            template: './src/template/html/index.ejs',
            filename: resolve( __dirname, 'public/index.html' )
        } ),
        new webpack.HotModuleReplacementPlugin()
    ],
}
