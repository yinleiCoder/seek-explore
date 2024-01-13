---
title: HTTP 开发环境 运行环境(Web)
description: 前后端联调必须要懂的HTTP知识，前端开发必须要掌握的开发环境搭建、运行环境搭建与维护
date: '2023-12-29 8:51:01'
tag: 计算机
---

## Contents

## HTTP

对于前端开发考HTTP题目不太多，重点是JS和框架原理；对于后端，HTTP题目就是必问的了，不然怕你写出来的代码有BUG。

前端工程师开发界面，前期通过**Nodejs+Mockjs模拟API接口**，后期需要调用后端提供的接口，进行提交/捕获数据(http协议)。因为涉及到网络请求，所以要求事先掌握好ajax。

### http状态码

**状态码的分类**包括：

- 1xx 服务器收到请求
- 2xx 请求成功
- 3xx 重定向
- 4xx 客户端错误
- 5xx 服务端错误

**常见的状态码**包括：

- 200 成功
- 301 永久重定向 配合location浏览器自动处理
- 302 临时重定向 配合location浏览器自动处理
- 304 资源未被修改
- 403 没有权限
- 404 资源未找到
- 500 服务器错误
- 504 网关超时

关于**协议和规范**：本质就是一个约定，要求大家都跟着执行，不要违反规范。

### restful API

http的method演变：

- 传统的methods
  - get 获取服务器的数据
  - post 向服务器提交数据
  - 简单的网页功能就这两个操作
  - 这是http 1.0之前
- 现代的methods
  - get 获取数据
  - post 新建数据
  - patch/put 更新数据
  - delete 删除数据
- Restful API
  - 新的API设计方法，典型的就是Github Restful API
  - 传统API设计是把每个URL当作一个功能，而Restful api是把每个url当作一个唯一的资源

如何**把URL设计成一个资源**：

- 尽量不用url参数
  - 传统：/api/list?pageIndex=2
  - 现代：/api/list/2
- 用method表示操作类型
  - 传统：post /api/create-blog post /api/update-blog?id=1 get /api/get-blog?id=100
  - 现代：post /api/blog patch /api/blog/100 get /api/blog/100

### http headers

- **Request Headers**
  - Accept 浏览器可接收的数据格式
  - Accept-Encoding 浏览器可接收的压缩算法
  - Accept-Language 浏览器可接收的语言
  - Connection: keep-alive 一次TCP连接重复使用
  - cookie 浏览器每次请求时候自己带上
  - Host 域名
  - User-Agent 浏览器信息标识
  - Content-Type 发送数据的格式
- **Response Headers**
  - Content-length 返回数据大小
  - Content-Encoding 返回数据的压缩算法
  - Content-Type 返回数据的格式
  - Set-Cookie 改cookie
- **自定义headers**
  - 如axios中添加:headers: {'X-Requestd-With': 'XXX'}
- **缓存相关的headers**
  - Cache-Control Expires
  - Last-Modified If-Modified-Since
  - Etag If-None-Match

### http缓存

缓存，把没有必要重新获取的数据存起来。需要缓存的原因就是让页面加载更快一些，速度的瓶颈是网络请求。**静态资源可以被缓存**。

**http缓存策略：强制缓存+协商缓存**

#### 强制缓存

强制缓存：浏览器初次请求js文件，服务端返回资源和Cache-Control,如果服务器觉得该资源可以被缓存就会加上Cache-Control。而Cache-Control是在Response Headers中，它可以控制强缓存的逻辑，例如Cache-Control: max-age=3156000s。当浏览器再次请求，判断Cache-Control的时间有效，就找本地缓存直接返回资源。当某天缓存失效时，就会再次去请求服务端重新走上述流程。

![强制缓存](/images/webEnv/cache-control.png)

Cache-Control的值：

- max-age
- no-cache 正常向服务端请求
- no-store 不用服务端缓存措施(不同协商缓存)
- private
- public

**Expires**:

- 和Cache-Control同在Response Headers中
- 都是控制缓存过期
- 但已经被Cache-Control代替

#### 协商缓存

协商缓存(对比缓存)：一种服务端缓存策略。服务端来判断资源是否可以被缓存而不是服务端去缓存。服务端可以告诉客户端这个资源没有动，可以直接用本地，不用让服务端给你。即**服务端判断这个资源能不能用缓存的内容**。服务器判断客户端资源，是否和服务端资源一样，如果一致就返回304，否则返回最新资源和200。

![协商缓存](/images/webEnv/cache-control2.png)

资源标识，在Response Headers中有2种：

- Last-Modified 资源的最后修改时间
- Etag 资源的唯一标识

![资源标识Last-Modified](/images/webEnv/cache-control3.png)

![资源标识Etag](/images/webEnv/cache-control4.png)

当Last-Modified和Etag同时出现时，会优先使用Etag。因为Last-modified只能精确到秒。如果资源被重复生成，而内容不变，则Etag更精准。

![资源标识Etag](/images/webEnv/http-cache.png)

> 刷新方式的不同对缓存的影响:
> 1. 正常操作：地址栏输入url、跳转链接、前进后退按钮等。强制缓存有效，协商缓存有效。
> 2. 手动刷新：F5、右键菜单刷新、点击刷新按钮。强制缓存失效，协商缓存有效。
> 3. 强制刷新：ctrl+F5。强制缓存失效，协商缓存失效。

### https

#### http和https

http是明文传输，敏感信息容易被中间劫持。而**https=http+加密**，即使被劫持也无法解密。

#### 加密方式：对称加密、非对称加密

- 对称加密：一个key同时负责客户端与服务端的加密、解密
- 非对称加密：一对key,A加密之后，只能用B来解密
- https同时用到了对称加密、非对称加密，这是因为成本高效

#### https证书

- 中间人攻击，证书防止key掉包
- 使用第三方证书
- 浏览器校验证书

## 开发环境(web)

面试官**通过开发环境了解候选人的实际工作情况**，通过开发环境的工具能**体现工作产出的效率**。这也是前端、后端开发的基础知识，甚至是程序员的基础能力。

### Git

Git是最常用的**分布式代码版本管理工具**，因为**大型项目需要多人协作开发**，所以必须要熟用Git，这也是每位开发者的必知必会的技能，所以没必要也不应该在简历上写“熟练Git”，这是一个很蠢的做法。

Mac OS自带git,windows去官网下载安装。Git服务端常见的有github、gitlab、coding.net、码云等，**大公司会搭建自己的内网git服务(一般用gitlab)**。

添加公私钥使用SSH请访问Github文档，文档有详细说明。以下为常用的Git命令：

```git
git status
git add .
git commit -m 'xxxx'
git checkout xxx // 撤销/切换分支
git push origin main
git pull origin main
git branch
git checkout -b xxx / git checkout xxx// 切换新的分支
git fetch
git merge xxx 
git diff xxxx
git log
git show xxx
git stash
git stash pop
```

> Git官网有提供《Pro Git》中文版书籍

### 调试工具

**chrome调试工具**是前端工程师必备的技能。

- Elements
- Console
- debugger
- Network
- Application

### 抓包

开发移动端H5页，查看网络请求，就需要抓包工具。windows用**Fiddler**、Macos用**Charles**。

抓包过程：

- 手机、电脑处于同一个局域网
- 将手机代理到电脑上
- 手机浏览移动端H5页，进行抓包
- 查看网络请求
- 网址代理
- https

### Webpack、Babel

> 深入了解webpack和babel，请查看我的另一篇文章《webpack、babel、vite(web)》

**webpack**是前端标配的**打包工具**(现在是Vite)，**Babel**是**转译语法**的工具。ES6模块化，浏览器之前不支持；ES6语法，浏览器之前也并不完全支持。且为了让网页加载更快，需要压缩代码、整合代码。

首先要安装**nodejs**,通过**npm init -y**初始化环境，然后通过**npm install webpack webpack-cli -D**安装webpack(现在是webpack5)。最后新建webpack的配置文件:**webpack.config.js**，通过**webpack --config webpack.config.js**去运行webpack。也可以安装一个插件提升开发效率**npm install html-webpack-plugin -D**、**npm install webpack-dev-server -D**。

```javascript
// webpack.config.js
const path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
    }
}

// package.json
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
}
```

Babel，**将ES6等高版本转为ES5语法保证代码的兼容性**。安装babel:**npm install @babel/core @babel/preset-env babel-loader -D**。在项目中新建 **.babelrc**文件：

```js
// .babelrc
{
    "presets": ["babel/preset-env"],
}

// webpack.config.js
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {// babel配置在这里
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }
        ]
    }
    plugins: [
        new  HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
    }
}
```

**ES6模块化规范**，默认支持，不用配置。【关于模块化规范和各类之间的差别，请查阅JS红宝书，尤其是要注意模块化规范在Electron中的坑】

```javascript
export function fn() {

}
export const name = 'yinlei'


import { fn, name } from './xxxx'
```

**生产环境打包**的webpack配置，新建**webpack.prod.js**:

```javascript
// webpack.prod.js
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {// babel配置在这里
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }
        ]
    }
    plugins: [
        new  HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ],
}
```

### Linux命令

公司**线上机器一般都是Linux**（例如阿里云），**测试机也要保持一致用Linux**。如果**测试机或线上机出了问题，本地又不能复现，需要去排查**。但是Linux内容那么多，需要掌握哪些内容呢？好多几十年的程序员也用不了那么多命令，本文不会将必会的linux基础知识和命令放在这里，而是放在我的另一篇文章**《Linux的方方面面》**，我会整理作为开发人员而不是运维人员应该掌握的Linux内容。

## 运行环境(web)

在前端开发中，**运行环境即浏览器(server端有nodejs)**。浏览器会下载网页代码，渲染出页面，期间还会执行若干JS。我们需要做的就是**保证代码在浏览器中：稳定且高效**。

### 网页加载过程

#### 加载资源的形式

- html代码
- js、css代码
- 媒体文件(图片、视频等)

#### 加载资源的过程

- DNS解析：域名映射IP地址
- 浏览器根据IP地址向服务器发起http请求
- 服务器处理http请求，返回响应给浏览器

#### 渲染页面的过程

- 根据HTML代码生成DOM Tree
- 根据CSS代码生成CSSOM
- 将DOM Tree和CSSOM整合为Render Tree
- 根据Render Tree渲染页面
- 遇到script则暂停渲染，优先加载并执行script代码，完成再继续
- 直到把Render Tree渲染完成

#### 【面试题】从输入url到渲染出页面的整个过程

- 下载资源：各个资源类型，下载过程
- 渲染页面：结合html css js img等 

#### 【面试题】window.onload、DOMContentLoaded的区别

- window.onload: 资源全部加载完才能执行，包括图片
- DOMContentLoade: DOM渲染完成即可，图片可能尚未下载

```javascript
window.addEventListener('load', function() {
    console.log('window loaded')
})

document.addEvenetListener('DOMContentLoaded', function() {
    console.log('dom content loaded')
})
```

### 前端性能优化

性能优化没有标准答案，重要的是你脑子里有多少性能优化方案。手写防抖、节流等问题，可以算作体验优化，也是性能优化。

**性能优化的原则**是：

- 多使用内存、缓存或其他方法
- 减少CPU计算量
- 减少网络加载耗时

以上性能优化原则使用于所有编程的性能优化，这就是著名的**空间换时间**。

**性能优化的解决方案**：

- **让加载更快**
  - 减少资源体积：压缩代码
  - 减少访问次数：合并代码、合并图片(雪碧图)、SSR服务端渲染、缓存
  - 使用更快的网络：CDN
- **让渲染更快**
  - CSS放在head,js放在body最下面
  - 尽早开始执行JS，用DOMContentLoaded触发
  - 懒加载(图片懒加载，上滑加载更多)
  - 对DOM查询进行缓存
  - 频繁DOM操作，合并到一起插入DOM结构
  - 防抖debounce、节流throttle

### 前端体验优化

防抖、节流在Vue、React库中有相应实现，如React的ahooks、Vue的VueUse。

#### 防抖debounce

场景：监听一个输入框，文字变化后触发change事件。若直接用keyup事件，那么会频繁触发change事件，所以可以加入**防抖：用户输入结束或在暂停时，才会触发change事件。**

```javascript
const input = document.getElementById('input')

let timer = null

input.addEventListener('keyup', function() {
    if(timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        console.log(input.value)
        timer = null
    }, 500)
})
```

把防抖功能封装一下：

```javascript
// 防抖
function debounce(fn, delay=500) {
    let timer = null // 闭包
    return function (){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null 
        }, delay)
    }
}
```

#### 节流throttle

场景：拖拽一个元素时，要随时拿到该元素被拖拽的位置。若直接用drag事件，则会频繁触发，很容易导致卡顿。所以**节流：无论拖拽速度多块，都会每隔多少ms触发一次。**

```javascript
const div = document.getElementById('div')

let timer = null

div.addEventListener('drag', function(e) {
    if(timer) {
        return 
    }
    timer = setTimeout(() => {
        console.log(e.offsetX, e.offsetY)
        timer = null
    }, 500)
})
```

把节流函数封装一下：

```javascript
// 节流
function throttle(fn, delay=300) {
    let timer = null
    return funciton (){
        if(timer) {
            return
        } 
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
```

### web安全

这部分内容要深入的话,请看 **《白帽子讲web安全》**。

#### XSS跨站请求攻击

场景：我的这个博客网站，用户发表一篇博客，其中嵌入script脚本，该脚本内容是获取cookie,发送到这个用户的服务器上。当发布这篇博客，有人查看它，就能看到访问者的cookie。

**XSS攻击预防**：

- 替换特殊字符，这样script标签的特殊字符就直接显示而不会作为脚本执行
- 前端要替换，后端也要替换，前端防君子，后端防小人
- npm上可以搜xss这个包使用

#### XSRF跨站请求伪造

场景：你在购物，看上了某个商品，商品的id是1，付费接口是xxx.com/pay?id=1,但没有任何验证。攻击者看上了一个id是2的商品，攻击者向你发送一封电子邮件，邮件的标题很吸引人，邮件正文隐藏着\<img src="xxx.com/pay?id=2" \/> ，只要你查看邮件，就帮攻击者购买了该商品。

但是这种现在已经不多见了，这在早期常见。

**XSRF预防**：

- 使用POST接口
- 增加验证(双A认证、短信验证码)


