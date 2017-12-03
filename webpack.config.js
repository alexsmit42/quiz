module.exports = {
    entry: './public/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
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
    devServer: {
        port: 5000,
        host: 'localhost'
    }
}