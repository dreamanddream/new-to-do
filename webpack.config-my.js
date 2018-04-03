// path是nodejs中的基本包，用来处理路径
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';


const config = {
    // 编译目标是web平台
    "target":"web",
    // join相当于拼接，——dirname是根目录，拼接后相当于绝对路径，保证路径不出错
    entry: path.join(__dirname,'src/index.js'),
    // 配置出口文件
    // 出口文件路径
    output:{
        path: path.join(__dirname, 'dist'),
        // 打包编译后的生成的js文件名称
        filename: 'bundle.js'
    },
    // 模块
    module: {
        rules: [
            // 以.vue为结尾文件的处理，使用vue-loader
            {
            test:/\.vue$/,loader:'vue-loader', 
        },
        // 以.jsx为结尾
        {
            test: /\.jsx$/,
            loader: 'babel-loader'
        },
        // 以.css为结尾的文件的处理,使用css-loader，style-loader
        {
            // 如果需要两个或以上loader就需要使用use结合数组
            test:/\.css$/,
            // 一般这些以.css为结尾的文件会被打包编译到bundle.js中
            // css-loader只是将以.css文件为结尾的文件读出来，具体形成文件还是插入到html中放到style标签中，需要使用style-loader
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        // 对各种图片的处理 使用url-loader,
        {
            test: /\.(gif|png|svg|jpg)$/,
            use: [
                // 
                {
                    loader: 'url-loader',
                    // 每个loader都可以进行option选项配置,将参数传递给loader，指定loader的操作方式
                    options: {
                        // 当图片大小小于1024时，将图片转化成base64代码直接写在js中，而不用生成新的文件
                        limit:1024,
                        // 指定输出的名字,ext代表扩展名，也就是将a.jpg,输出为a.jpg
                        name:'[name].[ext]'
                        // 也可以自己再加一些内容
                        // name:'[name]-aaa.[ext]'
                    }
                }
            ]
        },
        // css预处理器,stylus-loader，这个可以用也可以不用，主要是方便，可以和任何loader结合起来使用
        {
            test:/\.styl/,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]
        }
    ]
    }

}
// 根据不同的环境就行区分开发环境和正式环境
// 需要安装cross-env  区分不同平台，然后在package.json中修改相关配置.安装cross-env后可以让window和mac执行相同的脚本
if(isDev) {
    // 添加工具，这样可以使自己在浏览器端调试代码时不是编译后的，调试程序会比较方便.完整的映射编译
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        // 主机设置为0000可以在本机或者手机上访问,所以没有配置成localhost
        host: '0.0.0.0',
        // 在webpack中有任何错误，都将其显示在网页中
        overlay:{
            errors: true
        },
        // hot:true
    }
    // config.plugins.push(
    //     // new webpack.HotModuleReplacementPlugin(),
    //     // new webpack.NoEmitOnErrorsPlugin()
    // )
}
module.exports = config;