'use strict';
module.exports = {

    entry: './src/index.js',
    output: {
        path:'build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    }
};