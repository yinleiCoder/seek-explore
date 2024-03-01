---
title: 前端独享的设计模式
description: 后端有23种设计模式，前端也有，但远没有后端那么多
date: '2022-5-20 19:26:20'
tag: 计算机
---

> **设计**：设计模式、思想  
> **模式**：前辈们总结出来的固定套路  
> 23种设计模式：1995年《设计模式：可复用面向对现象软件的基础》  
> - 创建型
>   - 工厂模式
>   - 单例模式
>   - 原型模式
> - 结构型
>   - 代理模式
>   - 装饰器模式
>   - 适配器模式
>   - 外观模式
>   - 桥接模式
>   - 组合模式
>   - 享元模式
> - 行为型
>   - 观察者模式
>   - 迭代器模式
>   - 策略模式
>   - 模板方法模式
>   - 职责链模式
>   - 命令模式
>   - 备忘录模式
>   - 状态模式
>   - 访问者模式
>   - 中介者模式
>   - 解释器模式

## Contents

# UML类图

**UML**,统一建模语言Unified Modeling Language，是软件设计的绘图标准，不仅是类图，还有很多种图。

> 画图工具：MS Visio、processon.com  

## 单个类

- 3个区域：名称、属性、方法
- 权限描述符：+代表public、#代表protected、-代表private

## 类之间的关系

- 实现：实现接口（虚线、空箭头）
- 泛化：继承父类（实线、空箭头）
- 关联：A是B的属性（实线、实箭头）

## 关联关系的细化

- 聚合：整体包含部分，部分可脱离整体而单独存在
- 组合：整体包含部分，部分不可脱离整体
- 依赖：不是属性关系，而是函数参数或返回值

# 设计模式的原则

> SOLID五大设计原则，分开理解“**先设计**”和“**后模式**”，重点关注**开放封闭原则**

## S单一职责原则

- 每个程序都做好一件事
- 功能太多要拆分
- 每个部分保持相互独立

## O开放封闭原则

- 对拓展开放
- 对修改封闭
- 需求变化时，通过拓展来解决，而非改动

## L李氏置换原则

- 子类能覆盖父类
- 父类出现的地方，子类也能出现

## I接口隔离原则

- 保持接口的单一独立
- 避免出现“胖接口”

## D依赖倒置原则

- 面向接口编程
- 而非面向实例

# 工厂模式

> 遇到**new Class**的地方，就要考虑工厂模式(工厂方法、抽象工厂、建造者)

- 工厂和类分离解耦
- 可扩展多个类
- 工厂的创建逻辑可自由扩展

```typescript
type FnType = () => void
interface IProduct {
    name: string 
    fn1: FnType
    fn2: FnType
}

class Product1 implements IProduct {
    name: string 
    constructor(name: string) {
        this.name = name
    }

    fn1() {
        alert('Product1 fn1')
    }

    fn2() {
        alert('Product1 fn2')
    }
}

class Product2 implements IProduct {
    name: string 
    constructor(name: string) {
        this.name = name
    }

    fn1() {
        alert('Product2 fn1')
    }

    fn2() {
        alert('Product2 fn2')
    }
}

class Creator {
    // 依赖倒置原则
    create(type: string, name: string): IProduct {
        if(type === 'p1') {
            return new Product1(name)
        }
        if(type === 'p2') {
            return new Product2(name)
        }
        throw new Error('Invalid type')
    }
}

const creator = new Creator()
const p1 = creator.create('p1', 'name1')
const p2 = creator.create('p2', 'name2')
```

# 单例模式

> 前端对单例模式并不常用，但单例思想随处可见

- 一个对象或实例只能被创建一次
- 创建之后就缓存起来，以后继续使用
- 静态属性在UML类图中用**下划线**表示
- 多线程语言的单例需要加线程锁

```typescript
class Singleton {
    name: string
    private constructor(name: string) {
        this.name = name 
    }

    private static instance: Singleton | null 

    static getInstance(name: string): Singleton {
        if(Singleton.instance == null) {
            Singleton.instance = new Singleton(name)
        }
        return Singleton.instance
    }
}

const s1 = Singleton.getInstance('yin lei')
const s2 = Singleton.getInstance('yin lei')
console.log(s1 === s2) // true
```

```javascript
function genGetInstance() {
    let instance 

    class Singleton {}

    return () => {
        if(instance == null) {
            instance = new Singleton()
        }
        return instance
    }
}

const getInstance = genGetInstance()
const s1 = getInstance()
const s2 = getInstance()
console.log(s1 === s2) // true
```

# 观察者模式

> Vue3不再自带EventBus功能，组件销毁时要及时off自定义事件

```javascript
// 主题
class Subject {
    private state: number = 0
    private observers: Observer[] = []

    getState():number {
        return this.state
    }

    setState(newState: number) {
        this.state = newState
        this.notify()
    }

    // 添加观察者
    attach(observer: Observer) {
        this.observers.push(observer)
    }

    // 通知
    private notify() {
        this.observers.forEach(observer => {
            observer.update(this.state)
        })
    }
}

// 观察者
class Observer {
    name: string 
    constructor(name: string) {
        this.name = name
    }

    update(state: number) {
        console.log(`${this.name} updated, state is ${state}`)
    }   
}

const subject = new Subject() 
const observer1 = new Observer('A') 
subject.attach(observer1)
const observer2 = new Observer('B') 
subject.attach(observer2)

subject.setState(1)
```

## 发布订阅模式(衍生)

- 不属于传统的23种设计模式
- 是观察者模式的另一种实现形式
- 观察者模式：Subject Observer直接绑定，无中间媒介
- 发布订阅模式：Publisher Observer互不认识，中间有媒介
- 需要手动触发emit
- Vue2本身就是一个EventBus,Vue3不自带EventBus，推荐使用**mitt**或者老牌的EventBus **eventEmitter**

```javascript
import mitt from 'mitt'

const emitter = mitt()

emitter.on('change', () => {
    console.log('change 1')
})

emitter.on('change', () => {
    console.log('change 2')
})

emitter.emit('change')
emitter.emit('change')
// emitter.off()
```

# 迭代器模式

> 普通的for循环不是迭代器，迭代器是解决for循环的问题  
> 迭代器的作用：
> - 用于for...of
> - 数组：解构、扩展操作符、Array.from
> - 用于Promise.all Promise.race
> - 用于yield*
> - 配合生成器Generator

- 顺序访问有序结构
- 不知道数组的长度和内部结构
- 有序结构：Symbol.iterator和迭代器
- Object不是有序结构

```javascript
class DataIterator {
    private data: number[]
    private index = 0

    constructor(container: DataContainer) {
        this.data = container.data
    }

    next(): number | null {
        if(this.hasNext()) {
            return this.data[this.index++]
        }
        return null
    }

    hasNext(): boolean {
        if(this.index >= this.data.length) {
            return false
        }
        return true
    }
}

class DataContaienr {
    data: number[] = [10, 20, 30, 40, 50]

    getIterator() {
        return new DataIterator(this)        
    }
}

const container = new DataContainer()
const iterator = container.getIterator()
while(iterator.hasNext()) {
    const num = iterator.next()
    console.log(num)
}
```

结合生成器自定义迭代器：

```javascript
class CustomIterator {
    private data: number[]
    constructor() {
        this.data = [100, 200, 300]
    }

    *[Symbol.iterator]() {
        yield* this.data
    }
}
const iterator = new CustomIterator() 
for(let n of iterator) {
    console.log(n)
}
```

结合生成器+yield遍历dom树：

```javascript
function* traverse(elemList: Element[]) {
    for(const elem of elemList) {
        yield elem

        const children = Array.from(elem.children)
        if(children.length) {
            yield* traverse(children)
        }
    }
}
```

# 原型模式

- 原型模式不常用，但原型链是JS基础
- 属性描述符是理解对象属性的基础
- 函数都有显式原型prototype
- 对象都有隐式原型__proto__
- 对象__proto__指向其构造函数的prototype
- 该模式应用场景Object.create

```javascript
class Clone {
    name = 'clone'

    clone(): Clone {
        return new Clone()
    }
}
```

# 装饰器模式

- 传说中的**AOP**面向切面编程，业务和系统基础功能分离，和Decorator很配
- 针对一个对象，动态添加新功能，但不改变它原有的功能
- typescript有装饰器语法,装饰器就是一个函数

```javascript
class Circle {
    draw() {
        console.log('draw circle')
    }
}

class Decorator {
    private circle: Circle
    constructor(circle: Circle) {
        this.circle = circle
    }

    draw() {
        this.circle.draw()
        this.serBorder()
    }

    private setBorder() {
        console.log('border')
    }
}

const circle = new Circle()
const decorator = new Decorator(circle)
decorator.draw()
```

# 代理模式

- 针对一个对象，设置代理，控制对这个对象的访问，用户不可直接访问该对象，而是要通过代理
- 结合Vue3使用的Proxy语法机制
- 装饰器不能改变原始对象的行为，代理可以改变原始对象的行为
- 比如：DOM事件代理
- Proxy的使用场景：跟踪属性访问、隐藏属性、验证属性、记录实例
- Proxy的坑：捕获器不变式（对象属性描述符）、关于this在执行时确定

```javascript
class RealImg {
    fileName: string
    constructor(fileName: string) {
        this.fileName = fileName
    }

    display() {
        this.loadFromDisk()
        console.log('display..', this.fileName)
    }

    private loadFromDisk() {
        console.log('loading...', this.fileName)
    }
}

class ProxyImg {
    realImg: RealImg
    constructor(fileName: string) {
        this.realImg = new RealImg(fileName)
    }

    // 代理
    display() {
        this.realImg.display()
    }
}
```

# 其他设计模式

> 设计模式不常用，但是他们的设计思想很有指导意义

## 职责链模式

- 一个流程，需要多个角色处理
- 把多个角色分开，通过一个链串联起来
- 各个角色相互分离，互不干扰
- 如：Promise的链式操作

## 策略模式

- 多个条件分支
- 不用很多if..else或switch..case
- 每个分支单独处理，相互隔离

## 适配器模式

- 比如需要使用一个对象，它的API返回格式不一定完全适合我们的需求，需要通过适配器转换
- 很像Android开发的RecyclerView适配器
