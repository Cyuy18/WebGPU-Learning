const path = require("path");
module.exports = {
    context: __dirname,
    entry: "./src/main.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"
    },
    mode: 'development', // 设置mode
    // 指定webpack打包时要使用的模块
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test:/\.wgsl$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-shader-loader"
                }
            }
        ]
    },
    
    resolve: {
        extensions: [".ts"]
    }
}