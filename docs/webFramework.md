---
title: 探探Vue、React
description: 深挖框架实现原理，提升自己的设计能力、代码编写能力、代码阅读能力，写出高质量的代码
date: '2023-12-28 15:58:02'
tag: 计算机
---

## Contents

# Vue面试题

> 原理 不等于 源码，除非你遇到一个傻逼面试官~  
> 官网文档：https://cn.vuejs.org/guide/introduction.html

## 为什么选择Vue3而不是Vue2

- 性能更好
- 体积更小
- 更好的TS支持
- 更好的代码组织
- 更好的逻辑抽离

## Vue3比Vue2快的原因

- Proxy响应式
- PatchFlag
  - 编译模板时，动态节点做标记
  - 标记,分为不同的类型，如TEXT PROPS
  - diff算法时，可以区分静态节点，以及不同类型的动态节点
- hoistStatic
  - 将静态节点的定义，提升到父作用域，缓存起来
  - 多个相邻的静态节点，会被合并起来
  - 典型的空间换时间
- cacheHandler
  - 缓存事件
- SSR优化
  - 静态节点直接输出，绕过了vdom
  - 动态节点，还是需要动态渲染
- tree-shaking
  - 编译时，根据不同的情况，引入不同的API

## Vue3和Vue2生命周期的区别

Vue3中的Options API的生命周期：
- beforeDestory改为beforeUnmount
- destroyed改为unmounted
- 其他沿用Vue2的生命周期

Vue3中的Composition API的生命周期：
- beforeCreate、created改为setup
- 其他生命周期钩子改为onXXX函数

## Composition API和Options API怎么坚定地选择

Composition API带来了更好的代码组织、逻辑复用、类型推导。不建议Composition API和Options API共用，会引起代码的混乱。针对小型项目、业务逻辑简单，用Options API;中大型项目、逻辑复杂，用Composition API。但是不要误解Composition API，它属于高阶技巧，不是基础必会，是为解决项目业务逻辑复杂而设计。

## Composition API怎么实现代码的逻辑复用

抽离逻辑代码到一个函数，且该函数命名约定应当遵守为useXxxx格式，然后在setup中引用该函数。

```javascript
// 以封装鼠标位置为例：
import {ref, onMounted, onUnmounted} from 'vue'

function useMousePosition() {
    const x = ref(0)
    const y = ref(0)

    function update(e) {
        x.value = e.pageX
        y.value = e.pageY
    }

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    return {
        x, 
        y
    }
}
```

## Composition API是不是抄袭React Hooks

- 前者setup只会被调用一次，后者函数会被多次调用
- 前者不需要useMemo useCallback,因为setup只调用一次
- 前者不需要顾虑调用顺序，后者需要保证hooks的顺序一致
- 前者react+ref比后者useState更难理解

## ref、toRef、toRefs傻傻搞不清

ref，生成值类型的响应式数据或获取元素节点，可用于模板、reactive，通过.value修改值。

toRef，针对一个响应式(reactive封装)的prop,创建一个ref,具有响应式，且两者保持引用关系。但用于普通对象(非响应式对象)，产出的结果就不具备响应式。

```javascript
const man = reactive({
    age: 25,
    name: 'yinlei'
})
const ageRef = toRef(man, 'age')

setTimeout(() => {
    man.age = 26
}, 1500)

setTimeout(() => {
    ageRef.value = 8
}, 3000)
```

toRefs,将响应式对象(reactive封装)转换成普通对象，对象的每个prop都是对应的ref，两者保持引用关系。

```javascript
const man = reactive({
    age: 25,
    name: 'yinlei'
})
const manAsRef = toRefs(man)
const {age: ageRef, name: nameRef} = manAsRef

setTimeout(() => {
    console.log(55555)
    man.age = 26 // 不会体现在UI上
}, 1500)

return {
    ...state, // 解构失去了响应性
    state, // 在模板中需要state.age state.name
}
```

总结，用reactive做对象的响应式，用ref做值的响应式，但官网更推荐现在全部用ref，且建议ref的变量命名都用xxxRef。在setup中返回toRefs(state)或toRef(state, 'xxx')。Composition API自定义函数返回响应式对象时用toRefs以便使用方解构不丢失响应性。

## 为什么Vue官方更推荐使用ref

**值类型会丢失响应式**，在setup、computed、composition function都有可能返回**值类型**。如果Vue不定义ref，庞大的社区会自行造ref,就像C++一样百花齐放地"混乱"。

## ref的.value不能干掉吗

ref是一个对象，不丢失响应式，.value存储值，通过.value属性的get、set实现响应式。用于模板、reactive时，不需要.value，其他情况都需要。为什么需要.value呢，一方面是Proxy的需要，另一方面，普通的改值类型和改引用类型更是返回.value保持、传递响应式的原因。

## toRef、toRefs有存在的必要吗

不丢失响应式的情况下，把对象数据分解、扩散(解构)。前提是针对reactive封装的响应式对象，而非普通对象。toRef、toRefs的使用目的不是创造响应式，而是**延续响应式**。

## Vue3升级了什么

- createAPP

```javascript
//vue2.x
const app = new Vue({})
Vue.use()
Vue.mixin()
Vue.component()
Vue.directive()

//vue3.x
const app = Vue.createApp({})
app.use()
app.mixin()
app.component()
app.directive()
```

- emits属性

```javascript
<Hello :msg="msg" @onSayHello="sayHello"></Hello>
export default {
    name: 'Hello',
    props: {
        msg: String
    },
    emits: ['onSayHello'],
    setup(props, {emit}) {
        emit('onSayHello', 'yinlei')
    }
}
```

- 生命周期
- 多事件

```javascript
<button @click="clickOne($event), clickTwo($event)">
    提交
</button>
```

- Fragment

```javascript
//vue2.x
<template>
    <div>
        <h3></h3>
        <div></div>
    </div>
</template>

//vue3.x
<template>
    <h3></h3>
    <div></div>
</template>
```

- 剔除.sync

```javascript
//vue2.x
<Hello v-bind:title.sync="title"></Hello>

//vue3.x
<Hello v-model:title="title"></Hello>
```

- 异步组件的写法

```javascript
//vue2.x
new Vue({
    components: {
        'my-component': () => import('')
    }
})

//vue3.x
import {createApp, defineAsyncComponent} from 'vue'
createApp({
    components: {
        AsyncComponent: defineAsyncComponent(() => import(''))
    }
})
```

- 移除filter

```javascript
{{ message | capitalize}}

<div v-bind:id="rawId | formatId"></div>
```

- teleport

```javascript
<teleport to="body">
    <div></div>
</teleport>
```

- suspense

```javascript
<Suspense>
    <template>
        <xxx></xxx> <!--异步组件-->
    </template>
    <template #fallback>
        loading...
    </template>
</Suspense>
```

- composition API

科普视频：[Vue & Vite：现状与未来 - 尤雨溪](https://www.bilibili.com/video/BV1cC4y1y7Cp/?spm_id_from=333.999.0.0&vd_source=4f1390e05f2090819d9207c0805bd038)

## Vue3怎么实现响应式

**Vue2.x使用Object.defineProperty实现响应式**，其缺点：
- 深度监听需要一次性递归
- 无法监听新增或删除属性Vue.set、Vue.delete
- 无法原生监听数组，需要特殊处理

而**Vue3使用Proxy实现响应式**。Proxy的基本使用如下(js红宝书第四版上有关于proxy的介绍)：

```javascript
const data ={
    name: 'yinlei',
    age: 25
}

const proxyData = new Proxy(data, {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver)
        return result
    }
    set(target, key, val, receiver) {
        const result = Reflect.set(target, key, val, receiver)
        return result
    }
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key)
        return result
    }
})
```

可以看到Reflect也很重要，这些都在js红宝书上有介绍。Reflect和Proxy能力一一对应，规范化、标准化、函数式。

在Vue3中实现响应式类似这样(大概是这样，可以查看本文后续的读Vue3源码)：

```javascript
function reactive(target={}) {
    if(typeof target !== 'object' || target == null) return target
    const proxyConf = {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver)
            return reactive(result)
        }
        set(target, key, val, receiver) {
            const ownKeys = Reflect.ownKeys(target)
            if(ownKets.includes(key)) {
                console.log('已存在key')
            } else {
                console.log('新增key')
            }
            const result = Reflect.set(target, key, val, receiver)
            return result
        }
        deleteProperty(target, key) {
            const result = Reflect.deleteProperty(target, key)
            return result
        }
    }

    const observed = new Proxy(target, proxyConf)
    return observed
}

const data = {
    name: 'yinlei',
    age: 25，
    info: {
        city: 'mianyang'
    }
}

const proxyData = reactive(data)
```

通过Proxy实现响应式，深度监听，性能更好，还可以监听新增/删除属性，监听数组的变化。还能看到Proxy规避了Object.defineProperty的问题，但无法兼容所有浏览器，无法polyfill。

## Vue3的双向绑定

v-model 可以在组件上使用以实现双向绑定。从 Vue 3.4 开始，推荐的实现方式是使用 defineModel() 宏：

```javascript
// Child.vue
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>

// parent.vue
<Child v-model="count" />
```

defineModel() 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：
- 它的 .value 和父组件的 v-model 的值同步；
- 当它被子组件变更了，会触发父组件绑定的值一起更新。

这意味着你也可以用 v-model 把这个 ref 绑定到一个原生 input 元素上，在提供相同的 v-model 用法的同时轻松包装原生 input 元素：

```javascript
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

defineModel的底层机制：编译器将其展开为以下内容，
- 一个名为 modelValue 的 prop，本地 ref 的值与其同步；
- 一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。

## Vue3中的watchEffect是什么东西

- 两者都可监听data属性变化
- watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

## Vue3 setup怎么获取组件实例

在setup和其他composition api中没有this,可通过getCurrentInstance获取当前实例。若options api可照常使用this。

## Vite新秀为什么这么快

Vite是一个前端打包工具，Vue作者发起的项目，和webpak竞争。其在开发环境下无需打包、启动快。
- 开发环境使用ES Module，无需打包
- 生产环境是使用rollup

# 读Vue源码

## 框架设计理念

## 框架设计调试

## 响应系统

### 核心设计原则

### reactivity模块

### ref的响应性

### wacth、computed

## runtime运行时

### 核心设计原则

### h函数、Vnode

### renderer渲染器

### 组件的设计原理、渲染方案

### diff算法

## compiler编译器

### 核心设计原则

### compile编译器

### 深入编辑器处理逻辑

## 运行时+编译时的合并构建

# React面试题

> 官网文档：https://react.dev/

# 读React源码





