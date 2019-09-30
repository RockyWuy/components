const HtmlWebpackPlugin = require('html-webpack-plugin'); // 默认生成index.html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist文件
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    output: {
        filename: '[name]__[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        host: '0.0.0.0', // 若希望外部可访问
        compress: true, // 一切服务都启用gzip 压缩
        port: 3000, // 默认端口号 8080
        historyApiFallback: true,
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'components',
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // 使用typescript需在tsconfig做同样配置 
        // alias: { 
        //     '@components': path.resolve(__dirname, 'src/components')
        // },
        plugins: [new TsConfigPathsPlugin({})] // 使用 tsconfig-paths-webpack-plugin 插件也可
    },
};