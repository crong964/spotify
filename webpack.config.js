const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'production',

    entry: {
        app: `${process.cwd()}/page/home/App.tsx`,
        dashboard: `${process.cwd()}/page/dashboard/App.tsx`,
        admin: path.join(process.cwd(), 'admin/App.tsx')

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": process.cwd()
        }
    },
    output: {
        filename: path.join('[name].js'),
        chunkFilename: path.join('[name].[contenthash].js'),
        path: path.join(process.cwd(), 'web', 'static',),
        clean: true,
    }
};

