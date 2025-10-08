"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var config = {
    devServer: {
        proxy: [
            {
                target: 'http://localhost:3000',
                context: ['/public', '/private'],
                ws: true
            }
        ]
    },
    entry: './src/index.tsx',
    mode: 'production',
    output: {
        path: path_1.default.resolve(process.cwd(), './build'),
        filename: 'index.js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    performance: false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/typescript',
                            '@babel/preset-react',
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'defaults'
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new html_webpack_plugin_1.default({
            template: path_1.default.join(process.cwd(), 'public', 'index.html')
        })
    ]
};
exports.default = config;
