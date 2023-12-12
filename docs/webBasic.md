---
title: 前端开发技能树
description: 前端开发基础、知识深度广度、项目流程、项目设计、工作中的常见问题
date: '2023-09-28 15:54:22'
tag: 计算机
---

> 企业最基本的要求：能干活

# 前端组件、状态设计

作为Vue/React工程师，**掌握框架的使用及其高级特性**是我们的吃饭本事，同时，在二面时还会考察我们能否独立负责项目，体现我们的**设计能力**(尤其是2~3年工作经验)。大多组件、状态的设计是通过**场景题**的方式考察。

Vue、React等框架是：

- 数据驱动视图
- 状态：数据结构设计
- 视图：组件结构和拆分

## 设计流程

- 设计原型图
- state数据结构设计
- 组件设计（拆分、组合）、组件通讯
- 编写代码

## state数据结构设计

- 用**数据描述**所有的**内容**(非功能)
- 数据要**结构化**，易于程序操作、遍历、查找
- 数据要**可扩展**，以便增加新的功能

## 组件设计

- 从**功能上拆分**层次
- 尽量让**组件原子化**，组件吸收复杂度
- 区分**容器组件**（只管理数据）、**UI组件**（只显示视图）

【场景题】比如，面试官请你设计购物车的组件，请用Vue/React实现：

```javascript
<App>
    <ProductionList>
        <ProductionItem></ProductionItem>
        <ProductionItem></ProductionItem>
        <ProductionItem></ProductionItem>
    </ProductionList>
    <CartList>
        <CartItem></CartItem>
        <CartItem></CartItem>
    </CartList>
</App>


//data.vue
<template>
    <div>
        <ProductionList :list="productionList"/>
        <CartList :productionList="productionList" :cartList="cartList"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            productionList: [
                {
                    id: 1,
                    title: '鞋子',
                    price: 199,
                },
                // ...
            ],
            cartList: [
                {
                    id: 1,
                    quantity: 1
                },
                // ...
            ]
        }
    },
    methods: {
        addToCart(id) {
            const product = this.cartList.find(item => item.id === id)
            if(product) {
                product.quantity++
            }
            this.cartList.push({id, quantity:1})
        }
    }
    mounted() {
        event.$on('addToCart', this,addToCart)
    }
}
</script>

// productionList.vue
<template>
    <div>
        <ProductionItem v-for="item in list" :key="item.id" :item="item"/>
    </div>
</template>

// productionItem.vue
<template>
    <div>
        {{item.title}}
        {{item.price}}
        <button @click="clickHandler(item.id, $event)">加入购物车</button>
    </div>
</template>
<script>
    export default {
        methods: {
            clickHandler(id, e) {
                e.preventDefault()
                event.$emit('addToCart', id)
            }
        }
    }
</script>
// 等等，还可以加入vuex进行状态管理
```

# 前端项目设计、流程

## 项目流程

- 项目分多人、多角色参与
- 项目分多阶段
- 项目需要计划和执行

### 为何考察项目流程

- 确保我们真正参与过**实际项目**
- 确保我们能**真正解决项目的问题**
- 看我们能否**独立承担起一个项目**、能否作为项目负责人

## 项目中的所有角色

- PM**产品经理**
- UE**视觉设计师**
- FE**前端开发工程师**
- RD**后端开发工程师**
- CRD**移动端开发工程师**
- QA**测试人员**

## 项目的全流程

- **需求分析**：各个角色
- **技术方案设计**：前端、后端、移动端
- **开发**：前端、后端、移动端
- **联调**：前端、后端、移动端
- **测试**：前端、后端、移动端、测试
- **上线**：前端、后端、移动端

## 各个阶段遇到的破事

### 评审时，需求分析（前端开发工程师）

- 了解背景
- 质疑需求是否合理
- 需求是否闭环
- 开发难度如何
- 是否需要其他支持
- 不要急于给排期

### 做好技术方案设计

- 求简，不过度设计
- 产出文档
- 找准设计重点
- 组内评审
- 和其他开发者沟通
- 发出会议结论，保留证据

### 保证代码质量

- 反馈排期、预留空间
- 符合开发规范
- 写出开发文档
- 单元测试
- Mock API模拟数据
- Code Review代码审查

### 和PM扯皮：PM突然加需求

- 让UE确定视觉效果
- 让PM确定产品功能
- PM突然加需求，不能拒绝，但是要走需求变更流程，按照公司规定流程走，否则，发起项目组和leader的评审，重新评估排期

### 不要对测试人员说：我在我电脑上没问题

- 提测发邮件，抄送项目组
- 测试问题要详细记录
- 有问题及时沟通
- 当面讨论，让QA帮你复现
- 若需要特定设备才能复现，让QA提供设备

### 上线后的扯皮

- 上线后及时通知QA回归测试
- 上线后及时同步给PM、项目组
- 若有问题，及时回滚，再排查问题

## 项目沟通

- 多人协作，沟通是最重要的事情（可以看看纪录片Code Rush）
- 及时沟通，有事说事，无事报平安（我之前的公司是每周一沟通）
- 及时识别风险、汇报

# 前端知识的深度

> 看看你的技术天花板,也是入职定级的重要参考标准,主要考察原理

## JS内存泄漏

> 回收什么？什么是garbage?  
> 回收函数已经完成且再也用不到的数据；garbage是不符合用户预期的内存占用

符合用户预期的占用不是garbage，同时我们常用的闭包的数据常驻内存，但闭包一定是内存泄漏吗？严格上说闭包不算内存泄漏，内存泄漏是属于非预期的情况。

JS引擎的垃圾回收算法：**引用计数**(很早，JVM之前也采用过这种方式，不过会有循环引用的问题)转变为**标记清除**（比如JVM现在区分老年代等等） 

JS内存泄漏的检测：就是检测内存的变化（不管你是什么语言的内存泄漏）可以通过chrome浏览器的Performance选项卡检测JS内存泄漏。最常见的内存泄漏就是前端的addEventListener却不解绑！

Vue中的内存泄漏：
- 被全局变量、函数引用，组件销毁时未清除
- 被全局事件、定时器引用，组件销毁时未清除
- 被自定义事件引用，组件销毁时未清除

## 浏览器、nodejs中的事件循环的区别 

在浏览器、nodejs中，js是单线程的，浏览器中js执行、dom渲染共用一个线程，而异步就是单线程的解决方案。其中的微任务是在下一轮DOM渲染前执行，宏任务在之后进行。

Nodejs同样使用ES语法，也是单线程+异步。异步任务也分为宏任务、微任务。但是它的宏任务和微任务，分为不同的**类型**，有不同的**优先级**。

nodejs中的宏任务：

- Timers: setTimeout setInterval
- I/O callbacks: 处理网络、流、TCP的错误回调
- Idle、prepare：闲置状态(nodejs内部使用)
- Poll轮询：执行poll中的I/O队列
- Check检查：存储setImmediate回调
- Close callbacks: 关闭回调，如socket.on('close')

nodejs中的微任务：

- promise
- async/await 
- process.nextTick(优先级最高)

```javascript
console.info('start')
setImmediate(() => {
    console.info('setImmediate')
})
setTimeout(() => {
    console.info('timeout')
})
Promise.resolve().then(() => {
    console.log('promise then')
})
process.nextTick(() => {
    console.info('nextTick')
})
console.info('end')
// start
// end
// nextTick
// promise then 
// timeout
// setImmediate
```

nodejs中的event loop:

- 执行同步代码
- 执行微任务
- 按照顺序执行6个类型的宏任务（每个结束时都执行当前的微任务）

> 浏览器、nodejs中的event loop流程基本相同  
> nodejs宏任务、微任务分类型、分优先级

## 为什么执着于虚拟DOM

Virtual DOM(虚拟DOM)。其用JS对象来模拟DOM节点的数据，我们可以在React、Vue中看到VDOM的身影。这就离不开我们老生常谈的，Vue、React等框架和jQuery的价值，哪个性能更好？哪个开发效率更高？

Vue、React最著名的价值：
- 组件化
- 数据视图分离、数据驱动视图
只关注业务数据，不用关注DOM变化，但这也是对自己个人职业发展不好的方向。

其中数据驱动视图的方案就是VDom，其UI的更新就是VDOM的diff算法比较vnode、oldvnode。jQuery肯定快，但是为什么jQuery还是成为了明日黄花了？甚至android的Compose、Flutter框架的兴起，都是声明式框架，这就是**效率与性能的平衡**！

> vdom并不快、JS直接操作DOM才是最快的  
> 但是存在即合理，数据驱动视图可以不用全部重建DOM  
> 现在前端还新出了一款不用vdom的框架：svelte。这个问题饱受争议，经过测试，该框架的性能并没有其官网上说的那么夸张~

就拿React来说：components -> browser js engine -> virtual dom nodes -> diff between previous dom and updated virtual dom -> update dom with the help of reconciliation diffing algorithm

## js中的for、forEach该用谁

```javascript
let arr = []
for(let i=0;i < 100*10000;i++) {
    arr.push(i)
}
const length = arr.length

console.time('for')
let count1 = 0
for(let i=0; i < length;i++){
    count1++
}
console.timeEnd('for')

console.time('forEach')
let count2 = 0
arr.forEach(() => count2++)
console.timeEnd('forEach')
``` 

结果显示：for比forEach快很多倍。这是因为forEach用起来很爽，但是forEach的唯一参数callback是一个function,通过创建一个函数来调用肯定耗时多一点，因为要保存函数的上下文信息等会产生额外的开销，而for则创建的是块级作用域。

> 现成的API肯定好，比如js中的include，但是你不考虑一下include函数是怎么实现的吗？时间复杂度?但是日常开发中，别只考虑性能，因为日常开发用不了上面测试这么大的数据，forEach反而代码可读性更好！

## nodejs开启进程及进程间的合法通讯

进程，OS进行资源分配和调度的最小单位，有独立的内存空间。而线程，OS进行运算调度的最小单位，共享进程内存空间。

> js红宝书中提到：js是单线程，但存在多进程执行方式，如web worker

JS是单线程，但我们还是需要多进程，因为现代计算机都是多核CPU，更适合处理多进程，且内存大，多个进程才能更好的利用起来。总之，多进程可以进一步充分使用机器的资源。

```javascript
//nodejs多进程
const http = require('http')
const fork = require('child_process').fork
const server = http.createServer((req, res)=>{
    if(req.url==='/test') {
        console.info('main process id', process.pid)
        // 开启子进程
        const computeProcess = fork('./compute.js')
        computeProcess.send('start compute')
        computeProcess.on('message', data => {
            console.log('main process received data:', data)
            res.send('sum is '+data)
        })
        computeProcess.on('close', () => {
            console.info('child process error')
            computeProcess.kill()
        })
    }
})
server.listen(3000, () => {
    console.info('localhost:3000')
})
console.info(process.pid)

// webworker进程
// fork cluster进程
// compute.js
function getSum() {
    // 子进程计算耗时任务
    let sum = 0
    for(let i=0;i< 10000;i++) {
        sum += i
    }
    return sum
}
process.on('message', data => {
    console.info('child process id', process.pid)
    console.info('child process received message: ', data)
    const result = getSum()
    // 发送消息给主进程
    process.send(result)
})
```

> 实际过程中，笔者之前在公司就是用的PM2来开启进程守护

## JsBridge的实现原理

一般常见于混合APP中，因为前端也可以做APP，但是做的不是原生的APP，JS无法直接调用native API，需要特殊的格式来调用，统称为JS-Bridge，例如微信SDK、Flutter的插件就是一个很好的例子。

主要角色为：

- JavaScript
- JSBridge
- Native

chrome就是一个以webview为主的APP，可以从chrome extension中查看chrome的运行原理。简单的就说，你开发一款原生的新闻app，但是新闻详情页前端已经做过了，于是，你在这个app中套一个webview,让webview去加载写好的新闻详情页，但是此时新闻详情页有一个链接想跳转，链接是跳转到其他APP，此时网页跳转无法实现该功能，于是只能借助原生APP，原生APP通过写好跳转APP的代码，把写好的功能封装成API，提供给webview里面的前端网页去调用，于是，前端JS就通过原生app提供的能力进而实现了功能。

JS-Bridge的实现方式：

- **注册全局API**: 不太适合异步
- **URL Scheme**：更加推荐

```javascript
const sdk = {
    invoke(url, data, onSuccess,onErr) {
        // ....
    }
}
```

## Vue的生命周期

每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。这些钩子应当在组件初始化时被同步注册。

- **beforeCreate**
  - 创建空白的vue实例
  - data、method尚未被初始化，不可使用 
- **created**
  - vue实例初始化完成，完成响应式绑定
  - data、method都已经初始化完成，可调用
  - 尚未开始渲染模板
- **beforeMount**
  - 编译模板，调用render生成vdom
  - 还没有开始渲染DOM
- **mounted**
  - 完成DOM渲染
  - 组件创建完成
  - 开始由创建阶段进入运行阶段
- **beforeUpdate**
  - data发生变化之后
  - 准备更新DOM，尚未更新DOM
- **updated**
  - data发生变化，且DOM更新完成
  - 不要修改data，可能导致死循环
- **beforeUnmount**
  - 组件进入销毁阶段，但是尚未销毁，可正常使用
  - 可移除、解绑全局事件、自定义事件
- **unmounted**
  - 组件被销毁了
  - 所有子组件也都被销毁了

![vue3生命周期](/images/webFramework/lifecycleVue.png)

mounted和updated都不能保证子组件全部挂载完成，需要使用$nextTick渲染DOM。当使用ajax时，可以选择created、mounted，但是倾向于mounted。在Vue3的改变中，setup代替了beforeCreate、created，且全部使用了Hooks函数的形式。

## Vue Router的MemoryHistory

Vue-Router官网给出了如下模式：
- Hash: location.hash
- WebHistory: history.pushState、window.onpopstate
- MemoryHistory: url不会发生变化

## Vue2、Vue3、React的diff算法的区别

diff算法：如果要严格diff两颗tree,时间复杂度O(n^3)不可用。

Vue/React的diff算法优化O(n)：

- 只比较同一层级，不跨级比较
- tag不同则删掉重建，不再去比较内部的细节
- 子节点通过key区分，体现key的重要性

1. React diff: 仅右移
2. Vue diff: 双端比较
3. Vue3 diff: 最长递增子序列

key的重要性：

- vdom diff算法根据key判断元素是否要删除
- 匹配了key,只移动元素，性能较好
- 未匹配key,删除重建，性能较差

# 前端知识的广度

> 现在的前端比清朝的后宫还杂，不想做Full Stack的程序员不是好程序员~但广则不能深，深则不能广

## 移动端H5 click 300ms延迟解决

最早是乔帮主展示iphone的时候，那时候小iphone访问电脑网页看不全，想要实现double tap to zoom。但是问题是我如果是一次tap呢？下一次会不会还有第二次tap?所以就有了300ms的延迟，第一点击事件后等300ms如果不是其他事件就执行第二次tap to zoom。但是300ms人眼还是很明显，所以出现了一个FastClick的库：

```javascript
window.addEventListener('load', function() {
    FastClick.attach(document.body)
}, false)
```

FastClick的原理：
- 监听touchend事件，touchstart touchend先于click触发
- 使用自定义DOM事件模拟一个click事件
- 把默认的click事件(300ms之后触发)禁止掉

现代浏览器的改进：

```javascript
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
```

## 网络请求中的token、cookie的区别

cookie:
- http无状态，每次请求都带上cookie，以识别身份
- 服务端也可以向客户端set-cookie
- cookie限制在4kb
- 默认有跨域限制：不可跨域共享、传递cookie
- 现代浏览器禁止网页引入的第三方js设置cookie
- cookie主要用于登录验证，存储用户标识
- session在服务端，存储用户详细信息和cookie信息一一对应
- cookie+session是传统的登录解决方案

cookie和token的区别：
- cookie是HTTP规范，token是自定义传递
- cookie会默认被浏览器存储，token需要自己存储
- token默认没有跨域限制
- token一般用于JWT做用户登录解决方案
- cookie：http标准、跨域限制、配合session使用
- token: 无标准、无跨域限制、用于JWT

JWT:
- 前端发起登录，后端验证成功之后，返回一个加密token
- 前端自行存储这个token
- 以后访问服务端就带着这个token,通过添加到请求头

> Session和jwt那种更适合  
> - session原理简单容易学习、用户信息存储在服务端，可快速封禁某个用户，但占用服务端内存，硬件成本高，多服务器时不容易同步，需要使用第三方缓存redis，且默认有跨域限制
> - jwt不占用服务端内存，且多服务器不受影响，没有跨域限制，但用户信息存储在客户端，无法快速封禁某用户，万一服务端密钥泄漏用户信息全部丢失
> 严格管理用户信息的需求就推荐用session
> 没有特殊要求就jwt

## SSO单点登录

主域名相同，基于cookie:
- cookie默认不可跨域共享，但有些情况下可设置为共享
- 主域名相同，如www.yinlei.pro、image.yinlei.pro
- 设置cookie domain为主域名即可共享cookie

主域名不同，使用SSO：
- 主域名完全不同，则cookie无法共享
- 使用SSO技术方案，第三方独立服务

OAuth2.0:
- 如Github登录、QQ登录、微信登录
- client
- resource owner
- authorization server
- resource server

## HTTP协议、UDP协议的区别

- HTTP协议在OSI的应用层
- TCP UDP协议在OSI的传输层
- TCP有连接、有断开、稳定传输
- UDP无连接、无断开、不稳定传输、效率高

> osi的体系结构
> - 应用层
> - 表示层
> - 会话层
> - 运输层
> - 网络层
> - 数据链路层
> - 物理层

而tcp/ip体系结构：

- 应用层
- 运输层TCP UDP
- 网际层
- 数据链路层
- 物理层

## HTTP协议1.0、1.1、2.0的区别

HTTP 1.0：
- 最基础的HTTP协议
- 支持GET POST

HTTP 1.1:
- 缓存策略cache-control、E-tag
- 支持长连接Connection: keep-alive、一次tcp连接多次请求
- 支持断点续传，状态码206
- 支持Restful api

HTTP 2.0：
- 压缩header
- 多路复用
- 服务端推送

## script标签的deffer、async的区别

> 这是js红宝书上第一章就有的，很细

- 什么都不加：HTML暂停解析、下载JS、执行JS、再继续解析HTML
- defer: HTML继续解析、并行下载JS、HTML解析完再执行JS
- async: HTML继续解析、并行下载JS、执行JS,再继续解析HTML

## WebSocket、HTTP的区别

websocket:
- 支持端对端通讯
- 可由client发起、可由server发起
- 用于：消息通知、直播间讨论区、聊天室、协同编辑等

```javascript
//server.js
const { WebSocketServer } = require('ws')
const wsServer = new WebSocketServer({port: 3000})
wsServer.on('connection', ws => {
    console.info('connected')
    ws.on('message', msg => {
        console.info('received message', msg)
        setTimeout(() => {
            ws.send('server received message:'+msg.toString())
        }, 2000)
    })
})

//client.js
const ws = new WebSocket('ws://127.0.0.1:3000')
ws.onopen = () => {
    console.info('opened')
    ws.send('client opened')
}   
ws.onmessage = event => {
    console.log('client received message:'+event.data)
}
```

websocket的连接过程：
- 先发起http请求
- 成功后再升级到websocket协议进行通讯

websocket、http区别：
- websocket: ws://、可双端发起请求、无跨域限制
- ws通过send、onmessage通讯，http通过req、res通讯
- ws可升级为wss,http可升级为https

> 实际项目中，我之前用的是socket.io

websocket和http长轮询的区别：
- http长轮询：客户端发起请求、服务端阻塞、不会立即返回
- websocket：客户端可发起请求、服务端也可以发起请求
- http长轮询需要处理timeout

## 输入url到页面展示发生了什么

1. **网络请求**

- DNS查询得到IP，建立TCP连接
- 浏览器发起HTTP请求
- 收到请求响应，得到HTML源代码
- 继续请求静态资源
- 静态资源可能有强缓存，此时不必请求

2. **解析**

- 字符串解析为结构化数据
- HTML构建DOM树
- CSS构建CSSOM树
- DOM+CSSOM结合形成render tree
- 优化解析

3. **渲染**

- render tree绘制到页面上
- 计算各个DOM的尺寸、定位，最后绘制到页面上
- 遇到js可能会执行
- 异步CSS、图片加载等可能会触发重新渲染

> 现代浏览器的渲染机制复杂，不要纠结细节

## 重绘repaint、重排reflow的区别

动态网页随时都会重绘、重排：
- 网页动画
- modal dialog
- 增加、删除、显示、隐藏元素

repaint:
- 元素外观改变
- 但元素的尺寸、定位不变，不会影响其他元素的位置

reflow:
- 重新计算尺寸、布局，可能影响其他元素的位置
- 重排比重绘影响更大、消耗更大
- 尽量避免无意义的重排
- 集中修改样式、直接切换css class
- 修改之前先设置display: none,脱离文档流
- 使用BFC特性，不影响其他元素位置
- 频繁触发使用节流、防抖
- createDocumentFragment批量操作DOM
- 优化动画，使用requestAnimationFrame

## 网页、iframe的通讯

- 使用postMessage通讯
- 注意跨域的限制、判断

```javascript
<iframe id="iframe1" src="./child.html"></iframe>

window.iframe1.contentWindow.postMessage('hello', '*')
window.addEventListener('message', event => {
    console.log('origin', event.origin)
    console.log(event.data)
})

// child.html
window.parent.postMessage('world', '*')
window.addEventListener('message', event => {
    console.log('origin', event.origin)
    console.log(event.data)
})
```

## 网页的多标签通讯

- **使用websocket**
  - 无跨域限制
  - 需要服务端支持、成本高
- **使用localStorage通讯**
  - 同域的两个页面
  - 跨域不共享
- **使用sharedworker通讯**
  - sharedworker是webworker的一种
  - webwoker开启子进程执行js，但不能操作dom
  - 可单独开启一个进程，用于同域页面通讯

# 笔者真实工作上遇到的业务场景

> 有经验的开发者培养成本较低。业务场景需要考量：
> - 识别**需求**、转换为功能
> - **功能模块**的设计
> - **数据结构**的设计  
> 
> 看整体设计，不要纠结细节

## 节日哀悼，网站变灰

这个需求对于前端来说还比较简单，如果放到APP变灰，就有一定的复杂度。主要使用的是CSS灰阶滤镜：

```css
filter: grayscale(1);
```

> google的源代码中显示，该灰阶滤镜采用的是转换矩阵

## 公司官网轮播图实现思路（不用lib，实际工作还是用的vue lib）

一个div套一个id为carousel的div。carousel的div的宽高和父元素保持一致，这个区域使用flex布局，里面放着一个个id为item的div表示具体的轮播图。只需要控制这些轮播图的父元素左右移即可，最外层的div设置overflow: hidden。

```javascript
<div class="container">
    <div class="carousel">
        <div class="item">
            <a>
                <img src="xxx" alt="xx"/>
            </a>
        </div>
         <div class="item">
            <a>
                <img src="xxx" alt="xx"/>
            </a>
        </div>
         <div class="item">
            <a>
                <img src="xxx" alt="xx"/>
            </a>
        </div>
    </div>
    <div class="indicator">
        <span class="active"></span>
        <span></span>
        <span></span>
    </div>
</div>

.container {
    width: 500px;
    height: 300px;
    margin: 10px auto;
    overflow: hidden;
    position: relative;
}

.carousel {
    width: 100%;
    height: 100%;
    display: flex;
    transition: 0.5s;
}

.indicator {
    bottom: 4px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.indicator span{
    width: 8px;
    height: 8px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin: 0 3px;
}

.indicator span.active{
    border: 1px solid red;
}

let doms = {
    carousel: document.querySelector('.carousel'),
    indicators: document.querySelectorAll('.indicator span'),
}

function moveTo(index) {
    doms.carousel.style.transform = `translateX(-${index}00%)`
    let active = document.querySelector('.indicator span.active')
    active.classList.remove('active')
    doms.indicators[index].classList.add('active')
}

doms.indicators.forEach((item, index) => {
    item.onclick = function() {
        moveTo(index)
    }
})
```

> 同时注意：还需要考虑指示器的防抖问题优化性能

## 公司官网失活页面的setInterval

给公司官网自己封装lib实现自动滚动轮播图，一个bug就是当我切换浏览器的tab，再回去后，发现错位。经过debug，发现是因为chrome浏览器会觉得你切换标签页后，原来的标签页都隐藏了，为了减少消耗，就不会那么去频繁执行setInterval，这个也可以理解，且setInterval设置的时间是放入队列的时间。

思路：当浏览器切换标签页面时，把自动滚动轮播图的逻辑暂停，切回来后再恢复，只需要监听页面的可见度是否变化。

```javascript
document.addEventListener('visibilitychange', function() {
    console.log(document.visibilityState)
})
```

> js红宝书上有提及页面可见度的问题

## 判断语义版本规范的版本号大小

语义版本规范: x.y.z[-p]

思路：遍历不够高效，可以使用迭代器一步步返回出来比较

```javascript
function* walk(str) {
    let part = ''
    let terminals = ['.', '-']
    for(let i=0;i<str.length;i++) {
        if(terminals.includes(str[i])) {
            // 终结符
            yield part
            part = ''
        } else {
            part += str[i]
        }
    }
    if(part) {
        yield part
    }
}
const iterator = walk('1.2.1-beta')
// let n = iterator.next()
for(const item of iterator){
    console.log(item)
}
```

## 零宽字符引发的BUG

之前碰上一个问题，做公司后台管理系统的时候，我们公司的员工填写的账号密码都是对的，和数据库比对了一下没问题，就是对比失败。

思路：我比较了他们的长度，发现长度不一样，于是我用vim打开这个比较代码进行调试，发现其中一个字符串隐藏了一些特殊的unicode字符，他们不参与显示。这就是常说的”零宽字符“，可查阅wiki。

零宽字符的应用场景：

- 隐藏式的文字水印：比如csdn复制上面的代码再粘贴会出现版权的其他信息

## chrome的最小字号限制

公司后台管理系统的用户个人中心显示消息未读数角标，该角标我觉得文字太大了，于是我调整font-size:10px;文字看着是小了，但是它真的达到了10px吗？打开审查元素发现没有任何变化。

经查阅google chrome的帖子，发现chrome浏览器的默认最小字号是12px。可以在浏览器的设置->字体，查看到浏览器最小支持的字体大小。如果真的想改，就使用transform: scale()

## 跟随系统的主题切换

手动切换主题的基本思路是在:root下定义2套明暗主题颜色变量(--bg-color:xxx;....)。但是加入跟随系统功能呢？

mdn上有个媒体查询：

```css
@media (prefers-color-scheme: dark) {

}
```

js来做的话：

```javascript
const match = matchMedia('(prefers-color-scheme: dark)')
match.addEventListener('change', function(){})
```

## 我的个人网站给文章添加”刚刚看过“功能

类似抖音的视频”刚刚看过“，方便快速定位刚刚看过的视频位置。

假设我发表过200篇文章，用户刚刚看了第130篇文章，这时候文章列表是分页加载数据，要想快速滑到第130篇文章的位置，是不是要把130篇文章内容全部加载出来啊？只需要创建好130篇文章/视频的元素，不用向服务器真正的请求内容，用户看到那一部分才加载那一部分。

思路：
- createElements(page)
- loadPages()

## 公司产品官网H5页面的首屏优化

1. **路由懒加载**

- 适用于SPA，不适用于MPA场景
- 路由拆分，优先保证首页加载

2. **服务端渲染SSR**

- 传统的前后端分离SPA渲染页面的过程繁琐
- SSR渲染页面过程简单，性能较好
- 纯H5页面，SSR是性能优化的终极方案
- 现代SSR：Nextjs Nuxtjs
- SSR在Web 1.0出现：PHP JSP ASP等
- 成本高

3. **APP预取**

- 若H5在webview中展示，可使用app预取
- 用户访问列表页时，app预加载文章首屏内容
- 用户进入H5页，直接从app中获取内容，瞬间展示首屏
- Js-Bridge
- 移动端H5结合app能力去优化

4. **分页**

- 针对列表页
- 默认只展示第一页内容
- 上滑加载更多

5. **图片懒加载lazyLoad**

- 针对详情页
- 默认只展示文本内容，然后触发图片懒加载
- 提前设置图片尺寸，尽量只重绘不重排

6. **Hybrid**

- 提前将HTML CSS JS下载到app内部
- 在app webview中使用file://协议加载页面文件
- 再用ajax获取内容并展示，结合app预取
- 严格上说hybrid不是h5

> 性能优化要配合分析、统计、评分等可量化的标准，做了事情要有能看得见的结果  
> 性能优化也要配合体验，如网页的骨架屏、loading动画  
> 不同形式有不同的优化方式

## 后端一次性返回100w条数据，该如何渲染

这是从抖音上看见一个10多年后端经验大专程序员面试分享。听完我就觉得很扯：

- 本身技术方案设计的不合理

如果真有这种傻逼这样设计或者真有这样的应用场景或者浏览器真的扛得住返回这么大的数据，那么前端该怎么承接这么大容量的数据？

浏览器是否能处理这么大的数据？

- JS没问题
- 渲染到DOM会非常卡顿

解决方案：

1. 自定义中间层

- 自己写nodejs中间层，获取并拆分数据
- 前端再去对接nodejs中间层，不用再直接对接后端工程师
- 成本比较高，都不如直接把后端工程师暴打一顿

2. 虚拟列表

- 只渲染可视区域DOM
- 其他隐藏区域不显示，只用div元素撑起高度
- 随着浏览器滚动，创建、销毁DOM
- 参考android开发中的recycle view设计理念
- npm库：
  - vue-virtual-scroll-list
  - react-virtualiszed

## 前端开发中不得不使用的设计模式

设计原则：
- 开放封闭原则
- 对扩展开放
- 对修改封闭

1. 工厂模式：用一个工厂函数来创建实例，隐藏new：jQuery的$函数
2. 单例模式：全局唯一实例，无法生成第二个,js单线程不需要考虑死锁：vuex、redux的store
3. 代理模式：使用者不能直接访问对象，而是访问代理层，在代理层监听get、set做很多事情：vue3响应式替换为proxy
4. 观察者模式：一个主题，一个观察者，主题变化后触发观察者执行：事件绑定
5. 发布订阅模式：绑定多个事件，触发执行：vue组件通讯是使用事件总线eventbus
6. 装饰器模式：原功能不变，增加一些新功能（AOP面向切面编程）：TS Decorator

> 23个经典设计模式针对的是后端

观察者模式、发布订阅模式的区别：
- 观察者：subject、observer、subscribe、fire event
- 发布订阅：publisher、event channel、subscriber、publish event、subscribe、fire event

## 为公司网站做Vue优化

- v-if、v-show：大部分情况下使用v-if就足够了，没有必要为了优化而优化
- v-for使用key，key不要用index
- 使用computed缓存
- keep-alive缓存组件
- 针对体大的组件进行拆包，需要时异步加载，不需要时不加载defineAysncComponent
- 路由懒加载
- 按需使用服务端SSR nuxtjs

## 用Vue开发公司网站后台管理系统踩过的坑

- 内存泄漏
- vue2响应式恶心人，vue3好很多
- SPA的通病，路由切换时scroll到顶部，不方便继续上次的位置浏览：MPA+app webview intent栈解决

> 日常开发遇到坑及时记录总结，比如我遇到坑我就会通过写文章的方式记录下来

## 用React开发我的网站，做哪些优化手段

- 循环使用key,key不用index
- Fragment减少元素嵌套层级
- jsx中不定义函数，而是提取出来，避免新建函数
- 时刻警惕不可变数据
- react默认会让所有的子组件都更新，无论涉及的数据是否变化，采用memo、useCallback、useEffect等hooks缓存数据和函数
- 异步组件lazy、suspense
- 路由懒加载
- SSR

> react开发，让不可变数据变成我们的潜意识

## 给公司开发官网、后台管理系统怎么监听前端出错

**window.onerror**:
- 全局监听所有js错误
- js级别，识别不了vue组件信息
- 捕捉一些vue监听不到的错误
- 遇到try-catch、errorHandler就不行了
- 监听异步回调的错误

```javascript
onMounted(() => {
    window.onerror = function(msg, source, line, column, error) {

    }
})

window.addEventListener('error', error => {})
```

**监听vue组件的错误**：
- errorCaptured
  - 监听所有下级组件的错误
  - 返回false阻止向上传播
- errorHandler
  - vue全局错误监听，所有组件错误都会汇总到此处
  - errorCaptured返回false则不会传播到此处
  - 异步回调的错误监听不到

> 错误上报平台：sentry

**监听react错误**：

- ErrorBoundary组件
  - 监听所有下级组件报错，可降级展示UI
  - 只监听组件渲染时报错，不监听DOM事件、异步错误
  - 生产环境生效，开发环境直接抛出错误
- 事件报错使用try-catch或window.onerror
- 异步报错使用window.onerror
- JS报错统计：埋点、上报、统计

## 公司的同事以前写的H5后台管理系统卡的一批，该如何排查问题并解决

**找出卡在哪里**：
- 加载卡
  - 提高服务器硬件配置，使用CDN
  - 路由懒加载、大组件异步加载，减少主包体积     
  - 优化HTTP缓存策略
- 渲染卡
  - 优化服务端接口
  - 优化前端组件内部的逻辑
  - 服务端SSR
- 二分法查找问题根源

**前端性能指标**：
- FP: First Paint
- FCP: First Contentful Paint
- FMP: First Meaningful Paint(因无业界技术标准，现改用LCP) 
- DCL：Dom Content Loaded
- LCP: Largest Contentful Paint
- Load: L

**工具1：chrome devtools**
- performance可查看性能指标并配备网页快照功能   
- network可查看各个资源的加载时间

**工具2：Lighthouse**
- 第三方性能评测工具
- 支持移动端、PC端
- Lighthouse测试报告
- Lighthouse优化建议
- npm i lighthouse -g
- lighthouse https://www.yinlei.pro --view --preset=desktop

> 性能优化是一个循序渐进的过程，持续跟进统计结果  
> 第三方统计服务：阿里云ARMS、百度统计

## 为公司的前端开发统计SDK，该如何设计

前端统计是每个公司都要做的内容，前端负责把统计得到的原始数据传给公司的后端。

统计的过程：
- 前端获取H5页面的统计信息
- 把获得的统计信息发送给统计server
- 统计server进行离线计算，产出统计结果
- 根据统计结果去优化产品进行迭代升级，形成业务的闭环

统计的范围：
- 访问量PV
- 自定义事件（升级VIP的按钮统计等）
- 性能
- 错误

```javascript
const pvUrlSet = new Set()
// 统计SDK：通用
class ProductStatistic {
    constructor(productId) {
        this.productId = productId
        this.initPerformance()
        this.initError()
    }

    send(url, params={}) {
        params.productId = productId
        const paramArr = []
        for(let key in params) {
            const value = params[key]
            paramArr.push(`${key}=${value}`)
        }
        const newUrl = `${url}?${paramArr.join('&')}`
        // img元素发送数据可跨域且兼容性非常鲁棒
        const img = document.createElement('img')
        img.src = newUrl
    }

    initPerformance() {
        const url = 'xxxxxxxx'
        this.send(url, performance.timing)
    }

    initError() {
        window.addEventListener('error', event => {
            const {error, lineno, colno} = event
            this.error(error, {lineno, colno})
        })
        window.addEventListener('unhandledrejection', event => {// 处理promise未catch住的错误
            this.error(new Error(event.reason), {})
        })
    }
    
    pv() {
        const href = location.href
        if(pvUrlSet.get(href)) {
            return 
        }
        this.event('pv')
        pvUrlSet.add(href)
    }

    event(key, value) {
        const url = 'xxx'
        this.send(url, {key, value})
    }

    error(err, info={}) {
        const url = 'xxxxxxxxx'
        const {message, stack} = err
        this.send(url, {message, stack, ...info})
    }
}

const p = new ProductStatistic('phoneCard')
p.pv()
p.event('vip', 'ok')

try{

}catch(err) {
    p.error(err, {})
}
```

## 开发公司的产品官网、后台管理系统，我是如何技术选型的

SPA是单页应用，MPA是多页应用，默认情况下VUE React都是SPA。

SPA特点：
- 功能较多，一个页面展示不完
- 以操作为主，非展示为主
- 适合综合web应用，如大型后台管理系统、知识库、复杂的web app

MPA特点：
- 功能较少，一个页面展示的完
- 以展示为主，操作比较少
- 适合一个孤立的页面
- 如：分享页、新闻详情页

## 公司的后台管理系统是怎么搞定权限设计的

之前给公司开发一个基站华为设备后台管理系统：
- 普通成员：查看设备、录入设备
- 管理员：普通用户权限+审核设备
- 超级管理员：管理员角色+下架设备+添加、删除用户，绑定用户和角色

RBAC: Role-based access control基于角色的访问控制
- 3个模型
  - 用户
  - 角色
  - 权限
- 2个关系
  - 用户-角色关系
  - 角色-权限关系

用户表：

| 用户id | 用户名 | 密码 | 
| --- | --- | --- |
| xx | xx |  xx |

角色表：

| 角色id | 角色名 |
| --- | --- |
| xx | xx |

权限表：

| 权限id | 权限名 |
| --- | --- |
| xx | xx |

用户-角色表：

| 用户id | 角色名 |
| --- | --- |
| xx | xx |

角色-权限表：

| 角色id | 权限id |
| --- | --- |
| xx | xx |

功能：
- 用户管理：CRUD、绑定角色
- 角色管理：CRUD、绑定权限
- 权限管理：CRUD

> 设计 = 数据模型(关系) + 如何操作数据

## H5图片懒加载SDK该如何设计

思路：
- 定义img元素，添加data-src自定义属性
- 页面滚动，图片露出来时再将data-src赋值给src
- 滚动要考虑节流

获取图片元素的位置：
- elem.getBoundingClientRect()
- 对比图片的top和window.innerHeight

```javascript
<img src='loading.gif' data-src='real.png' />

function traverseImagesAndTryLoad() {
    const images = document.querySelectorAll('img[data-src]')
    if(images.length === 0) return 
    images.forEach(img => {
        const rect = img.getBoundingClientRect()
        if(rect.top < window.innerHeight) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
        }
    })
}

window.addEventListener('scroll', () => {
    traverseImagesAndTryLoad()
})
traverseImagesAndTryLoad()
```

## 公司年会让我做一个抽奖活动，我该怎么搞

需要后端工程师提供：
- 抽奖接口
- 用户信息接口
- 是否已经抽奖

业务流程：
- 登录，获取用户信息，判断是否已经参加过抽奖活动
- 已登录则是否抽奖，是否显示结果
- 未登录则抽奖按钮（登录/手机号）
- 抽奖
- 结果
- 引导分享，微信JSSDK
- 统计PV、自定义事件

> 技术为业务服务

## 写搜索华为设备号的后端api时，发现字符串的前缀匹配有瓶颈

我的数据库录入了每台华为设备号，可以看成是英文单词库(数组)，里面有很多英文单词。在输入框中输入字符串，想快速判断是不是某一个单词的前缀。

解决思路：

1. 方案1：

- 遍历单词库数组
- indexOf判断前缀
- 但是实际时间复杂度超过了O(n)

2. 方案2：

- 英文字母一共26个，提前把单词库数组拆分为26个

```javascript
{
    a: {
        a:[..],
        b: [...],
        c: [...]
    },
    b: [...],
    c: [...],
    ...
}
```

- 通过js对象访问属性的方式，其时间复杂度为O(1): object.a
- 每层都这样拆分为26个
- 最后就把单词库拆分为一颗树

## 


