module.exports = {
    entry: './public/admin.js',
    output: {
        filename: 'bundle-admin.js',
        path: __dirname + '/public'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                exclude: /(node_modules|bower_components)/,
                use: ['vue-loader']
            }
        ]
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery'
    //     }),
    // ],
    devServer: {
        port: 5000,
        host: 'localhost'
    }
}