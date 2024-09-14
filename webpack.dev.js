const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    // call dotenv to return an Object with a parsed key 
    const env = dotenv.config().parsed;

    // reducer for parsing .env variables
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: 'development',
        entry: path.join(__dirname, "./src", "index.js"),
        optimization: {
            innerGraph: false,
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new UglifyJsPlugin({ test: /\.js(\?.*)?$/i }),
            ],
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "build")
        },
        module: {
            rules: [
                // {
                //     test: /\.env$/,
                //     exclude: [ path.resolve(__dirname, '.env')]
                // },
                {
                    test: /\.?js$/,
                    exclude: [/node_modules/],
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env',  ["@babel/preset-react", {"runtime": "automatic"}]]                            
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: ['file-loader']
                }
            ]
        },
        plugins: [

            new HtmlWebpackPlugin({
                template: path.join(__dirname, "public", "index.html"),
            }),

            new CopyWebpackPlugin({
                patterns: [
                    { from: path.join(__dirname, "public", "assets"), to: "assets" }
                ]
            }),

            new webpack.DefinePlugin(envKeys),               

            new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", "React": "react"  })
        ],
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    }
}

//https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9