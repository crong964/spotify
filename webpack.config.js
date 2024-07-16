const path = require('path');
module.exports = {
    mode: 'production',

    entry: {
        app: {
            import: `${process.cwd()}/page/home/App.tsx`,
            dependOn: 'shared',
        },
        dashboard: {
            import: `${process.cwd()}/page/dashboard/App.tsx`,
            dependOn: 'shared',
        },
        admin: {
            import: path.join(process.cwd(), 'admin/App.tsx'),
            dependOn: 'shared',
        },
        auth: {
            import: path.join(process.cwd(), "page/auth/App.tsx"),
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
        filename: path.join('static', '[name].js'),
        path: path.join(process.cwd(), 'web')
    },
    optimization: {
        runtimeChunk: 'single',
    },
}; 

// {
//     test: /\.css$/i,
//     use: ['style-loader', 'css-loader'],
// },