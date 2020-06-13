'use strict';
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        server: './src/server.ts',
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, '.build'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                /*configFile: "./path/to/tsconfig.json" */
            }),
        ],
    },
    devtool: 'source-map',
    plugins: [],
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
    },
};
