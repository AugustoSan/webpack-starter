const HtmlWebpack    = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    output: {
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
      },
    optimization: {},
    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack Plugin',
            //filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtract({
            //filename: '[name].[fullhash].css', // para que en produccion no se guarde en cache
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns:[
                { from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}