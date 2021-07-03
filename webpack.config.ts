import Config from "webpack-chain";
import * as path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

function appPath(pth: string) {
    return path.resolve(__dirname, pth)
}

const config = new Config();

config.mode(process.env.NODE_ENV === 'development' ? 'development' : 'production')
    .target('web')
    .context(__dirname)
    .entry('app')
    .add(`./src/index.tsx`)
    .end()

config.resolve.extensions.merge(['.ts', '.js', '.tsx', '.json']).end();

config.output
    .path(path.resolve(__dirname, "./docs"))
    .publicPath("/war3tool/")
    .filename('[name].[contenthash:5].js')
    .end()

config.module
    .rule('css')
    .test(/\.(le|c|postc)ss$/)
    .use('extract-css-loader')
    .loader(MiniCssExtractPlugin.loader)
    .options({
        publicPath: './'
    })
    .end()
    .use('css-loader')
    .loader('css-loader')
    .options({})
    .end()
    .use('less-loader')
    .loader('less-loader')
    .options({
        lessOptions:{
            javascriptEnabled: true
        }
    })
    .end()

config.module
    .rule('compile')
    .test(/\.tsx?$/)
    .include
    .add(appPath("./src"))
    .end()
    .use('babel')
    .loader('babel-loader')
    .options({
        presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
        plugins: [["import", {
            "libraryName": "antd",
            "libraryDirectory": "lib",   // default: lib
            "style": true
        }]]
    });

config.devServer.hot(true).port(3000);

config.plugin('HtmlWebpackPlugin')
    .use(new HtmlWebpackPlugin({
        'template': "./src/index.html",
    }))

config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin)

export default config.toConfig();
