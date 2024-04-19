const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    entry: './src/index.js',
    output:{
        path: __dirname + '/build',
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,       
        allowedHosts: [
            'localhost',       
            '0.0.0.0',
        ],
    },
    module: {
        rules: [       
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },                
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'                    
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath : '',
                    useRelativePath : true
                },
            },
            {                
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,            
                loader: 'url-loader',
                options: {
                    publicPath:'./src/public/fonts/',
                    name: './src/public/fonts/[name].[ext]'
                }

            }
        ],
    },
    resolve: {       
        alias: {
            public: path.resolve(__dirname,'src/public'),
            style: path.resolve(__dirname,'src/app/style'),
            components: path.resolve(__dirname,'src/app/components'),
            api: path.resolve(__dirname,'src/app/api'),
            helpers: path.resolve(__dirname,'src/app/helpers'),
            interface: path.resolve(__dirname,'src/app/interface'),
            storage: path.resolve(__dirname,'src/app/store')
            //  helpers: path.resolve(__dirname, 'src/helpers'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/public/index.html'
        }),
       
    ],
};