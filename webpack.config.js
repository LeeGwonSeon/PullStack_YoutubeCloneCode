const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
        recorder: "./src/client/js/recorder.js",
    },
    mode: "development",
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
        }),
    ],
    output:{
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
    },

    /*
    2022년 4월 29일 오전 11시경
    test에서 .js 만 입력되어 있는 상태에서 에러가 발생 
    */
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
};