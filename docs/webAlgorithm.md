---
title: 前端中的算法与数据结构应用
description: 算法题变相考察js水平、数据结构的设计能力、数学题目的逻辑思维能力
date: '2023-12-29 16:02:01'
tag: 计算机
---

## Contents

> 必须对复杂度敏感：重时间、轻空间  
> 注意写单元测试、性能测试，考虑参数非法情况，提升代码的鲁棒性  
> 识破内置API的时间复杂度，不要过度优化  
> 数据结构的选择，要比算法优化重要的多

## 数组旋转k步

```typescript
/**
 * Target: 将一个数组旋转K步
 * Input: [1,2,3,4,5,6,7]
 * Output: [5,6,7,1,2,3,4] (k=3)
 * 
 * Think:
 *  1. 把末尾的元素挨个pop，然后unshift到数组前面
 *  2. 把数组拆分，通过concat拼接
 */
function rotateV1(arr: number[], k: number): number[] {
    const length = arr.length
    if (!k || length === 0) return arr
    const step = Math.abs(k % length)
    for (let i = 0; i < step; i++) {
        const n = arr.pop()
        if (n) {
            arr.unshift(n)
        }
    }
    return arr
}

let arr = [1, 2, 3, 4, 5, 6, 7]
const arr1 = rotateV1(arr, 3)
console.log(arr1)

function rotateV2(arr: number[], k: number): number[] {
    const length = arr.length
    if (!k || length === 0) return arr
    const step = Math.abs(k % length)
    const part1 = arr.slice(-step)
    const part2 = arr.slice(0, length - step)
    const result = part1.concat(part2)
    return result
}

arr = [1, 2, 3, 4, 5, 6, 7]
const arr2 = rotateV2(arr, 3)
console.log(arr2)
```

## 字符串括号是否匹配

```typescript
/**
 * Target: 判断字符串是否括号匹配
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. 字符串s可能包含{}()[]
 *  2. 判断s是否是括号匹配
 *  3. 栈
 *  4. 遇到左括号就压栈
 *  5. 遇到右括号就判断栈顶，匹配就出栈
 *  6. 最后判断length是否为0
 */
function isMatch(left: string, right: string) {
    if (left === '{' && right === '}') return true
    if (left === '[' && right === ']') return true
    if (left === '(' && right === ')') return true
    return false
}

function matchBracket(str: string): boolean {
    const length = str.length
    if (length === 0) return true
    const stack = []
    const leftSymbols = '{[('
    const rightSymbols = '}])'
    for (let i = 0; i < length; i++) {
        const s = str[i]
        if (leftSymbols.includes(s)) {
            // 左括号压栈
            stack.push(s)
        } else if (rightSymbols.includes(s)) {
            // 右括号判断匹配并出栈
            const top = stack[stack.length - 1]
            if (isMatch(top, s)) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.length === 0
}

const str = '{a(b[c]d)e}f'
console.log(matchBracket(str))
```

## 两个栈实现一个队列

```typescript
/**
 * Target: 两个栈实现一个队列(数组实现)
 * Input: add delete length
 * Output: 
 * 
 * Think:
 *
 */
class MyQueue {
    private stack1: number[] = []
    private stack2: number[] = []

    /**
     * 入队
     * @param n 
     */
    add(n: number) {
        this.stack1.push(n)
    }

    /**
     * 出队
     */
    delete(): number | null {
        let res
        const stack1 = this.stack1
        const stack2 = this.stack2
        // 1.将stack1所有元素移动到stack2中
        while (stack1.length) {
            const n = stack1.pop()
            if (n) {
                stack2.push(n)
            }
        }
        // 2. 将stack2栈顶出栈表示出队
        res = stack2.pop()
        // 3. 将stack2中的元素还给stack1
        while (stack2.length) {
            const n = stack2.pop()
            if (n) {
                stack1.push(n)
            }
        }
        return res || null 
    }

    get length(): number {
        return this.stack1.length
    }
}

const q = new MyQueue()
q.add(25)
q.add(24)
q.add(8)
console.log(q.length)
console.log(q.delete())
console.log(q.length)
```

## 反转单向链表

```typescript
/**
 * Target: 反转单向链表
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. 反转，即把节点next指向前一个节点
 *  2. 但很容易造成nextNode丢失
 *  3. 需要三个指针prevNode curNode nextNode
 */
interface ILinkListNode {
    value: number
    next?: ILinkListNode
}
// 根据数组创建链表
function createLinkList(arr: number[]): ILinkListNode {
    const length = arr.length
    if (length === 0) throw new Error('arr is empty')
    let curNode: ILinkListNode = {
        value: arr[length - 1]
    }
    if (length === 1) return curNode
    for (let i = length - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        }
    }
    return curNode
}

// 反转单向链表
function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
    let prevNode: ILinkListNode | undefined = undefined
    let curNode: ILinkListNode | undefined = undefined
    let nextNode: ILinkListNode | undefined = listNode

    while(nextNode) {
        // 删掉第一个元素，因为它会变成链表尾的元素，链表尾部没有next域
        if(curNode && !prevNode) {
            delete curNode.next
        }
        // 反转指针
        if(curNode && prevNode) {
            curNode.next = prevNode
        }
        // 同步向后移动
        prevNode = curNode
        curNode = nextNode
        nextNode = nextNode?.next
    }
    curNode!.next = prevNode
    return curNode!
}

const arr = [100, 200, 300, 400, 500]
const linkList = createLinkList(arr)
console.log(linkList)
const reversedLinkList = reverseLinkList(linkList)
console.log(reversedLinkList)
```

## 二分查找

```typescript
/**
 * Target: 二分查找
 * Input: 
 * Output: 
 * 
 * Think:
 *  1.递归：代码逻辑清晰
 *  2.非递归：性能更好
 */
function binarySearchV1(arr: number[], target: number): number {
    const length = arr.length
    if (length === 0) return -1

    let startIndex = 0
    let endIndex = length - 1
    while (startIndex <= endIndex) {
        const midIndex = Math.floor((startIndex + endIndex) / 2)
        const midValue = arr[midIndex]
        if (target < midValue) {
            endIndex = midIndex - 1
        } else if (target > midValue) {
            startIndex = midIndex + 1
        } else {
            return midIndex
        }
    }
    return -1
}

const arr = [10, 20, 30, 40, 50]
const target = 30
console.log(binarySearchV1(arr, target))

function binarySearchV2(arr: number[], target: number, startIndex?: number, endIndex?
    : number): number {
    const length = arr.length
    if (length === 0) return -1
    if (startIndex == null) startIndex = 0
    if (endIndex == null) endIndex = length - 1

    if (startIndex > endIndex) return -1

    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]
    if (target < midValue) {
        return binarySearchV2(arr, target, startIndex, midIndex - 1)
    } else if (target > midValue) {
        return binarySearchV2(arr, target, midIndex + 1, endIndex)
    } else {
        return midIndex
    }
    return -1
}

const arr1 = [10, 20, 30, 40, 50]
const target1 = 30
console.log(binarySearchV1(arr1, target1))
```

## 递增的数组中找出和为n的两个元素

```typescript
/**
 * Target: 从递增的数组中找出和为n的两个元素
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. 嵌套循环：找到一个数，然后遍历下一个数，求和，判断
 *  2. 利用递增特性，随随便找2个数，如果和大于n，则需要向前查找，
 *      如果和小于N，则需要向后查找，双指针降低时间复杂度
 */
function findTwoNumbersV1(arr: number[], n: number): number[] {
    const res: number[] = []
    const length = arr.length
    if (length === 0) return res
    for (let i = 0; i < length - 1; i++) {
        const n1 = arr[i]
        let flag = false
        for (let j = i + 1; j < length; j++) {
            const n2 = arr[j]
            if (n1 + n2 === n) {
                res.push(n1)
                res.push(n2)
                flag = true
                break
            }
        }
        if (flag) break
    }
    return res
}

const arr = [1, 2, 4, 7, 11, 15]
console.log(findTwoNumbersV1(arr, 15))

function findTwoNumbersV2(arr: number[], n: number): number[] {
    const res: number[] = []
    const length = arr.length
    if (length === 0) return res

    let i = 0
    let j = length - 1
    while (i < j) {
        const n1 = arr[i]
        const n2 = arr[j]
        const sum = n1 + n2
        if(sum > n) {
            j--
        }else if(sum < n) {
            i++
        } else {
            res.push(n1)
            res.push(n2)
            break
        }
    }
    return res
}
const arr1 = [1, 2, 4, 7, 11, 15]
console.log(findTwoNumbersV2(arr1, 15))
```

## 二叉树的第K小值

```typescript
/**
 * Target: 求一个二叉搜索树的第K小值
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. BST: left.value <= root.value right.value >= root.value
 *  2. BST中序遍历，从小到大排序，第K个就是答案
 */
interface ITreeNode {
    value: number
    left: ITreeNode | null
    right: ITreeNode | null
}
const arr: number[] = []

function inOrderTraverse(node: ITreeNode|null) {
    if(node ==null) return 
    inOrderTraverse(node.left)
    arr.push(node.value)
    inOrderTraverse(node.right)
}

const bst: ITreeNode = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 2,
            left: null,
            right: null
        },
        right: {
            value: 4,
            left: null,
            right: null,
        }
    },
    right: {
        value: 7,
        left: {
            value: 6,
            left: null,
            right: null,
        },
        right: {
            value: 8,
            left: null,
            right: null,
        }
    }
}

function getKthValue(node: ITreeNode, k: number): number | null {
    inOrderTraverse(node)
    return arr[k-1] || null
}

console.log(getKthValue(bst, 3))
```

## 斐波那契数列

```typescript
/**
 * Target: 计算斐波那契数列的第N个值
 * Input: 
 * Output: 
 * 
 * Think:
 *  1.递归有大量的重复计算
 *  2.用循环，记录中间结果.即动态规划：把一个大问题拆解为多个小问题，然后用递归思路去分析问题，再改为循环方式实现
 */
// function fibonacci(n: number): number {
//     if (n <= 0) return 0
//     if (n === 1) return 1
//     return fibonacci(n - 1) + fibonacci(n - 2)
// }
// console.log(fibonacci(9))
function fibonacci(n: number): number {
    if (n <= 0) return 0
    if (n === 1) return 1
    let n1 = 1 // n-1的结果
    let n2 = 0 // n-2的结果
    let res = 0
    for (let i = 2; i <= n; i++) {
        res = n1 + n2
        //记录中间结果
        n2 = n1
        n1 = res
    }
    return res
}
console.log(fibonacci(9))
```

## 数组中的0移动到末尾

```typescript
/**
 * Target: 将数组中的0移动到末尾
 * Input: [1,0,3,0,11,0]
 * Output: [1,3,11,0,0,0]
 * 
 * Think:
 *  1. 只移动0，其他顺序不变
 *  2. 数组原地操作
 *  3. 法1：【不可用】遍历数组，遇到0就push,用splice截取掉当前元素O(n^2)
 *  4. 法2： 双指针。定义j指向第一个0，i指向j后面第一个非0，交换ij的值，继续向后移动
 */
function moveZero(arr: number[]): void {
    const length = arr.length
    if (length === 0) return

    let i
    let j = -1 // 指向第一个0
    for (i = 0; i < length; i++) {
        if(arr[i] === 0) {
            // 第一个0
            if(j < 0) {
                j = i // j指向了第一个0
            }
        }
        if(arr[i] !==0 && j >= 0) {
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
            j++
        }
    }
}

const arr = [1,0,3,0,11,0]
moveZero(arr)
console.log(arr)
```

## 字符串中连续最多的字符及次数

```typescript
/**
 * Target: 求字符串中连续最多的字符及次数
 * Input: abbcccddeeee1234
 * Output: 'e' 4次
 * 
 * Think:
 * 1.法1： 嵌套循环，找出每个字符的连接次数并记录(传统)，有跳步O(n)
 * 2.法2： 双指针。定义指针ij,j不动，i继续移动，如果i和j值一直相等， 则i继续移动。直到i和j的值不相等，记录处理，让j追上i。继续第一步。
 */

interface IResult {
    char: string
    length: number
}

function findContinuousCharV1(str: string): IResult {
    const res: IResult = {
        char: '',
        length: 0
    }
    const length = str.length
    if (length === 0) return res

    let tempLength = 0// 临时记录当前字符的连续长度
    for (let i = 0; i < length; i++) {
        tempLength = 0
        for (let j = i; j < length; j++) {
            if (str[i] === str[j]) {
                tempLength++
            }
            if (str[i] !== str[j] || j === length - 1) {
                // 不相等或已经到了最后一个元素，要判断最大值
                if (tempLength > res.length) {
                    res.char = str[i]
                    res.length = tempLength
                }
                if (i < length - 1) {
                    i = j - 1 //跳步
                }
                break
            }
        }
    }
    return res
}

const str = 'abbcccddeeee1234'
console.log(findContinuousCharV1(str))

function findContinuousCharV2(str: string): IResult {
    const res: IResult = {
        char: '',
        length: 0
    }
    const length = str.length
    if (length === 0) return res

    let tempLength = 0// 临时记录当前字符的连续长度
    let i = 0
    let j = 0
    for (; i < length; i++) {
        if (str[i] === str[j]) {
            tempLength++
        }
        if (str[i] !== str[j] || i === length - 1) {
            if (tempLength > res.length) {
                res.char = str[j]
                res.length = tempLength
            }
            tempLength = 0
            if (i < length - 1) {
                j = i // j追上i开始下一轮
                i--
            }
        }
    }

    return res
}
const str1 = 'abbcccddeeee1234'
console.log(findContinuousCharV1(str1))
```

## 快速排序

```typescript
/**
 * Target: 快速排序
 * Input: 
 * Output:
 * 
 * Think:
 * 1. 找到中间位置midValue
 * 2. 遍历数组，小于midValue放在left, 否则right
 * 3. 继续递归，最后concat拼接，返回
 */
function quickSort(arr: number[]): number[] {
    const length = arr.length
    if (length === 0) return arr
    const midIndex = Math.floor(length / 2)
    const midValue = arr.slice(midIndex, midIndex + 1)[0]
    const left: number[] = []
    const right: number[] = []
    for (let i = 0; i < length; i++) {
        if (i !== midIndex) {
            const n = arr[i]
            if (n < midValue) {
                left.push(n);
            } else {
                right.push(n)
            }
        }
    }
    return quickSort(left).concat([midValue], quickSort(right))
}

const arr = [1,4,2,5,90,22]
console.log(quickSort(arr))
```

## 所有的回文对称数

```typescript
/**
 * Target: 求所有的回文对称数
 * Input: 0，1，2，11，22，101，232，。。。
 * Output:
 * 
 * Think:
 * 1. 法1：把数字转换为字符串，再转换为数组，数组reverse,再join为字符串，前后字符串比较
 * 2. 法2：数字转为字符串，字符串头尾比较
 * 3. 法3： 生成翻转数。
 *          使用%和Math.floor生成翻转数，前后数字进行对比
 */
function findPalindromeNumbers(max: number): number[] {
    const res: number[] = []
    if (max <= 0) return res

    for (let i = 1; i <= max; i++) {
        const s = i.toString()
        const length = s.length

        // 字符串头尾比较
        let flag = true
        let startIndex = 0
        let endIndex = length - 1
        while (startIndex < endIndex) {
            if (s[startIndex] !== s[endIndex]) {
                flag = false
                break
            } else {
                startIndex++
                endIndex--
            }
        }
        if (flag) {
            res.push(i)
        }
    }
    return res
}

console.log(findPalindromeNumbers(200))

function findPalindromeNumbersV2(max: number): number[] {
    const res: number[] = []
    if (max <= 0) return res

    for (let i = 1; i <= max; i++) {
        let n = i
        let reverse = 0 // 存储翻转数
        // 生成翻转数
        while (n > 0) {
            reverse = reverse * 10 + n % 10
            n = Math.floor(n / 10)
        }
        if (i === reverse) res.push(i)
    }
    return res
}

console.log(findPalindromeNumbersV2(200))
```

## 数组扁平化

```typescript
/**
 * Target: 写一个JS函数，实现数组扁平化，只减少一级嵌套
 * Input: [1,[2,[3]],4]
 * Output: [1,2,[3],4]
 * 
 * Think:
 *  1.定义空数组arr,遍历当前数组
 *  2. 如果item非数组，则累加到arr
 *  3. 如果item是数组，则遍历之后累加到arr 
 * concat 也可以实现，concat可以展开一级嵌套
 */
function arrayFlatten(arr: any[]): any[] {
    const res: any[] = []

    arr.forEach(item => {
        if(Array.isArray(item)) {
            item.forEach(n => res.push(n))
        } else {
            res.push(item)
        }
    })

    return res 
}

const arr = [1,[2,[3]],4]
console.log(arrayFlatten(arr))

/**
 * Target: 写一个JS函数，实现数组扁平化，减少所有嵌套
 * Input: [1,[2,[3]],4]
 * Output: [1,2,3,4] 
 * 
 * Think:
 *  1. 先实现一级扁平化，然后递归调用，直到全部扁平
 */
function arrayFlattenDeep(arr: any[]): any[] {
    const res: any[] = []

    arr.forEach(item => {
        if(Array.isArray(item)) {
            const flattedItem = arrayFlattenDeep(item)
            flattedItem.forEach(n => res.push(n))
        } else {
            res.push(item)
        }
    })

    return res 
}

const arrDeep = [1,[2,[3, [22]]],4]
console.log(arrayFlattenDeep(arrDeep))
```

## 获取任何JS的详细数据类型

```typescript
/**
 * Target: 获取JS数据类型，手写一个函数，传入任意变量，可准确获取详细类型
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. typeof只能判断值类型，其他就是function和object
 *  2. instanceof需要两个参数来判断，而不是获取类型，且需要枚举，但是枚举有弊端不满足高质量代码的规范性、完整性、鲁棒性
 *  3. 可以考虑这个API： Object.prototype.toString.call(x)
 */
function getType(x: any): string {
    const originType = Object.prototype.toString.call(x)// '[object xxx]'
    const spaceIndex = originType.indexOf(' ')
    const type = originType.slice(spaceIndex + 1, -1)// 'xxx'
    return type.toLowerCase()
}

console.log(getType(null))
console.log(getType(undefined))
console.log(getType(25))
console.log(getType('yinlei'))
console.log(getType(false))
console.log(getType(Symbol()))
console.log(getType({}))
console.log(getType([]))
console.log(getType(() => {}))
```

## 实现new一个对象的过程

```typescript
/**
 * Target: 手写js中new一个对象的过程
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. ES5定义类的方式去解答问题
 *  2. 创建一个空对象obj,继承构造函数的原型
 *  3. 执行构造函数，将obj作为this
 *  4. 返回obj
 */
class Girl {
    name: string

    constructor(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }
}

function customNew<T>(constructor: Function, ...args: any[]): T {
    const obj = Object.create(constructor.prototype)
    constructor.apply(obj, args)
    return obj 
}

const g = customNew<Girl>(Girl, 'chen shuang')
console.log(g.getName())
const gNormal = new Girl('chen shuang')
console.log(gNormal.getName())
```

## 遍历DOM树

```typescript
/**
 * Target: 遍历DOM树
 * Input: 
 * Output: 
 * 
 * Think: 递归可以用栈
    1. 深度优先遍历
    2. 广度优先遍历
 */
function visitNode(n: Node) {
    if (n instanceof Comment) {
        console.log(`Comment Node: ${n.textContent}`)
    }
    if (n instanceof Text) {
        const text = n.textContent
        if (text) {
            console.log(`Text Node: ${text?.trim()}`)
        }
    }
    if (n instanceof HTMLElement) {
        console.log(`Element Node: <${n.tagName.toLowerCase()}>`)
    }
}

function depthFirstTraverse(root: Node) {
    visitNode(root)
    const childNodes = root.childNodes
    if (childNodes.length) {
        childNodes.forEach(child => {
            depthFirstTraverse(child)
        })
    }
}

function breadthFirstTraverse(root: Node) {
    const queue: Node[] = []
    // 入队
    queue.unshift(root)
    while (queue.length > 0) {
        const curNode = queue.pop()
        if (curNode == null) break
        visitNode(curNode)
        // 子节点入队
        const childNodes = curNode.childNodes
        if (childNodes.length) {
            childNodes.forEach(child => queue.unshift(child))
        }
    }
}

const box = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <h1>Hello World!</h1>
        <p>Ha ha</p>
    </main>
</body>
</html>
`
if (box == null) throw new Error('box is null')
const boxNode = new DOMParser().parseFromString(box, 'text/html').documentElement
depthFirstTraverse(boxNode)
breadthFirstTraverse(boxNode)
```

## 手写LazyMan

```typescript
/**
 * Target: 手写LazyMan, 支持sleep()和eat(),支持链式调用
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. 因为sleep，函数不能直接在调用触发
 *  2. 初始化一个列表，把函数注册进去
 *  3. 由每个item触发next执行，遇到sleep则异步触发
 */
class LazyMan {
    private name: string
    private tasks: Function[] = []
    constructor(name: string) {
        this.name = name
        setTimeout(() => {
            this.next()
        });
    }

    private next() {
        const task = this.tasks.shift()
        if (task) task()
    }

    eat(food: string) {
        const task = () => {
            console.log(`${this.name} eat ${food}`)
            this.next()
        }
        this.tasks.push(task)
        return this
    }

    sleep(seconds: number) {
        const task = () => {
            console.log('start sleep!')
            setTimeout(() => {
                console.log(`${this.name} sleep ${seconds} second`)
                this.next()
            }, seconds * 1000);
        }
        this.tasks.push(task)
        return this
    }
}

const me = new LazyMan('YINLEI')
me.eat('egg').eat('hotpot').sleep(2).eat('meat') 
```

## 手写函数柯里化

```typescript
/**
 * Target: 手写一个函数，把其他函数柯里化
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. curry返回的是一个函数
 *  2. 执行返回的函数fn，中间状态返回函数
 *  3. 最后返回执行结果
 */
function curry(fn: Function) {
    const fnArgsLength = fn.length
    let args: any[] = []

    function calc(...newArgs: any[]) {
        // 积累参数
        args = [
            ...args,
            ...newArgs
        ]
        if(args.length < fnArgsLength) {
            // 参数不够，返回中间状态
            return calc
        } else {
            // 参数够了，返回执行结果
            return fn.apply(this, args.slice(0, fnArgsLength))
        }
    }
    return calc
}

function add(a: number, b: number, c: number) {
    return a + b + c
}

const curryAdd = curry(add)
console.log(curryAdd(10)(20)(30))
```

## 手写instanceof原理

```typescript
/**
 * Target: 手写一个函数，实现instanceof原理
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. f instanceof Foo,顺着f._proto_向上查找原型链
 *  2. 看能否找到Foo.prototype 
 */
function customInstanceof(instance: any, origin: any): boolean {
    if(instance == null) return false
    const type = typeof instance 
    if(type !== 'object' && type !== 'function') return false // 值类型
    let tempInstance = instance
    while(tempInstance) {
        if(tempInstance.__proto__ === origin.prototype) {
            return true 
        } 
        tempInstance = tempInstance.__proto__
    }
    return false 
}

console.log(customInstanceof({}, Object))
console.log(customInstanceof([], Object))
console.log(customInstanceof([], Array))
console.log(customInstanceof({}, Array))
console.log(customInstanceof('yinlei', String))
```

## 手写bind函数原理

```typescript
/**
 * Target: 手写一个函数，实现bind原理
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. bind函数返回一个新的函数但是不执行
 *  2. 绑定this和部分参数
 *  3. 如果是箭头函数，无法改变this,只能改变参数
 */
// @ts-ignore
Function.prototype.customBind = function (context: any, ...bindArgs: any[]) {
    const self = this // 当前函数本身
    return function (...args: any[]) {
        const newArgs = bindArgs.concat(args)
        return self.apply(context, newArgs)
    }
}

function fn(a: any, b: any) {
    console.log(this, a, b)
}
// @ts-ignore
const fnBind = fn.customBind({x: 25}, 25, 8)
fnBind()
```

## 手写call、apply函数

```typescript
/**
 * Target: 手写一个函数，实现bind原理
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. bind函数返回一个新的函数但是不执行
 *  2. call、apply会立即执行函数
 *  3. 绑定this
 *  4. 传入参数
 *  5. call(this, a,b,c...)
 *     apply(this, [a,b,c...])
 * 
 * 如何在函数执行时绑定this:
 *  1. const obj = {x: 25, fn(){this.x}}
 *  2. 执行obj.fn()，此时fn内部的this就指向obj
 *  3. 可借此来实现函数绑定this
 */
// @ts-ignore
Function.prototype.customCall = function (context: any, ...args: any[]) {
    if (context == null) context = globalThis// window
    if (typeof context !== 'object') context = new Object(context) // 值类型变为对象
    const fnKey = Symbol()
    context[fnKey] = this
    const res = context[fnKey](...args)//绑定了this
    delete context[fnKey]
    return res
}

Function.prototype.customApply = function (context: any, args: any[] = []) {
    if (context == null) context = globalThis// window
    if (typeof context !== 'object') context = new Object(context) // 值类型变为对象
if （typeof context ！== 'object'） context = new Object（context） // 值类型变为对象
    const fnKey = Symbol()
    context[fnKey] = this
    const res = context[fnKey](...args)//绑定了this
    delete context[fnKey]
    return res
}

function fn(a: any, b: any) {
    console.log(this, a, b)
}
// @ts-ignore
fn.customCall({ x: 25 }, 25, 8)
```

## 手写EventBus

```typescript
/**
 * Target: 手写EventBus（事件总线）自定义事件
 * 实现api：on once, emit, off
 * Input: 
 * Output: 
 * 
 * Think:
 *  1.on和once注册函数，存储起来
 *  2.emit时找到对应的函数，执行
 *  3.off找到对应的函数，从对象中删除
 *  4.on绑定的事件可以连续执行，除非off
 *    once绑定的函数emit一次即删除，也可以未执行就被off
 * 
 * events和onceEvents也可以拆分出来
 */
class EventBus {
    // {key1: [{fn: fn1, isOnce: false}]}
    private events: {
        [key: string]: Array<{ fn: Function; isOnce: boolean }>
    }
    constructor() {
        this.events = {}
    }

    on(type: string, fn: Function, isOnce = false) {
        const events = this.events
        if (events[type] == null) {
            events[type] = []
        }
        events[type].push({ fn, isOnce })
    }

    once(type: string, fn: Function) {
        this.on(type, fn, true)
    }

    off(type: string, fn?: Function) {
        if (!fn) {
            // 解绑所有
            this.events[type] = []
        } else {
            // 解绑单个
            const fnList = this.events[type]
            if (fnList) {
                this.events[type] = fnList.filter(item => item.fn !== fn)
            }
        }
    }

    emit(type: string, ...args: any[]) {
        const fnList = this.events[type]
        if (fnList == null) return
        this.events[type] = fnList.filter(item => {
            const { fn, isOnce } = item
            fn(...args)
            if (!isOnce) return true
            return false
        })
    }
}

const e = new EventBus()

function fn1(a: any, b: any) {console.log('fn1', a, b)}
function fn2(a: any, b: any) {console.log('fn2', a, b)}
function fn3(a: any, b: any) {console.log('fn3', a, b)}

e.on('key1', fn1)
e.on('key1', fn2)
e.once('key1', fn3)

e.emit('key1', 25, 8)
e.emit('key1', 10, 10)
e.off('key1', fn1)
e.emit('key1', 10, 10)
```

## 手写LRU缓存

```typescript
/**
 * Target: 手写LRU缓存
 * Input: 
 * Output: 
 * 
 * Think:
 *  1. LRU: 最近使用
 *  2. 如果内存优先，只缓存最近使用的，删除沉水数据, 类似人的大脑记得住新的，复习旧的，温故而知新
 *  3. 数据结构可以用哈希表 O(1)，有序且可排序
 *  所以选用Map
 *  4. 如果不用(hash表+有序)Map,则可以自定义数据结构Object+Array:
 *  const data = [obj1, obj2....]
 *  const map = {'a': obj1, 'b': obj2...},但是Array性能慢，可以把数组改为双向链表
 */
class LRUCache {
    private length: number
    private data: Map<any, any> = new Map()
    constructor(length: number) {
        if (length < 1) throw new Error('invalid length')
        this.length = length
    }

    set(key: any, value: any) {
        const data = this.data
        if(data.has(key)) {
            data.delete(key) // map每次set时会把数据放在最新的位置
        }
        data.set(key, value)
        if(data.size > this.length) {
            const delKey = data.keys().next().value
            data.delete(delKey)
        } 
    }

    get(key: any): any {
        const data = this.data 
        if(!data.has(key)) return null 
        const value = data.get(key)
        data.delete(key)
        data.set(key, value)
        return value 
    }
}

const lruCache = new LRUCache(2)
lruCache.set(1, 1)// {1=1}
lruCache.set(2, 2)// {1=1, 2=2}
console.log(lruCache.get(1)) // {2=2, 1=1}
lruCache.set(3, 3) // {1=1, 3=3}
console.log(lruCache.get(2))// null
lruCache.set(4, 4) // {3=3, 4=4}
console.log(lruCache.get(1)) // null
console.log(lruCache.get(3)) // 3 {4=4,3=3}
console.log(lruCache.get(4)) // 4 {3=3, 4=4}
```

## 手写深拷贝函数

```typescript
/**
 * Target: 手写深拷贝函数，考虑Map Set和循环引用
 * Input: 
 * Output: 
 * 
 * Think:
 * 1. JSON.stringify和parse无法转换函数、map set和循环引用
 * 2.Object.assign不是深拷贝
 * 3.
 */

function simpleDeepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (let key in obj) {
        if (obj.hasOwnProperty) {
            result[key] = simpleDeepClone(obj[key])
        }
    }
    return result
}

function cloneDeep(obj: any, map = new WeakMap()): any {
    if (typeof obj !== 'object' || obj == null) return obj
    // 避免循环引用
    const objFromMap = map.get(obj)
    if (objFromMap) return objFromMap

    let target: any = {}
    map.set(obj, target)

    // Map 
    if (obj instanceof Map) {
        target = new Map()
        obj.forEach((v, k) => {
            const v1 = cloneDeep(v, map)
            const k1 = cloneDeep(k, map)
            target.set(k1, v1)
        })
    }
    // set
    if (obj instanceof Set) {
        target = new Set()
        obj.forEach(v => {
            const v1 = cloneDeep(v, map)
            target.add(v1)
        })
    }
    // array
    if (obj instanceof Array) {
        target = obj.map(item => cloneDeep(item, map))
    }
    //object
    for (const key in obj) {
        const val = obj[key]
        const val1 = cloneDeep(val, map)
        target[key] = val1
    }

    return target
}

const a: any = {
    set: new Set([25, 24, 8]),
    map: new Map([['x', 10]]),
    info: {
        city: 'mianyang',
    }
}
a.self = a
console.log(cloneDeep(a))
```

## 排序与搜索

### 冒泡排序

- 比较所有相邻的元素，如果第一个比第二个大，就交换他们
- 一轮下来可以保证最后一个数是最大的
- 执行n-1轮完成排序

```javascript

Array.prototype.bubbleSort = function() {
    for(let i = 0; i < this.length - 1; i++) {
        for(let j = 0; j < this.length - 1 - i; j ++) {
            console.log(this[j], this[j+1])
            if(this[j] > this[j+1]) {
                const temp = this[j]
                this[j] = this[j+1]
                this[j+1] = temp
            }
        }
    }
} 

const arr = [5, 4, 3, 2, 1]
arr.bubbleSort()
```

### 选择排序

- 找到数组中的最小值，选中它并将其放置在第一位
- 接着找到第二小值，选中它并将其放置在第二位
- 执行n-1轮

```javascript
Array.prototype.selectionSort = function() {
   for(let i = 0; i < this.length - 1; i++) {
        let indexMin = i
        for(let j = i; j < this.length; j++) {
                if(this[j] < this[indexMin]) {
                    indexMin = j
                }
        }
        if(indexMin !== i) {
            const temp = this[i]
            this[i] = this[indexMin]
            this[indexMin] = temp
        }
   }
} 

const arr = [5, 4, 3, 2, 1]
arr.selectionSort()
```

### 插入排序

- 从第二个数往前比
- 比它大就往后排
- 类推进行到最后一个数

```javascript
Array.prototype.insertionSort = function() {
   for(let i = 1; i < this.length; i++) {
        const temp = this[i]
        let j = i
        while(j > 0) {
            if(this[j-i] > temp) {
                this[j] = this[j-i]
            } else {
                break
            }
            j--
        }
        this[j] = temp
   }
} 

const arr = [5, 4, 3, 2, 1]
arr.insertionSort()
```

### 归并排序

- 分：把数组劈成两半，再递归对子数组进行分，直到分成各个单独的数
- 合：把两个数合并为有序数组，在对有序数组进行合并，直到全部子数组合并为一个完整数组

```javascript
Array.prototype.mergeSort = function() {
    const rec = (arr) => {
        if(arr.length === 1) return arr
        const mid = Math.floor(arr.length / 2)
        const left = arr.slice(0, mid)
        const right = arr.slice(mid, arr.length)
        const orderLeft = rec(left)
        const orderRight = rec(right)
        const res = []
        while(orderLeft.length || orderRight.length) {
            if(orderLeft.length && orderRight.length) {
                res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
            } else if(orderLeft.length) {
                res.push(orderLeft.shift())
            } else if(orderRight.length) {
                res.push(orderRight.shift())
            }
        }
        return res
    }
    const res = rec(this)
    res.forEach((n, i) => this[i] = n)
} 

const arr = [5, 4, 3, 2, 1]
arr.mergeSort()
```

### 快速排序

- 分区：从数组中任意选一个基准，所有比基准小的元素放在基准前面，比基准大的元素放在基准后面
- 递归：递归地对基准前后的子数组进行分区

```javascript
Array.prototype.qucikSort = function() {
    const rec = () => {
        if(arr.length === 1) return arr 
        const left = []
        const right = []
        const mid = arr[0]
        for(let i = 1; i < arr.length; i++){     
            if(arr[i] < mid) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return [...rec(left), mid, ...rec(right)]
    }
    const res = rec(this)
    res.forEach((n, i) => this[i] = n)
} 

const arr = [5, 4, 3, 2, 1]
arr.qucikSort()
```

### 顺序搜索

- 遍历数组
- 找到和目标相等的元素就返回它的下表
- 遍历结束，如果没有搜索到目标值就返回-1

```javascript
Array.prototype.sequentialSearch = function(target) {
    for(let i = 0; i < this.length; i++) {
        if(this[i] === target) {
            return i 
        }
    }
    return -1
} 

const arr = [5, 4, 3, 2, 1]
arr.sequentialSearch(3)
```

### 二分搜索

- 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束
- 如果目标值大于或者小于中间元素，则在大于或小于中间元素的那一半数组中搜索
- 数组前提是有序数组

```javascript
Array.prototype.binarySearch = function(target) {
    let low = 0
    let high = this.length - 1
    while(low <= high) {
        const mid = Math.floor((low+high) / 2)   
        const element = this[mid]
        if(element < target) {
            low = mid + 1
        } else if(element > target) {
            high = mid - 1
        } else {
            return mid 
        }
    }
    return -1
} 

const arr = [1, 2, 3, 4, 5]
arr.binarySearch(3)
```