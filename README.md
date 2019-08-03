# react-app-dev-env


2019 年 7 月底开始学 React, 先看了一个 [Youtube 视频](https://www.youtube.com/watch?v=sBws8MSXN7A), 跟着做了一个 todo 应用, 不过这个视频没有教我们怎么搭建一个开发 React 应用的环境, 它用的是 [Create-React-App](https://github.com/facebook/create-react-app). 这种傻瓜式工具非常方便好用, 但是它到底是怎么工作的啊, 为什么浏览器可以识别 jsx, 为什么保存了网页就自动刷新, 这些问题让我这个第一次接触这种东东的人很好奇啊...

虽然 React 官方文档介绍了使用 React 开发应用的[若干方法](https://reactjs.org/docs/add-react-to-a-website.html), 但和 Create-React-App 比起来差太多, 所以我就想不用 Create-React-App 自己搭建一个简单点的开发环境. 后来发现这个过程要用到 webpack 的很多功能, 很多前端招聘都要求熟练掌握 webpack, 这个东东很利害吗, 我一直很好奇, 本来想学完 React 再学 webpack 的, 现在提前学了.



## package.json 文件说明


以下 6 个 babel 依赖中, 第一二个是核心, 通常都要安装, 第三个用于转换 react component 的 Property Initializers 写法, 没有这个依赖很多 component 无法转换, 第四五个是用来转换 react 和 es6+ 代码的规则, 第六个是 webpack 的 loader, 告诉 webpack 构建打包代码时用 babel 转换了再打包:
```
    "@babel/cli": "^7.5.5",
    "@babel/core": "^7.5.5",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
```

以下两个是 webpack 的插件, webpack 本身的作用是打包 js 文件, 要实现其他功能需要借作各种 plugin 或 loader, 下面两个插件的作用请看 webpack.config.js 文件说明部分:
```
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
```

以下两个是开发 react web 应用应该都会用到的依赖, 当然[不一定需要](https://reactjs.org/docs/add-react-to-a-website.html):
```
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
```

要用 webpack, 当然要先下载 webpack:
```
    "webpack": "^4.39.0",
    "webpack-cli": "^3.3.6",
```

可以实现 webpack 热替换 (Hot Component Replacement 或 Hot Component Reloading) 的东东, 就是修改保存后, 浏览器自动刷新显示你的最新修改:
```
    "webpack-dev-server": "^3.7.2",
```

以下几个 eslint 依赖中, 最主要是 eslint 和 eslint-config-react-app, 前者是 eslint 的主程序, 后者是 Create-React-App 都在用的 sharable eslint config, 其他 eslint 大多是它的 peerDependencies. 顺便一提, 可以用 `npm info "eslint-config-react-app" peerDependencies` 查看一个依赖的 peerDependencies:
```
    "@typescript-eslint/eslint-plugin": "^1.13.0",
    "@typescript-eslint/parser": "^1.13.0",
    "babel-eslint": "^10.0.2",
    "eslint": "^5.16.0",
    "eslint-config-react-app": "^4.0.1",
    "eslint-plugin-flowtype": "^2.50.3",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-react": "^7.14.3",
    "eslint-plugin-react-hooks": "^1.6.1",
```

又一个 webpack loader, 告诉 webpack 使用在 .eslintrc 这个文件定义的方案进行代码检测:
```
    "eslint-loader": "^2.2.1",
```

以下是 css 的提取, 打包, 以及 minify 工具. webpack 打包的时候默认把 css 打包到 js 文件, 这样在页面打开的一瞬间可能会看到页面的原始面目, 所以把 css 单独打包成一个文件可能更好, 这就是mini-css-extract-plugin 的作用, 顾名思义, 用于 extract css, optimize-css-assets-webpack-plugin 的作用是压缩 css 文件, 例如删除空行之类的:
```
    "mini-css-extract-plugin": "^0.8.0",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "css-loader": "^3.1.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
```

用了 optimize-css-assets-webpack-plugin 这个插件后, webpack 突然不能 minify js 文件了, 要用下面这个插件 minify js:
```
    "terser-webpack-plugin": "^1.4.1"

```



## webpack.config.js 文件说明


```
//自动把带 hash 的文件插入 html 模板文件中, 还能 minify html 文件, 例如删除标签属性的引号, 我今天才知道属性的引号是可以删除的...
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

//单独打包 css, 而不是打包在 js 文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

//用了 bash 文件名后, build 的时候自动清理旧的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

//用来 minify css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); 

//用了上面的 css minify 工具后, webpack 默认无法 minify js 文件, 需要再引入这个插件
const TerserWebpackPlugin = require('terser-webpack-plugin'); 

module.exports = {
  output: {
    //webpack 默认把打包后的 js 文件输出为 main.js, 这行属性给文件名加 hash, 实现所谓的 cache busting
    filename: '[name]-[contentHash].js' 
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        //js代码检测, 开启 webpack 的热替换可以实时显示代码错误, 具体的 eslint 规则需在 .eslintrc 定义, 不过其实用 vsc 的 eslint 插件就可以了
        loader: "eslint-loader" 
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          //js代码转换, 具体的转换方案需在 .babelrc 定义
          loader: 'babel-loader', 
          options: {
            //js代码转换规则, 同时需要在 .babelrc 定义
            presets: ['@babel/preset-env', '@babel/preset-react'] 
          }
        }
      },
      {
        test: /\.scss$/,
        //把 sass 转换并 minify 成 css
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      //提供一个模板
      template: "./src/template.html", 
      filename: "./index.html",
      //minify html
      minify: { 
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      //给打包后的 css 文件添加 hash
      filename: '[name]-[contentHash].css', 
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
  ]
}
```



## .babelrc 文件说明


presets 定义了 babel 转换 js 代码的规则, 其中 @babel/preset-react 是转换 react 代码的规则, @babel/preset-env 是把新版 js 代码v转换成大多数浏览器都兼容的 js 代码的规则:
```
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```



## .eslintrc.json 文件说明


用 `npm install` 之后, 可以通过 `npx eslint --init` 创建这个 .eslintrc.json 文件, 不过我们希望用第三方的代码检测规则, 所以要把 `"extends":` 的值改成这个第三方的规则. 我这里用的第三方规则叫 eslint-config-react-app, 所以改成 `"extends": "react-app",`.
```
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "react-app",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
```