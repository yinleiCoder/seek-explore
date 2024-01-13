---
title: JavaScript面试
description: 没有JavaScript，这个世界就不会有现在的模样
date: '2023-12-31 7:55:22'
tag: 计算机
---

本文章题目的考点均能在**JavaScript高级程序设计第四版**上找到出处，虽然很厚，但十分经典！本文是找出面试中的重点与必考点，**具体细节请务必务必看红宝书扎实基础，可能需要看2次以上**，不要怕书厚，看1遍学不到什么。

![红宝书](/images/javaScriptInterview/book.jpg)

## Contents

## 变量类型和计算


### 值类型

```javascript
let a = 24
let b = a 
a = 25 
console.log(a)// 25
console.log(b)// 24
```

常见的值类型：

```javascript
let a// undefined
const y = 'yinlei'
const n = 100 
const b = true 
const s = Symbol('yinlei')
```

### 引用类型

```javascript
let a = {age: 24}
let b = a
b.age = 25
console.log(a.age) // 25
```

深入分析值类型和引用类型上述代码为啥会出现这样的结果，这就考察程序员对内存模型了解多少，如果你学过JVM、C、C++你一定知道我在说什么。这里笔者浅尝辄止，栈是存储非对象类型的，值类型占用空间较小。而引用类型占用空间一般很大，可以存储很多信息，这时候如果每个大的对象都分配空间，内容是一样的，就造成了空间的冗余浪费，所以放在了堆中，堆可以理解为对象池，每次访问堆，你拿到的是它给你的地址，你可以通过这个地址找到该对象进行访问、修改数据，另一个人访问这个对象也拿到的是堆给的相同地址，所以你俩对这个对象的修改就是同步的。【如果笔者解释的还不够清晰，请自行查阅红宝书】

常见的引用类型：

```javascript
const obj = {x: 100}
const arr = ['a', 'b', 'c']
const n = null // 特殊引用类型，指针指向空地址
function fn() {}// 特殊引用类型，不用于存储数据，没有拷贝、复制函数说法
```

### typeof运算符

typeof的作用大致归为：
- 识别所有值类型
- 识别函数
- 判断是否是引用类型(但不能细分，后面会介绍怎么细分涉及原型链)

```javascript
let a;             typeof a // 'undefined'
const y = 'yinlei' typeof y // 'string'
const n = 100  typeof n // 'number'
const b = true  typeof b // 'boolean'
const s = Symbol('yinlei') typeof s // 'symbol'

typeof console.log // 'function'
typeof function (){} // 'function'

typeof null // 'object'
typeof ['a', 'b'] // 'object'
typeof {x: 25} // 'object'
```

### 深拷贝

```javascript
const obj = {
  age: 20,
  name: 'yinwei',
  address: {
    city: 'guangyuan'
  },
  tags: ['gongwuyuan', 'handsome']
}

const objCopy = obj

objCopy.address.city = 'santai'
console.log(obj.address.city)// santai
```

这就是浅拷贝，两个变量之间访问的是同一个地址。所以我们有时候想用深拷贝去切断变量之间的联系（即每个变量拿到的都是不一样的地址）。

```javascript
const obj = {
  age: 20,
  name: 'yinwei',
  address: {
    city: 'guangyuan'
  },
  tags: ['gongwuyuan', 'handsome']
}

function deepClone(obj = {}) {
  if(typeof obj !== 'object' || obj == null) {
    // obj是null或不是对象和数组类型，直接返回
    return obj 
  }
  let result 
  if(obj instanceof Array) {
    result = []
  } else {
    result = {}
  } 
  for(let key in obj) {
    // 确保不是原型上的属性
    if(obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    } 
  }
  return result 
}

const objCopy = deepClone(obj)

objCopy.address.city = 'santai'
console.log(obj.address.city)// guangyuan
```

以上深拷贝代码还是有问题，在**通用性上有BUG，不够健壮和鲁棒性**，不知道你看出来没有【我们会在后面的文章中继续讨论该话题】。

### 类型转换

发生类型转换比较多的地方：
- 字符串拼接
- \=\=
- if语句、逻辑运算

```javascript
const a = 100 + 10 // 110
const b = 100 + '10'// '10010'
const c = true + '10'// 'true10'

100 == '100' //true
0 == '' // true
0 == false // true 
false == '' // true 
null == undefined // true 
```

建议除了**双等于null**之外，其他一律都用**三等号** 

```javascript
const obj = {x: 100}
if(obj.a == null) {}
// 等价于
if(obj.a === null || obj.a === undefined) {}
```

- **truly变量**：!!a === true的变量
- **falsely变量**：!!a === false的变量

```javascript
!!0 === false
!!NaN === false 
!!'' === false 
!!null === false 
!!undefined === false 
!!false === false
// 除此之外都是truly变量
```

在逻辑判断中：

```javascript
console.log(10 && 0) // 0
console.log('' || 'abc') // 'abc'
console.log(!window.abc) // true
```

#### 【面试题】typeof能判断哪些类型

- 识别所有值类型
- 识别函数
- 判断是否是引用类型，但不可再细分

#### 【面试题】\=\=\=、\=\=的区别

\=\=会尝试隐式转换，所以除了双等于null之外，其他一律用\=\=\=。

#### 【面试题】值类型、引用类型的区别

朝着堆栈模型上面靠，深入计算机内存，用C++ Hack一下代码。


#### 【面试题】手写深拷贝要注意什么

- 判断值类型和引用类型
- 判断是数组还是对象
- 递归

## 原型、原型链

**JavaScript本身是基于原型继承的语言**，即使是es6的class，也只是语法糖。

### class和继承

**class**是面向对象的语法实现，类似一个模板，通过模板构建对象。
- constructor
- 属性
- 方法

```javascript
class Student {
  constructor(name, number) {
    this.name = name 
    this.number = number
  }
  sayHi() {
    console.log(`student name:${this.name}, number:${this.number}`)
  }
}

// 通过类声明对象/实例
const yinlei = new Student('yinlei', 1705200120)
console.log(yinlei.name)
console.log(yinlei.number)
yinlei.sayHi()

const yinwei = new Student('yinwei', 1220604905)
console.log(yinwei.name)
console.log(yinwei.number)
yinwei.sayHi()
```

**继承**，当我们有很多class, 这些class有些具有公共的属性，如学生与人、老师与人等。
- extends
- super
- 扩展或重写方法

```javascript
class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat food.`)
  }
}

class Student extends People {
  constructor(name, number) {
    super(name)
    this.number = number
  }
  sayHi() {
    console.log(`username ${this.name} number ${this.number} say hi`)
  }
}

class Teacher extends People {
  constructor(name, major) {
    super(name)
    this.major = major 
  }
  teach() {
    console.log(`${this.name} teach ${this.major}`)
  }
}

const yinlei = new Student('yinlei', 1705200120)
console.log(yinlei.name)
console.log(yinlei.number)
yinlei.sayHi()
yinlei.eat()

const xieTeacher = new Teacher('xie teacher', 'computer')
console.log(xieTeacher.name)
console.log(xieTeacher.major)
xieTeacher.teach()
xieTeacher.eat()
```
### 原型和原型链

**class实际上就函数**，可以看出class仅仅是语法糖，和C#中的class不是一回事。javascript中的class是es6语法规范，由ECMA委员会发布，但是ECMA只规定语法规则，不规定如何实现。所以本文提到的实现方式是V8引擎的实现方式。

```javascript
typeof People// 'function'
typeof Student// 'function'
```

再来看看前面例子带来的**隐式原型**和**显式原型**：

```javascript
console.log(yinlei.__proto__)//隐式原型
console.log(Student.prototype)// 显式原型
console.log(yinlei.__proto__ === Student.prototype)// true 
```

以上代码说明在定义class Student时，Student会有一个prototype显式原型指向Student.prototype这个对象，把sayHi()方法放到了Student.prototype中，yinlei这个实例有个\_\_proto\_\_隐式原型也指向Student.prototype。【可以自己动手打开控制台看看并画图】

**原型关系**： 
- 每个class都有显式原型prototype
- 每个实例都有隐式原型\_\_proto\_\_
- 实例的\_\_proto\_\_指向对应的class的prototype

**基于原型的执行规则**：获取属性yinlei.name或执行方法yinlei.sayHi()时，先在自身属性和方法寻找，如果找不到则自动去\_\_proto\_\_中查找。

顺着原型看**原型链**：

```javascript
console.log(Student.prototype.__proto__)
console.log(People.prototype)
console.log(People.prototype === Student.prototype.__proto__)// true
```

![原型链](/images/javaScriptInterview/prototypeLink.png)

在javaScript中，可以通过**obj.hasOwnProperty('属性')**判断是否是自己独有的属性还是原型链上的属性。

### 类型判断instanceof

instanceof是顺着隐式原型往上找，一层层向上爬，找到了就true,否则false。

```javascript
yinlei instanceof Student // true
yinlei instanceof People // true
yinlei instanceof Object // true

[] instanceof Array // true 
[] instanceof Object // true 

{} instanceof Object // true 
```

#### 【面试题】如何准确判断一个变量是不是数组

arr instanceof Array

#### 【面试题】ES6中class的原型本质

- 搞清原型和原型链的图示
- 搞清属性和方法的执行规则

#### 【面试题】手写简易的jQuery，考虑插件、扩展性

```javascript
class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector)
    const length = result.length
    for(let i = 0;i < length; i++) {
      this[i] = result[i]
    }
    this.length = length
    this.selector = selector
  }
  get(index) {
    return this[index]
  }
  each(fn) {
    for(let i=0;i < this.length;i++) {
      const elem = this[i]
      fn(elem)
    }
  }
  on(type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false)
    })
  }
  // ....
}
// 插件形式
jQuery.prototype.dialog = function info() {
  alert(info)
}
// 造轮子
class MyJQuery extends jQuery {
  constructor(selector){
    super(selector)
  }
  // ....
}
```
## 作用域、闭包

### 作用域和自由变量

```javascript
let a = 0
function fn1() {
  let a1 = 100
  function fn2() {
    let a2 = 200
    function fn3() {
      let a3 = 300
      return a + a1 + a2 + a3
    }
    fn3()
  }
  fn2()
}
fn1()
```

**作用域**，代表某个变量的合法使用范围。作用域可以分为：
- 全局作用域
- 函数作用域
- 块级作用域

**自由变量**，一个变量在当前作用域没有定义，但被使用了，向上级作用域一层层依次寻找，直到找到为止。如果到全局作用域还没有找到，则报错xxx is not defined。

### 闭包

**闭包**是作用域应用的特殊情况，有如下表现形式：
- 函数作为参数被传递
- 函数作为返回值被返回

```javascript
// 函数作为返回值
function create() {
  let a = 100
  return function () {
    console.log(a)
  }
}
let fn = create() 
let a = 200 
fn()// 100

// 函数作为参数
function print(fn) {
  let a = 200 
  fn()
}
let a = 100 
function fn() {
  console.log(a)
}
print(fn)// 100
```

**所有的自由变量的查找(包括闭包)是在函数定义的地方向上级作用域查找，不是在执行的地方**。

### this

this在如下场景中应用，但是请记住：**this在各场景中取什么样的值是在函数执行的时候确认，而非定义的时候**。
- 作为普通函数
- 使用call apply bind
- 作为对象方法被调用
- 在class方法中调用
- 箭头函数

```javascript
function fn1() {
  console.log(this)
}
fn1() // window

fn1.call({x: 100})// {x: 100}

const fn2 = fn1.bind({x: 200})
fn2() // {x: 200}

const yinwei = {
  name: 'yinwei',
  sayHi() {
    console.log(this)// 指向当前对象
  },
  wait() {
    setTimeout(function() {
      console.log(this) // window
    })
  }
}

const yinlei = {
  name: 'yinlei',
  sayHi() {
    console.log(this)// 指向当前对象
  },
  wait() {
    setTimeout(() => {
      console.log(this) // 指向当前对象,箭头函数取上级作用域的this
    })
  }
}

class People {
  constructor(name) {
    this.name = name 
    this.age = 25
  }
  sayHi() {
    console.log(this)
  }
}
const yinlei = new People('yinlei')
yinlei.sayHi() // yinlei对象
```

#### 【面试题】this的不同应用场景下如何取值

- 当作普通函数被调用
- 使用call apply bind
- 作为对象方法调用
- 在class的方法中调用
- 箭头函数

#### 【面试题】手写bind函数

```javascript
function fn1(a, b) {
  console.log('this', this)
  console.log(a, b)
  return 'this is fn1'
}

const fn2 = fn1.bind({x: 100}, 10, 20)
const res = fn2() // this {x:100} 10 20
console.log(res) // this is fn1

// mock bind function 
Function.prototype.bindCopy = function() {
  const args = Array.prototype.slice.call(arguments)
  const t = args.shift()
  const self = this 
  return function () {
    return self.apply(t, args)
  }
} 
```

#### 【面试题】闭包的实际开发应用场景

**隐藏数据**。如前端经常要写的cache tools。

```javascript
function createCache() {
  const data = {} 
  return {
    set: function(key, val) {
      data[key] = val
    },
    get: function(key) {
      return data[key]
    }
  }
}

const c = createCache()
c.set('a', 100)
console.log(c.get('a'))
```

#### 【面试题】创建10个a标签，点击的时候弹出对应的序号

```javascript
let i,a 
for(i =0; i< 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br/>'
  a.addEventListener('click', function(e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
// 10 全局作用域，形成闭包
```

解决问题：

```javascript
let a 
for(let i =0; i< 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br/>'
  a.addEventListener('click', function(e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
// 点啥就是啥，形成块级作用域let
```

## 异步、单线程

这一节强烈建议看看《深入浅出Nodejs》这本书。

### 单线程、异步

**单线程**，JS是**单线程语言，只能同时做一件事**。但浏览器和nodejs已支持JS启动**进程**，如web worker。但我们要明白JS和DOM渲染共用同一个线程，因为JS可修改DOM结构。(Dart也是单线程，但...可以去官网文档仔细了解一下线程工作原理)

因为单线程，遇到等待(网络请求、定时任务)不能卡住，所以需要**异步**。而**异步则需要callback回调函数形式**。

```javascript
// 异步
console.log(100)
setTimeout(function() {
  console.log(200)
}, 1000)
console.log(300) // 100 300 200

// 同步
console.log(100)
alert(200)
console.log(300)// 100 200 300
```

JavaScript是单线程语言，**异步不会阻塞代码执行，但是同步会阻塞代码执行**。

### 异步的应用场景

- **网络请求**：如ajax图片加载
- **定时任务**：如setTimeout

### Callback Hell、Promise

Callback Hell回调地狱，异步是基于回调函数来执行。

```javascript
$.get(url1, data1=>{
  console.log(data1)
  $.get(url2, data2 => {
    console.log(data2)
    $.get(url3, data3 => {
      console.log(data3)
      // ...
    })
  })
})
```

Callbak hell促使了Promise的产生，链式调用让我们编码体验提高。

```javascript
function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url, 
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const url1 = '/data1.json'
const url2 = '/data2.json'
const url3 = '/data3.json'
getData(url1).then(data1 => {
  console.log(data1)
  return getData(url2)
}).then(data2 => {
  console.log(data2)
  return getData(url3)
}).then(data3 => {
  console.log(data3)
}).catch(err => console.error(err))
```

Promise把callback变成了非嵌套的形式，极大提升了编码体验。

#### 【面试题】同步、异步的区别

- js是单线程语言
- 异步不会阻塞代码执行
- 同步会阻塞代码执行

#### 【面试题】手写Promise加载一张图片

```javascript
const url ='图片地址'
function loadImg(src){
  return new Promise(
    (resolve, reject) => {
      const img= document.createElement('img')
      img.onload= () => {
        resolve(img)
      }
      img.onerror = () => {
        reject(new Error('something error'))
      }
      img.src = src
    } 
  )
}
loadImg(url).then(img=>{
  console.log(img.width)
  return img
}).then(img => {
  console.log(img.height)
}).catch(ex => console.error(ex))
```

#### 【面试题】setTimeout的执行顺序

```javascript
console.log(1)
setTimeout(function(){
  console.log(2)
}, 1000)
console.log(3)
setTimeout(function() {
  console.log(4)
}, 0)
console.log(5)//  1 3 5 4 2
```

## Event Loop

EventLoop(事件循环/事件轮询)，这块内容要自己会画图。因为JS是单线程运行的，所以异步要基于回调来实现，而**event loop就是异步回调的实现原理**。【这部分内容和python的协程相似，不太清楚的可以看崔庆才的第二版python网络爬虫进行学习】

首先明确JS如何执行：从前到后一行行执行，如果某一行执行报错，则停止下面代码的执行。**先把同步代码执行完，再执行异步**。

```javascript
console.log('Hi!')
setTimeout(function cb1() {
  console.log('cb1')
}, 5000)
console.log('Bye')// Hi Bye cb1
```

来看看上面代码发生了什么：先执行第一行代码，把这行代码推入调用栈中，Call Stack执行console.log('Hi!'),执行完后在浏览器的控制台上打印Hi!，然后清空调用栈。接着执行第二行代码，执行setTimeout时把它的异步回调放到web apis中，等5秒后再放入Callback Queue中，此时清空调用栈，执行最后一行代码在浏览器控制台中打印Bye。因为此时web apis中还存在setTimout的回调函数，因为call stack中没有要执行的东西，这时候启动event loop,一旦同步代码执行完毕，就一遍遍从Callback Queue中去找有没有函数放到call Stack中执行。等到setTimeout的时间到了后，把setTimeout的回调推入到Callback Queue中，Event loop立马从Callback Queue中取出来然后放入Call Stack中执行。

总结一下event loop过程：
- 同步代码，一行行放在Call Stack执行
- 遇到异步，先记录，等待时机
- 时机到了就移动到Callback Queue中
- 如果Call Stack为空，同步代码执行完毕，EventLoop开始工作轮询查找Callback Queue,如有则移动到Call Stack执行
- 然后继续轮询查找

但是要说明的是，这里讲解的并不完全正确，还缺少微任务队列，在文章后续会补充完整的执行过程。我记得Youtube上有位Google工程师做的会议分享完美诠释了EventLoop，感兴趣的可以自己去观看。

记不记得JS和DOM是在单线程上工作的，这时候就要引出DOM事件和event loop。

```javascript
<button id="btn">提交</button>
<script>
  console.log('Hi')
  $('#btn').click(function (e){
    console.log('button clicked')
  })
  console.log('Bye')
</script>
```

这和我们刚开始看到的setTimout那个例子很像，不同的是执行的时机，上面的代码触发和用户交互有关。这里的click回调也是放到了web apis中，其他过程和最开始讲解的差不多。

因为JS是单线程的，异步(setTimeout、ajax等)使用回调，都是基于Event Loop，DOM事件也是使用回调，但DOM事件不是异步。

## Promise深挖

### Promise的3种状态

- **pending**: 在过程中，还未有结果
- **resolved**：已解决，成功
- **rejected**：已拒绝，失败

```javascript
const url ='图片地址'
function loadImg(src){
  // pending
  return new Promise(
    (resolve, reject) => {
      const img= document.createElement('img')
      img.onload= () => {
        resolve(img) // resolved
      }
      img.onerror = () => {
        reject(new Error('something error'))// rejected
      }
      img.src = src
    } 
  )
}
loadImg(url).then(img=>{
  console.log(img.width)
  return img
}).then(img => {
  console.log(img.height)
}).catch(ex => console.error(ex))
```

pending->resolved或pending->rejected，且**变化不可逆**。

```javascript
const p1 = new Promise((resolve, reject) => {
})
console.log('p1', p1)// p1 pending

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  })
})
console.log('p2', p2)// p2 pending
setTimeout(() => console.log(p2)) // resolved

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  })
})
console.log('p3', p3)// p2 pending
setTimeout(() => console.log(p3)) // rejected
```

### 状态的表现和变化

- **pending状态**，不会触发then、catch
- **resolved状态**，会触发后续的then回调函数
- **rejected状态**，会触发后续的catch回调函数

若想直接返回一个resolved状态的Promise，则可以**Promise.resolve(xxx)**，这返回的是已经resolved状态的promise。若是rejected状态的promise，则可以**Promise.reject(err)**。

### then、catch对状态的影响

- **then正常返回resolved，里面有报错就返回rejected**
- **catch正常返回resolved，里面有报错就返回rejected** 

```javascript
const p1 = Promise.resolve().then(() => {
  return 100
})
console.log(p1)// resolved
p1.then(() => {
  console.log('123')
})

const p2 = Promise.resolve().then(() => {
  throw new Error('error')
})
p2.then(()=>{
  console.log('456')
}).catch(err => {
  console.error(err)
})
console.log(p2)// rejected
```

```javascript
const p3 = Promise.reject('my error').catch(err => {
  console.log(err)
})
console.log(p3)// resolved

const p4 = Promise.reject('my error').catch(err => {
  throw new Error('catch error')
})
console.log(p4)// rejected
```

#### 【面试题】Promise不同状态下的执行顺序

```javascript
Promise.resolve().then(() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})// 1 3
```

```javascript
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error')
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})// 1 2 3 
```

```javascript
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error')
}).catch(() => {// resolved
  console.log(2)
}).catch(() => {
  console.log(3)
})// 1 2 
```


## async/await

JavaScript中的async/await和python中的有所区别，不要混淆。async/await出现的背景是异步回调callback hell，随之Promise出现，其then、catch的链式调用方式也是基于回调函数。而**async/await则是同步语法，彻底消灭回调函数**。

下面的代码是Promise的方式：

```javascript
const url ='图片地址'
function loadImg(src){
  // pending
  return new Promise(
    (resolve, reject) => {
      const img= document.createElement('img')
      img.onload= () => {
        resolve(img) // resolved
      }
      img.onerror = () => {
        reject(new Error('something error'))// rejected
      }
      img.src = src
    } 
  )
}
loadImg(url).then(img=>{
  console.log(img.width)
  return img
}).then(img => {
  console.log(img.height)
}).catch(ex => console.error(ex))
```



下面的代码是async await的方式：

```javascript
const url ='图片地址'
function loadImg(src){
  // pending
  return new Promise(
    (resolve, reject) => {
      const img= document.createElement('img')
      img.onload= () => {
        resolve(img) // resolved
      }
      img.onerror = () => {
        reject(new Error('something error'))// rejected
      }
      img.src = src
    } 
  )
}

!(async function () {
  const img1 = await loadImg(url)
  console.log(img1.height, img1.width)
})()
```

### async/await和Promise的关系

async/await是消灭异步回调的工具，但和Promise并不互斥，且两者需要结合使用。

- **执行async函数，返回的是Promise对象**
- **如果返回一个普通值则会封装成Promise对象**
- **await相当于Promise的then**
- **try...catch捕获异常，相当于Promise的catch**

```javascript
async function fn1() {
  return 100
}

const res1 = fn1()// 执行async函数，返回的是Promise对象
console.log(res1) // Promise{<resolved>: 100}
res1.then(data => {
  console.log(data)// 100
})
```

```javascript
!(async function() {
  const p1 = Promise.resolve(25)
  const data = await p1 
  console.log(data)// 25
})()

!(async function() {
  const data = await 25 
  console.log(data)// 25
})()

async function fn1() {
  return 100
}
!(async function() {
  const data = await fn1() 
  console.log(data)// 100
})()
```

```javascript
!(async function() {
  const p4 = Promise.reject('err')
  try {
    const res = await p4
    console.log(res)
  } catch(ex) {
    console.err(ex) // err
  }
})()

!(async function() {
  const p4 = Promise.reject('err')
  const res = await p4
  console.log(res)
  // 不会执行，因为上面是rejected状态，所以会走catch，但是这里没有捕获，本行是resolved才会执行
})()
```



### 异步的本质

虽然async/await是消灭异步回调的工具，但是js还是单线程，还是需要异步，异步就基于Event Loop。所以asyncs/await只是一个语法糖，就像C#中的async/await一样是充当语法糖的作用。

```javascript
async function async1() {
  console.log('async1 start')
  await async2() 
  console.log('async1 end')// await后面的代码通通看成异步
}
async function async2() {
  console.log('async2')
}
console.log('script satrt')
async1()
console.log('script end')
// scirpt start
// async1 start
// async2
// script end 同步代码已经执行完毕，启动event loop
// async1 end
```

上面代码中很好的说明了：**await的后面，都可以看作是callback里的内容(异步)**。

```javascript
async function async1() {
  console.log('async1 start')
  await async2()
  // 下面的代码看成异步回调
  console.log('async1 end')
  await async3()
  // 下面代码又看成异步，因为上一行代码有await
  console.log('async1 end 2')
}

async function async2() {
  console.log('async2')
}

async function async3() {
  console.log('async3')
}
console.log('script start')
async1() 
console.log('script end')
// script start
// async1 start
// async2
// script end // 同步代码执行完毕
// async1 end
// async3
// async1 end2
```

## 微任务、宏任务

这个内容必须要弄清楚微任务和宏任务的编排顺序，可以去Youtube上查看Google开发者的会议，也可以阅读红宝书，这部分内容和DOM渲染，JS的单线程十分有关，可以帮助我们更好的解决UI阻塞问题。

```javascript
console.log(100)
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400) // 100 400 300 200
```

### macro task

**宏任务**：
- setTimeout
- setInterval
- Ajax
- DOM事件

### micro task

**微任务**：
- Promise
- async/await

### Event Loop和DOM渲染

加入微任务、宏任务、DOM渲染后，就可以完整概述Event Loop。

因为JS是单线程的，而且和DOM渲染共用一个线程，所以JS执行的时候，得留一些时间给DOM渲染，不然就会遇到我们常见的UI卡死。

在之前讲的event loop过程中，加上：**在call stack清空空闲时(同步代码执行完成)，先尝试DOM渲染(DOM结构如果有改变则重新渲染)，然后再去触发下一次EventLoop**。自己调试验证时可以加入alert()函数来阻断js的执行，同时也会阻断DOM渲染，便于查看结果。

### 微任务和宏任务的区别

- **微任务执行时机比宏任务要早**
- **微任务在DOM渲染前触发**
- **宏任务在DOM渲染后触发**
- **初始化promise时，传入的函数会立刻被执行**

从Event Loop来解释微任务为什么这么早：

![EventLoop](/images/javaScriptInterview/eventloop.png)

如果遇到Promise.then，执行和上面所说的setTimeout不一样，它会等待时机把回调放入到Micro task queue,而不是像setTimeout把回调放到Web APIs中。Promise不会经过web apis，是因为promise是ES规范，而不是w3c规范。

出现上述现象的原因，请记住：
- **微任务是ES6语法规定**
- **宏任务是浏览器规定**

我们再把整个过程总结一下：**Call stack清空空闲，同步代码执行完毕；此时执行当前的微任务，然后尝试DOM渲染，最后触发Event Loop从Callback Queue中取出任务放入Call Stack中执行。**要真正理解Event Loop，请画图。

#### 【面试题】Promise和setTimeout的输出顺序

```javascript
async function async1() {
  console.log('async1 start')
  await async2()
  // 执行完async2后，下面的代码看成异步的回调：微任务
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function() {
  console.log('setTimout')
})

async1()

new Promise(function(resolve){// 初始化promise时，传入的函数会立刻被执行
  console.log('promise1')
  resolve()// resolved promise
}).then(function() {// 异步微任务
  console.log('promise2')
})

console.log('script end')
// script start
// async1 start
// async2
// promise1
// script end 同步代码执行完毕event call stack空闲
// async1 end
// promise2
// (触发dom渲染)
// setTimout
```

#### 【面试题】手撕Promise代码

面试中不可能让你手写Promises/A+规范，这里给出简易实现，要满足：
- 初始化
- 异步调用
- then catch链式调用
- API：.resolve、.reject、.all、.race

```javascript
class MyPromise {
  state = 'pending'
  value = undefined
  reason = undefined
  resolveCallbacks = []
  rejectCallbacks = []

  constructor(fn) {
    const resolveHandler = (value) => {
      if(this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.resolveCallbacks.forEach(fn => fn(this.value))
      }
    }
    const rejectHandler = (reason) => {
      if(this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.rejectCallbacks.forEach(fn => fn(this.reason))
      }
    }
    try {
      fn(resolveHandler, rejectHandler)
    } catch(err){
      rejectHandler(err)
    }
  }

  then(fn1, fn2) {
    // 当pending时,fn1和fn2被存储到callbacks中
    fn1 = typeof fn1 === 'function' ? fn1: (v) => v 
    fn2 = typeof fn2 === 'function' ? fn2: (e) => v 
    if(this.state === 'pending') {
      return new MyPromise((resolve, reject)=>{
        this.resolveCallbacks.push(() => {
          try{
            const newValue = fn1(this.value)
            resolve(newValue)
          }catch(err) {
            reject(err)
          }
        })
        this.rejectCallbacks.push((resolve, reject) => {
           try{
            const newReason = fn2(this.reason)
            reject(newReason)
          }catch(err) {
            reject(err)
          }
        })
      })
    }
    if(this.state === 'fulfilled') {
      return new MyPromise((resolve, reject)=>{
        try{
          const newValue = fn1(this.value)
          resolve(newValue)
        }catch(err) {
          reject(err)
        }
      })
    }
    if(this.state === 'rejected') {
      return new MyPromise((resolve, reject) => {
         try{
          const newReason = fn2(this.reason)
          resolve(newReason)
        }catch(err) {
          reject(err)
        }
      })
    }
  }

  catch(fn) {
    return this.then(null, fn)
  }
}

MyPromise.resolve = function(value) {
  return new MyPromise((resolve, reject)=>resolve(value))
}

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject)=>reject(reason))
}

MyPromise.all = function(promiseList=[]) {
  const p1 = new MyPromise((resolve, reject) => {
    const result = []
    const length = promiselist.length
    let resolvedCount = 0
    promiseList.forEach(p => {
      p.then(data => {
        result.push(data)
        resolvedCount++
        if(resolvedCount === length) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
  return p1
}

MyPromise.race = function(promiseList=[]) {
  let resolved = false 
  const p1 = new MyPromise((resolve, reject) => {
    promiseList.forEach(p => {
      p.then(data => {
        if(!resolved) {
          resolve(data)
          resolved = true
        }
      }).catch((err)=> {
        reject(err)
      })
    })
  })
  return p1
}
```

## DOM

JS基础知识只规定了**语法(ECMA262标准)**，而JS **Web API**可以网页操作的API(**W3C标准**)。语法是Web API的基础，实际开发中需要两个结合到实际应用。而Web API具体有以下内容：

- DOM
- BOM
- 事件绑定
- ajax
- 存储

现在是声明式框架盛行的时代，Vue和React封装了DOM操作，但**DOM操作一直都是前端开发者的必备基础知识**，只会框架而不懂DOM操作的开发者也玩不好声明式框架，本末倒置。要想真正学好DOM操作本文介绍的内容肯定不够，请自行翻阅红宝书进行系统学习**DOM(Document Object Model)**。

### DOM的本质

从HTML文件解析出来的一颗**树**。

### DOM节点操作

- **获取DOM节点**
- **attribute**
- **property**

```javascript
// 获取DOM节点
const div1 = document.getElementById('div1')// 元素
const divList = document.getElementsByTagName('div')// 集合
console.log(divList.length)
console.log(divList[0])
const containerList = document.getElementsByClassName('.container')// 集合
const pList = document.querySelectorAll('p')// 集合
```

```javascript
// DOM节点的property: 修改js变量
const pList = document.querySelectorAll('p')
const p = pList[0]
console.log(p.style.width) // 获取样式
p.style.width = '100px' //修改样式
console.log(p.className) // 获取class
p.className = 'p1' // 修改class
console.log(p.nodeName)
console.log(p.nodeType)
```

```javascript
// DOM节点的attribute：修改标签属性
const pList = document.querySelectorAll('p')
const p = pList[0]
p.getAttribute('data-name')
p.setAttribute('data-name', 'yinlei')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 16px')
```

细看property和attribute的区别：
- **property**: 修改对象属性，不会体现到html结构中
- **attribute**: 修改html属性，会改变html结构
- 两者都可能引起dom重新渲染

### DOM结构操作

- **新增/插入节点**
- **获取子元素列表，获取父元素**
- **删除子元素**

```javascript
// 新增/插入节点
const div1 = document.getElementById('div1')
// 新增节点
const p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
// 插入节点
div1.appendChild(p1)
// 移动已有节点
const p2 = document.getElementById('p2')
div1.appendChild(p2)
```

```javascript
// 获取子元素列表
const div1 = document.getElementById('div1')
const child = div1.childNodes
//获取父元素
const div1 = document.getElementById('div1')
const parent = div1.parentNode
```

```javascript
// 删除子元素
const div1 =  document.getElementById('div1')
const child = div1.childNodes 
div1.removeChild(child[0])
```

### DOM性能

DOM操作非常昂贵，要**避免频繁的DOM操作**，那Vue、React这种声明式框架就很好吗？其实这类声明式框架正如他们的官网文档所说，都是在效率和性能之间找到一个平衡而已。常见的避免频繁的DOM操作方式有：

- **对DOM查询做缓存**
- **将频繁操作改为一次性操作**

```javascript
// 对DOM查询做缓存

// 不缓存dom查询结果
for(let i=0; i < document.getElementsByTagName('p').length;i++) {
  // 每次循环，都要计算length，频繁进行dom查询
}

// 缓存dom查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for(let i=0;i < length;i++) {
  // 缓存length,只进行一次dom查询
}
```

```javascript
// 将频繁操作改为一次性操作

const listNode = document.getElementById('ul')
// 创建一个文档片段，此时还没有插入到DOM树中
const frag = document.createDocumentFragment()
// 执行插入
for(let x =0; x <10; x++) {
  const li = document.createElement('li')
  li.innerHTML = 'list item'
  frag.appendChild(li)
}
// 都插入完成后再插入到DOM树中
listNode.appendChild(frag)
```

## BOM

**BOM(Browser Object Model)**，这部分内容也可以在红宝书上查阅。

- navigator
- screen
- location
- history

```javascript
// navigator
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
console.log(isChrome)

// screen
console.log(screen.width)
console.log(screen.height)

// location
console.log(location.href)
console.log(location.protocol)
console.log(location.pathname)
console.log(location.search)
console.log(location.hash)

// history
history.back()
history.forward()
```

## 事件

### 事件绑定

```javascript
const btn = document.getElementById('btn')
btn.addEventListener('click', event => {
  console.log('clicked')
})
```

### 事件冒泡

```javascript
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <p id="p4">取消</p>
  </div>
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
</body>

const p1 = document.getElementById('p1')
const body = document.body
bindEvent(p1, 'click', e => {
  e.stopPropagation()// 阻止冒泡
  alert('激活')
})
bindEvent(body, 'click', e => {
  alert('取消')
})
```

### 事件代理

基于事件冒泡实现的事件代理,代码简洁、减少浏览器内存占用，但不要滥用。代理相当于把自己该做的事情给别人，这里是统一交给共同父级去处理。

```javascript
<div id="div1">
  <a href="#">a1</a>
  <a href="#">a2</a>
  <a href="#">a3</a>
  <a href="#">a4</a>
<button>点击增加一个a标签</button>
</div>

const div1 = document.getElementById('div1')
div1.addEventListener('click', e => {
  const target = e.target
  if(target.nodeName === 'A') {
    alert(target.innerHTML)
  }
})
```

#### 【面试题】编写一个通用的事件监听函数

```javascript
function bindEvent(elem, type, selector, fn) {
  if(fn == null) {
    fn = selector 
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if(selector) {
      // 代理
      if(target.matches(selector)) {
        fn.call(target, event)
      }
    }else {
      // 非代理
      fn.call(target, event)
    }
  })
}

// 普通绑定
const a = document.getElementById('link')
bindEvent(a, 'click', function(e) {
  e.preventDefault()
  alert(this.innerHTML)
})

// 代理绑定
const div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function(e) {
  const target = e.target
  alert(this.innerHTML)
})
```

#### 【面试题】描述事件冒泡的流程

- 基于DOM树形结构
- 事件会顺着触发元素向上冒泡
- 应用场景：代理

#### 【面试题】无限下拉的图片列表，如何监听每个图片的点击 

- 事件代理
- 用event.target获取触发元素
- 用matches判断是否是触发元素

## ajax

这部分内容也可以在红宝书上找到，书上写的更详细，请务必务必仔细读一遍。

### XMLHttpRequest

```javascript
// get
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api', true)// 开启异步请求
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
}
xhr.send(null)

// post
const xhr = new XMLHttpRequest()
xhr.open('POST', '/login', true)// 开启异步请求
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
}
const postData = {
  username :'yinlei',
  password :'123456'
}
xhr.send(JSON.stringify(postData))
```

### 状态码

**xhr.readyState**:

- 0 UNSET 尚未调用open方法
- 1 OPENED open方法已被调用
- 2 HEADERS_RECEIVED send方法已被调用，header已被接收
- 3 LOADING 下载中 responseText已有部分内容
- 4 DONE 下载完成

**xhr.status**:

- 2xx 成功处理请求 200等
- 3xx 需要重定向，浏览器直接跳转 301 302 304等
- 4xx 客户端请求错误 404 403等
- 5xx 服务器端错误

### 跨域：同源策略、跨域解决方案

**同源策略**，ajax请求时，**浏览器**(server端无此限制)要求**当前网页和server端**必须同源来保证安全。只要同时满足**协议、域名、端口**一致，就是**同源**。如以下不同源：

- 前端: https://www.yinlei.pro:8080
- 服务端：https://www.yinleilei.com/api

加载**图片、css、js可无视同源策略**：

- \<img src="跨域地址"/>
- \<link href="跨域地址"/>
- \<script src="跨域地址"/>

利用这个特性，我们可以：

- img标签用于统计打点，使用第三方统计服务
- link、script使用CDN
- script实现JSONP

**跨域**，解决浏览器的同源策略，需要满足：

- 所有的跨域都必须经过server端允许、配合
- 未经server端允许就实现跨域表明浏览器有漏洞

**JSONP**，服务器端可以任意动态拼接数据返回，只要符合HTML格式。同理，如果此时\<script src="https://yinlei.pro/getData.js"> 不一定会返回js文件，由服务端决定。这利用了 **script可以绕过跨域限制，服务器可以任意动态拼接数据返回**，所以script就可以获取跨域数据，只要服务器端愿意这样做。【前几年的bilibili网站就是用的JSONP】

```javascript
<script>
  window.callback = function(data) {
    // 跨域得到的信息
    console.log(data)
  }
</script>
<script src="https://yinlei.pro/getData.js?username=xxxx&callback=xxx"></script>
// 返回callback({username: 'yinlei', age: 25})
```

JSONP是前端和服务端配合，当下比较流行的是**服务器设置http header来实现跨域**，这就是大名鼎鼎的**CORS**，在expressjs中有cors包可以使用，其他语言如go等都有相应实现或者自己实现处理。

```javascript
response.setHeader('Access-Control-Allow-Origin', "https://yinlei.pro:8080")
response.setHeader('Access-Control-Allow-Headers', "X-Requested-With")
response.setHeader('Access-Control-Allow-Methods', "PUT,POST,GET,DELETE,OPTIONS")

response.setHeader('Access-Control-Allow-Credentials', 'true')
```

### 现代前端开发常用的ajax工具

- jQuery
- fetch
- axios

#### 【面试题】手写ajax

```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if(xhr.status === 404) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(null)
  })
}

const url ='/api/test'
ajax(url).then(res => console.log(res)).catch(err => console.error(err))
```

#### 【面试题】跨域的实际常用方式

- JSONP
- CORS

## 存储

请记住，根据红宝书上讲的**客户端存储**,包含了cookie、Web Storage、IndexedDB。本文主要针对js面试，IndexedDB请查阅红宝书。

### cookie

本身用于浏览器和server通讯，被“借用”到本地存储，可以通过**document.cookie='xxx'**来修改。但cookie存储最大4KB，http请求时需要发送到服务端，增加请求数据量。

### localStorage、sessionStorage

HTML5专门为存储而设计的，最大可存储5M，API有setItem、getItem且不会随着http请求被发送出去。

- localStorage数据会永久存储，除非代码删除或手动清除
- sessionStorage数据只存在当前会话，浏览器关闭则清空
- 一般用localStorage更多一点

#### 【面试题】描述cookie、localStorage、sessionStorage的区别

- 容量
- API易用性
- 是否跟随http请求发送出去

---

# 高频JS面试真题

以下面试题内容考点均能在红宝书上找到出处。

### var、let、const的区别

- var有变量提升
- var是ES5语法；let、const是ES6语法
- var没有块级作用域；let、const有块级作用域
- var、let是变量，可修改；const是常量，不可修改

### typeof返回哪些类型

- undefined
- string
- number
- boolean 
- symbol
- object(typeof null === 'object')
- function

### 列举强制类型转换、隐式类型转换

- 强制：parseInt、parseFloat、toString等
- 隐式：if、逻辑运算、\=\=、+拼接字符串

### 手写深度比较，模拟loadsh isEqual

```javascript
const obj1 = {
  a: 7, 
  b: {
    x: 25,
    y: 24
  }
}
const obj2 = {
  a: 7, 
  b: {
    x: 25,
    y: 24
  },
  c: 48
}

console.log(obj1 === obj2) // false 
console.log(isEqual(obj1, obj2) === true)// true

// 判断是否是对象或数组
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

// 全相等
function isEqual(obj1, obj2) {
  if(!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  if(obj1 === obj2) {// 同一个对象
    return true
  }
  // 两个都是 对象或数组，且不相等
  // 1. 先取出obj1、obj2的keys比较个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if(obj1Keys.length !== obj2Keys.length) {
    return false 
  }
  // 2. 以obj1为基准，和obj2依次递归比较
  for(let key in obj1) {
    const res = isEqual(obj1[key], obj2[key])
    if(!res) {
      return false
    }
  }
  // 3. 全相等
  return true
}
```

### split()、join()的区别

```javascript
'1-2-3'.split('-')// [1, 2, 3]
[1,2,3].join('-')// '1-2-3'
```

### 数组的pop()、push()、unshift()、shift()分别做什么

从功能、返回值、是否对原数组造成影响角度答题。

```javascript
const arr = [10, 20, 30, 40]

const popRes = arr.pop()
console.log(popRes, arr)//40, 10 20 30

const pushRes = arr.push(50) 
console.log(pushRes, arr)//4(length), 10 20 30 50

const unshiftRes = arr.unshift(1)
console.log(unshiftRes, arr)// 5(length), 1 10 20 30 50

const shiftRes = arr.shift()
console.log(shiftRes, arr)// 1, 10 20 30 50
```

### 数组的API有哪些是纯函数

纯函数：不改变原数组（无副作用）、返回一个数组

- concat
- map
- filter
- slice

### 数组slice()、splice()的区别

- 功能区别：slice-切片；splice-剪接
- 参数和返回值
- 是否是纯函数: slice是，splice不是

```javascript
const arr = [10,20,30,40,50]
const arr1 = arr.slice()// [10, 20, 30, 40, 50]
const arr2 = arr.slice(1,4)// [20, 30, 40]
const arr3 = arr.slice(2)// [30, 40, 50]
const arr4 = arr.slice(-2)// [40, 50]

const arr5 = arr.splice(1, 2, 'a', 'b', 'c')// [20, 30], [10, 'a', 'b', 'c', 40, 50]
```

### [10, 20, 30].map(parseInt)返回结果

```javascript
const res = [10, 20, 30].map(parseInt)
console.log(res) // [10, NaN, NaN]

// 拆解
[10, 20, 30].map((num, index)=> {
  return parseInt(num, index)
})
```

因为parseInt的第二个参数是代表进制的基数，所以出现上述结果。

### ajax请求的get、post的区别是什么

- get一般用于查询，post一般用于用户提交操作
- get参数拼接在url上，post放在请求体内(数据体积可更大)
- 安全性上，post易于防止CSRF攻击

### 函数call、apply的区别

- fn.call(this, p1, p2, p3)
- fn.apply(this, arguments)

### 事件代理(委托)是什么

- 有很多个子元素有相同的事件处理，此时可以将这些元素的事件处理全部移交给父元素来处理，这样提高了性能
- 主要是利用了事件冒泡的特性
- 应用场景是无限滚动列表的列表项点击事件监听

### 闭包是什么，其特点、负面影响分别是什么

- 和作用域、自由变量有关
- 应用场景：**作为参数被传入**、**作为返回值被返回**
- 闭包的自由变量查找：**要在函数定义的地方，而不是执行的地方**
- 影响：变量常驻内存，得不到释放，闭包不要乱用。

### 如何阻止事件冒泡和默认行为

- event.stopPropagation()
- event.preventDefault()

### 查找、添加、删除、移动DOM的方法

- createElement
- appendChild
- removeChild

### 如何减少DOM操作

- 缓存DOM查询结果
- 多次DOM操作合并到一次插入createDocumentFragment

### 解释jsonp的原理，为何不是真正的ajax

- 浏览器的同源策略(服务端没有同源策略)和跨域
- script link img标签可以绕过跨域

jsonp的原理：

```javascript
<script>
  window.abc =  function(data){
    console.log(data)
  }
</script>
<script src="http://localhost:3000/jsonp.js?username=xxx&callback=xxx"></script>

// jsonp.js
abc({name: 'yinlei'})
```

### document load、ready的区别

```javascript
window.addEventListener('load', function() {
  // 页面的全部资源加载完才会执行，包括图片、视频
})
document.addEventListener('DOMContentLoaded', function() {
  // DOM渲染完即可执行，此时图片、视频可能还没加载完成
})
```

### \=\=和\=\=\=的区别

- \=\=会尝试类型转换
- \=\=\=严格相等

### 函数声明、函数表达式的区别

- 函数声明: function fn(){}
- 函数表达式：const fn = function(){}
- 函数声明会在代码执行前预加载，而表达式不会

### new Object()、Object.create()的区别

- {} 等同于 new Object(),原型Object.prototype
- Object.create(null)没有原型
- Object.create({...})可指定原型

### this的场景题

```javascript
const User = {
  count: 1,
  getCount: function() {
    return this.count 
  }
}

console.log(User.getCount())// 1
const func = User.getCount // window
console.log(func())// undefined
```

出现以上原因是因为，this的具体值由实际运行决定。

### 关于作用域和自由变量的场景题

```javascript
let i 
for(i = 1; i<= 3; i++) {
  setTimeout(function() {
    console.log(i)
  })
} 
// 4 4 4 
```

```javascript
let a = 100
function test() {
  alert(a)
  a = 10
  alert(a)
}
test() 
alert(a)
// 100 10 10
```

### 判断字符串以字母开头，后面字母数字下划线，长度6-30

```javascript
const reg = /^[a-zA-Z]\w{5,29}$/
```

### 手写字符串的trim()方法，保证浏览器兼容性

```javascript
String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
```

### 如何获取多个数字中的最大值

```javascript
function max() {
  const nums = Array.protoype.slice.call(arguments)
  let max = 0
  nums.forEach(n => {
    if(n > max) {
      max = n
    } 
  })
  return max 
}
// Math.max(xxxxxxx)
```

### 如何用JS实现继承

- class继承
- prototype继承

### 如何捕获js程序中的异常

```javascript
// 方式1：try catch
try{
  //....
} catch(ex) {
  console.error(ex)
} finally {
  // ...
}

// 方式2：自动捕获
window.onerror = function (message, source, lineNum, colNum, error) {
  // 对跨域的js不会有详细的报错信息
  // 对压缩的js要配合sourceMap反查到未压缩的代码行
}
```

### 什么是JSON

- 一种数据格式，本质是一段字符串
- json格式和js对象结构一致，对js更友好
- window.JSON是全局对象：JSON.stringify JSON.parse

### 获取当前页面url参数

- 传统方式，location.search
- 新api：URLSearchParams

```javascript
// 传统方式
function query(name) {
  const search = location.search.substr(1)
  // search: a=10&b=20&c=30
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const res = search.match(reg)
  if(res === null ){
    return null 
  }
  return res[2]
}

// 现代方式：URLSearchParams
function query(name ){
  const search = location.search
  const p = new URLSearchParams(search)
  return p.get(name)
}
```

### 手写深拷贝

```javascript
function deepClone(obj = {}) {
  if(typeof obj !== 'object' || obj == null) {
    // obj是null或不是对象和数组，直接返回
    return obj 
  }
  let result 
  if(obj instanceof Array) {
    result = []
  } else {
    result = {}
  } 
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result 
}
```

Object.assign不是深拷贝！

### 介绍RAF requestAnimationFrame

- 要想动画流畅，更新频率要60帧/s, 即16.67ms更新一次视图
- setTimeout要手动控制帧率，而RAF浏览器会自动控制
- 后台标签或隐藏iframe中，RAF会暂停，而setTimeout依然运行

### 前端如何性能优化

- 原则：多使用内存、缓存，减少计算，减少网络请求
- 方向：加载页面，页面渲染，页面操作流畅度

### Map和Object的区别、set和数组的区别

**Object是无序，数组是有序**。有序操作慢，无序操作快。

Map和object的区别：

- Map可以以任意类型为Key
- Map是有序结构
- Map操作同样很快


Set和数组的区别：

- Set元素不能重复
- Set是无序结构，操作很快

### WeakMap、WeakSet

- 弱引用，防止内存泄漏
- WeakMap只能用对象作为key, WeakSet只能用对象作为value
- 没有forEach、size, 只能用add delete has
- 应用场景：建立对象之间的关联关系且对象之间保持独立，销毁不影响彼此的销毁逻辑

### 数组求和reduce方法

可以看成**累加**！

```javascript
const arr = [10, 20,30,40,50]
const sum = arr.reduce((sum, curVal, index, arr) => { 
  return sum + curVal// 本次结果作为下一次开始值
}, 0) // 初始值0
```

### ajax fetch axios的区别

都用于网络请求，但不同维度：

- Ajax: 一种技术的统称，Asynchronous Javascript and XML
- Fetch: 一个具体的API，浏览器原生API，用于网络请求，和XMLHttpRequest一个级别，语法更加简洁、易用，支持Promise
- Axios: npm上的第三方库,也是最常用的网络请求lib，其内部可用XMLHttpRequest、Fetch实现

> Lib不等于API。实际项目中，我们一般使用现成的lib,尽量不要自己造轮子，但是在学习时读源码、造轮子是一个提升技术的好方式

### 节流、防抖的区别

**防抖**：防止抖动，“先抖动着，啥时候停了，再执行下一步”。
例如，一个input,等输入停止后再触发搜索。

```javascript
// 防抖
function debounce(fn, delay=300) {
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

**节流**：节省交互沟通。其流，不一定指的流量。"别急，一个个来，按时间节奏来，插队者无效"。
例如，drag或scroll期间触发某个回调，要设置一个时间间隔。

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

两者的区别为：

- 防抖：限制执行次数，多次密集的触发只执行1次。关注结果。
- 节流：限制执行频率，有节奏的执行。关注过程。
- 实际过程中用lodash库

### px % em rem vm vh的区别

- px：基本单位、绝对单位（其他的单位都是相对单位）
- %: 相对于父元素的宽度比例
- em: 相对于当前元素的font-size
- rem: 相对于根节点的font-size
- vw: 屏幕宽度的1%
- vh: 屏幕高度的1%

### 禁用箭头函数的场景

箭头函数的缺点：

- 没有arguments
- 无法通过apply call bind改变this,其this指向其父级作用域的this
- 某些箭头函数代码难以阅读

禁用的场景：

```javascript
// 禁用场景1： 对象方法
const obj = {
  name: 'yinlei',
  getName: ()=> {
    return this.name
  }
}
console.log(obj.getName())// ''

// 禁用场景2：原型方法
const obj = {
  name: 'yinwei'
}
obj.__proto__.getName = () => {
  return this.name
}
console.log(obj.getName())// ''

// 禁用场景3：构造函数
const Person = (name, age)=> {
  this.name = name
  this.age = age
}
const f = new Person('yinwei', 24)// error: Foo is not a constructor

// 禁用场景4：动态上下文中的回调函数
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  this.innerHTML = 'button clicked'
})

// 禁用场景5：Vue生命周期和method,但是react中的class中除外
```

> 箭头函数很方便，但是不同于kotlin中的箭头函数，js需要对this和arguments保持警惕！

### TCP三次握手，四次挥手的过程

建立TCP连接：
- 先建立连接：确保双方都有收发消息的能力
- 再传输内容：如发送一个get请求
- 网络连接是tcp协议，传输内容是http协议

三次握手，建立连接：
- client发包SYN，server接收（server:有client要找我）
- server发包SYN+ACK，client接收（client:server已经收到消息了）
- client发包ACK，server接收（server:client要准备发送了） 

四次挥手，断开连接：
- client发包FIN，server接收（server:client已请求结束）
- server发包ACK，client接收（client:server已收到，我等待它关闭）
- server发包FIN，client接收（client:server此时可以关闭连接了）
- client发包ACK，server接收（server:可以关闭了，然后关闭连接）

### for...in、for...of的区别

- for...in：遍历得到key
- for...of：遍历得到value
- 遍历对象：for...in可以，for...of不可以
- 遍历map set: for...of可以，for...in不可以
- 遍历generator: for...of可以，for...in不可以
- for...in用于可枚举数据，for...of用于可迭代的数据

> Object.getOwnPropertyDescriptors()

### for await...of有什么作用

用于遍历多个Promise。

```javascript
function createPromise(val) {
  return new Promise((resolve)=> {
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}

(async function(){
  const p1 = createPromise(100)
  const p2 = createPromise(200)
  const p3 = createPromise(300)

  const list = [p1, p2, p3]
  // Promise.all(list).then(res => console.log(res))
  for await (let res of list) {
    console.log(res)
  }
})()
```

### offsetHeight scrollHeight clientHeight的区别

> 盒子模型：width height padding border margin box-sizing

- offsetHeight offsetWidth: border+padding+content
- clientHeight clientWidth: padding+content
- scrollHeight scrollWidth: padding+实际内容尺寸

### HTMLCollection、NodeList的区别

- DOM是一颗树，所有节点都是Node
- Node是Element的基类
- Element是其他HTML元素的基类，如HTMLDivElement
- HTMLCollection是Element的集合
- NodeList是Node的集合
- 获取node和elemnt的返回结果可能不一样(比如xxx.childNodes、xxx.children)

> 建议好好啃一啃js红宝书的DOM那几节，十分经典！

HTMLCollection和NodeList都不是数组，而是类数组

```javascript
// 将类数组变为数组
const arr1 = Array.from(list)
const arr2 = Array.prototype.slice.call(list)
const arr3 = [...list]
```

### JS严格模式的优势

'use strict'开启严格模式。

- 全局变量必须要先声明
- 禁止用with
- 创建eval作用域
- 禁止this指向window
- 函数参数不能重名

### Vue中computed和watch的区别

- computed: 用于计算产生新的数据，有缓存
- watch: 用于监听现有的数据，没有缓存

### Vue中组件间的通讯方式

- props、$emit
- $attr
- 自定义事件（event-emitter库）
- $parent
- $refs
- provide/inject
- vuex
- pinia

通讯场景：
- 父子组件
- 上下级组件跨多级通讯
- 全局组件

### Vuex中mutation action的区别

- mutation: 原子操作，必须同步代码
- action: 可包含多个mutation，可包含异步代码

### 构造函数和原型的重名属性

```javascript
function Person() {
  Person.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
Person.prototype.a = function(){
  console.log(3)
}
Person.a = function() {
  console.log(4)
}

Person.a()// 4
let obj = new Person()
obj.a()// 2
Person.a()// 1
```

> 不要去读代码，而是模拟执行代码

### Promise的执行顺序

> then交替执行：多个fulfilled promise实例，同时执行then链式调用，then会交替执行，这是编译器的优化，防止一个promise占据太久的时间  
> then中返回promise实例时：相当于多出一个promise实例，也会”交替执行“  
> then中返回promise实例会出现慢两拍的效果：
> - 第一拍：promise需要由pending变为fulfilled
> - 第二拍：then函数挂载到microtaskqueue

```javascript
Promise.resolve().then(() => {
  console.log(0)
  return Promise.resolve(4)
}).then(res => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})
```

### 对象和属性的连续赋值

> 连续赋值，倒叙执行

```javascript
let a = {n: 1}
let b = a 
a.x = a = {n: 2}

// 拆解为：
// a.x = undefined
// let x = a.x
// x = a = {n:2}

console.log(a.x)// 2
console.log(b.x)// 1
```

### JS对象属性类型的问题

js对象key的数据类型：

- 只能是字符串、Symbol类型
- 其他类型都会被转换为字符串，直接调用它的toString()

```javascript
let a = {}, b = '123', c = 123
a[b] = 'b'// a['123'] = 'b'
a[c] = 'c'// a['123'] = 'c'
console.log(a[b])// 'c'
```

```javascript
let a = {}, b = Symbol('123'), c = Symbol('123')
a[b] = 'b'
a[c] = 'c'
console.log(a[b])// 'b'
```

```javascript
let a = {}, b = {key:'123'}, c = {key:'456'}
a[b] = 'b'// a['[object object]'] = 'b'
a[c] = 'c'// a['[object object]'] = 'c'
console.log(a[b])// 'c'
```

### 为什么0.1+0.2不等于0.3

计算机使用二进制存储数据。整数转换为二进制是没有误差的。而小数可能无法用二进制准确表达。不止JS,其他编程语言都一样。

解决方案：第三方库mathjs
