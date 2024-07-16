const path = require('path');


module.exports = {
    mode: 'production',

    entry: {
        dashboard: `${process.cwd()}/page/dashboard/App.tsx`,
        admin: path.join(process.cwd(), 'admin/App.tsx'),
        auth: path.join(process.cwd(), "page/auth/App.tsx"),
        app: {
            import: `${process.cwd()}/page/home/App.tsx`,
            dependOn: 'shared',
        },
        ArtistPage: {
            import: path.join(process.cwd(), "page/home/Route/ArtistPage.tsx"),
            dependOn: 'shared',
        },
        shared: 'lodash',
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
        filename: '[name].js',
        path: path.join(process.cwd(), 'web', 'static'),
        chunkFilename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
}; 