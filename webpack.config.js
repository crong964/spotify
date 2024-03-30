const path = require('path');


module.exports = {
    entry: {
        app: `${process.cwd()}/page/home/App.tsx`,
        dashboard: `${process.cwd()}/page/dashboard/App.tsx`,
        admin: path.join(process.cwd(), 'admin/App.tsx'),
        auth: path.join(process.cwd(), "page/auth/App.tsx")
    },
    module: {
        rules: [ 
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.join(process.cwd(), 'web'),
    },
};