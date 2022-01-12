import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { dirname, join, resolve } from 'path'

const __dirname = dirname( new URL( import.meta.url ).pathname )

process.title = 'r-dev-serv'

let web_pack
// eslint-disable-next-line no-unused-vars
export default web_pack = {
    entry: {
        'entrypoint': './src/entrypoint.jsx',
        'ReactDangApp': './src/ReactDangApp.jsx',
        'Index': './src/components/Index.jsx',
        
        // Runtime code for hot module replacement
        hot: 'webpack/hot/dev-server.js',
        // Dev server client for web socket transport, hot and live reload logic
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    devtool: 'inline-source-map',
    mode: 'development',
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
    devServer: {
        static: {
            directory: join( __dirname, 'public/' ),
        },
        historyApiFallback: true,
        compress: true,
        port: 3000,
        host: '0.0.0.0',
        // Dev server client for web socket transport, hot and live reload logic
        hot: false,
        client: false,
        watchFiles: {
            paths: [ 'src/**/*', 'public/**/*', './**/*.js' ],
            options: {
                usePolling: true,
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin( {
            title: 'd64 dedicated website',
            // Load a custom template (lodash by default)
            template: './src/template/html/index.ejs',
            filename: resolve( __dirname, 'public/index.html' )
        } ),
        new webpack.HotModuleReplacementPlugin()
    ],
}
