---
title: HTML、CSS面试
description: 如果说HTML是普通的女人，那CSS则为女人加冕
date: '2023-09-25 21:52:50'
tag: 计算机
---

## Contents

## 如何理解HTML语义化

请看如下两段代码：

```html
<div>博客标题</div>
<div>
    <div>博客描述</div>
    <div>
        <div>博客发布者</div>
        <div>博客发布时间</div>
    </div>
</div>
```

```html
<h1>博客标题</h1>
<div>
    <p>博客描述</p>
    <div>
        <span>博客发布者</span>
        <span>博客发布时间</span>
    </div>
</div>
```

这两段代码通过编写CSS能产生一样的效果。但是我们一般推荐第二种写法，因为你看得懂这段代码，代码可读性好，这也就是常说的**HTML语义化**带来的好处。那么除了**让人更容易读懂**，机器看不看呢？想想我们的网页爬虫，又比如现在大家都在做C端的SSR，搜索引擎分析第二种写法可以看到**h1**等标签，就可以很好的进行**SEO**。

## 哪些HTML标签是块级元素、内联元素(默认情况)

块状元素，**display: block/table**，这类元素的特点是独占一行，常见的有div、h1、table、ul、ol、p等。

内联元素，**display: inline/inline-block**，这类元素的特点是不会独占一行，会挨着排列，直到遇到浏览器边界换行，常见的有span、img、input、button等。

## [CSS布局]盒模型宽度的计算

问下面代码中div的offsetWidth是多少：

```html
<style>
    #container {
        width: 100px;
        padding: 10px;
        border: 1px solid black;
        margin: 10px;
    }
</style>

<div id="container">
</div>
```

首先，要明白： **offsetWidth = (width+padding+borderWidth)**，没有外边距margin，所以div的offsetWidth=100px+2* 10px+2*1px=122px

如果要让div的**offsetWidth=100px**,那么我们可以给div添加一行CSS代码**box-sizing: border-box**。

在javascript中，通过如下代码验证答案：

```javascript
document.getElementById('container').offsetWidth
```

## [CSS布局]margin纵向重叠的问题

问下面代码中YinLei和YinWei之间的距离是多少：

```html
<style>
    p {
        font-size: 16px;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 15px;
    }
</style>

<p>YinLei</p>
<p></p>
<p></p>
<p></p>
<p>YinWei</p>
```

这题考察的是**相邻元素的margin-top和margin-bottom会发生重叠**、**空白内容的元素也会重叠**，所以答案为15px。

## [CSS布局]margin负值的问题

- margin-top、marigin-left负值: 元素向上、向左移动
- margin-right负值: 右侧元素左移，自身不受影响
- margin-bottom负值: 下方元素上移，自身不受影响

## [CSS布局]BFC的理解与应用

BFC(Block format context)**块级格式化上下文**。它是一块独立渲染区域，内部元素的渲染不会影响边界以外的元素。

而常见的形成BFC的条件有：**float不是none**、**position是absolute或fixed**、**overflow不是visible**、**display是flex或inine-block**等。

BFC的应用场景是**清除浮动**。

## [CSS布局]float布局：圣杯布局、双飞翼布局

实现这类布局的目的是：
- 三栏布局，中间一栏最先加载和渲染(内容最重要)
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于PC网页

这类布局最典型的应用就是博客网站。而这类布局的特点是使用**float布局**、**两侧使用margin负值，以便中间内容横向重叠**、**防止中间内容被两侧覆盖，一个用padding,一个用margin**。

圣杯布局：

```html
<style>
header {
    text-align: center;
    background-color: pink;
}

#container {
    padding-left: 200px;
    padding-right: 150px;
}

.column {
    float: left;
}

#center {
    background-color: blue;
    width: 100%;
}

#left {
    position: relative;
    background-color: green;
    width: 200px;
    margin-left: -100%;
    right: 200px;
}

#right {
    background-color: red;
    width: 150px;    
    margin-right: -150px;
}

footer {
    clear: both;
    text-align: center;
    background-color: black;
}
</style>

<header>header</header>
<div id="container">
    <div id="center" class="column">center</div>
    <div id="left" class="column">left</div>
    <div id="right" class="column">right</div>
</div>
<footer>footer</footer>
```

双飞翼布局：

```html

<style>
#main {
    width: 100%;
    height: 200px;
    background-color:#ccc;
}
#left {
    width: 190px;
    height: 200px;
    background-color: green;
    margin-left: -100%;
}

#right {
    width: 190px;
    height: 200px;
    background-color: red;
    margin-left: -190px;
}

#main-wrap {
    margin: 0 190px 0 190px; 
}

.column {
    float: left;
}
</style>

<div id="main" class="column">
    <div id="main-wrap">
        main
    </div>
</div>
<div id="left" class="column">left</div>
<div id="right" class="column">right</div>
```

## [CSS布局]float布局：手写clearfix

```html
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}
```

## [CSS布局]flex布局：实现React Antd组件库中Layout的样式(Header、Footer、Aside、Main)

```html
* {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
}
body {
    display: flex;
    flex-direction: column;
    height: 100%;
}
#header {
    height: 50px;
    background-color: red;
}
#container {
    flex: 1;
    display: flex;
}
#left-container {
    width: 100px;
    background-color: green;
}
#main-container {
    flex: 1;
    background-color: #ccc;
}
#right-container {
    width: 100px;
    background-color: yellow;
}
#footer {
    height: 50px;
    background-color: blue;
}
<header id="header">header</header>
<section id="container">
    <aside id="left-container">left</aside>
    <section id="main-container">main</section>
    <aside id="right-container">right</aside>
</section>
<footer id="footer">footer</footer>
```

## [CSS定位]absolute、fixed、relative分别依据什么定位

- **relative**：依据自身定位，不脱离文档流
- **absolute**: 依据最近一层的定位元素定位，脱离文档流
- **fixed**: 依据浏览器窗口定位，脱离文档流

那么，有哪些定位元素呢？
- absolute、relative、fixed
- body

## [CSS定位]居中对齐有哪些方式

**水平居中：**
- inline元素：**text-align: center**
- block元素：**margin: auto**
- absolute元素：**left: 50% + margin-left: 负值自身宽度的一半**

**垂直居中：**
- inline元素：**line-height: height的值**
- absolute元素：**top:50% + margin-top: 负值自身高度的一半**
- absolute元素：**left:50%;top:50%;transform(-50%,-50%)**
- absolute元素：**top, left, bottom,right = 0+marigin: auto;**

（提一嘴）在现代前端开发中，flex是主流，flex能实现水平居中、垂直居中。当然，grid也可以，都很强大。

## [CSS图文样式]line-height如何继承

看下面的代码，p标签的行高是多少：

```html
<style>
    body {
        font-size: 20px;
        line-height: 200%;
    }
    p {
        font-size: 16px;
    }
</style>
<body>
    <p>YinLei</p>
</body>
```

line-height的继承原则：
- 写**具体数值**，则继承该值
- 写**比例**，则继承该比例
- 写**百分比**，则继承计算出来的值

所以此处的p元素的line-height=20px*200%再继承该值。

## [CSS响应式]rem是什么

rem是一个**长度单位**。在前端开发中，有如下长度单位：
- **px**: 绝对长度单位
- **em**: 相对长度单位(相对于父元素)
- **rem**: 相对长度单位(相对于根元素，常用于响应式布局)。它的计算方式是根元素的font-size:100px,则若给某元素设置0.16rem,则结果就是100*0.16=16px。
- **rpx**: 微信小程序长度单位

## [CSS响应式]响应式布局的常见方案

- **媒体查询**: 根据不同屏幕宽度设置根元素font-size
- **rem**: 基于根元素的相对单位

```css 
@media only screen and (max-width: 374px) {
    /* iphone 5 */
    html {
        font-size: 86px;
    }
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
    /* iphone 6/7/8/xr */
    html {
        font-size: 100px;
    }
}
@media only screen and (min-width: 414px) {
    /* iphone6p+ */
    html {
        font-size: 110px;
    }
}

body {
    font-size: 0.16rem;
}
```

你现在能看到的本网站就是采用的响应式布局，相对于传统的媒体查询写法，笔者使用TailwindCSS进行媒体断点适配实现响应式布局效果。

## [CSS响应式]vw-vh

rem具有弊端，“阶梯性”，如上面的代码，我们设置了媒体断点，但是我们若按照最严格的尺寸范围来分，rem+媒体查询就很啰嗦，不够平滑。

了解vm、vh之前，要先知道**网页视口尺寸**：
- **window.screen.height**: 屏幕高度
- **window.innerHeight**: 网页视口高度
- **document.body.clientHeight**: body高度

- **vw**: 网页视口宽度的1/100
- **vh**: 网页视口高度的1/100
- **vmax**: 取两者最大值；**vmin**: 取两者最小值