const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');
const merge = require('webpack-merge');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
    entry: {
        bundle: path.join(__dirname, 'src', 'app.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: '/node_modules/',
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    externals: [{
      'react': 'React',
      // 'prop-types': 'prop-types',
      'react-dom': 'ReactDOM'
    }]
};

const devConfig = {
    mode: 'development'
};

const prodConfig = {
    mode: 'production',
    optimization: {
        minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
    }
};

module.exports = devMode
    ? merge(config, devConfig)
    : merge(config, prodConfig);