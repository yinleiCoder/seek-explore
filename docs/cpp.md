---
title: C++与逆向工程(FPS游戏)
description: 程序员都应该学习C++，深挖内存的本质
date: '2024-01-13 10:34:30'
tag: 计算机
---

## Contents

> 学C++在某种程度上和宗教信仰比肩，要有那种**踏实（务实，不要浮在知识的表面）**地对知识执着地渴求，一方面要去**思考**，另一方面要**多动手**。尤其是作为软件工程师，要求的动手能力非常强；学C++的过程就是看透事物本质的过程，一定要知道这在内存中到底是怎么回事。

# C++

## 书籍推荐

> 按照内容深入浅出的顺序编排(建议**看英文、名家写的书**)


### 入门
- **《C++ Primer》Stanley B.Lippman**
- **《现代 C++ 语言核心特性解析》**

### 掌握/深度实践

- 《C++高质量编程》林锐
- **《Effective C++》侯捷**
- 《More Effective C++》侯捷
- **《Effective STL》潘爱民**
- 《The C++ Programming Language》Bjarne Stroustrup

### 熟悉/深入

- **《STL源码剖析》侯捷**
- 《COM本质论》Don Box
- 《Exceptional C++》Addsion.Wesley
- 《Inside the C++ Object Model》Stanley B.Lippman/**《深度探索C++对象模型》侯捷**
- 《The Design and Evolution of C++》Bjarne Stroustrup
- **《Unix环境高级编程》**
- 《Unix编程艺术》

## 逃不开的C++现实

笔者拙见：真想做技术，可以考虑2方面发展：
- **最新的技术**（能得到最好的收益，市场快速名誉、经济变现。但最大的问题是你会很累很累，脑子要时时刻刻保持不断更新的状态，不然面对同样的新技术，你怎么和年轻人比？）
- **做别人做不了的东西**（操作系统、搜索引擎等有技术壁垒的软件，别人很难抄袭、模仿的核心技术）

若以上两方面，你一个都做不到的话，比较残酷的现实：**在技术的路线上不要走太远，考研、考公都是不错的选择，不要只盯着技术**，除非你能把控住以上两方面中的其中一个。

## 现代C++体系结构

- C语言基础
- Object Oriented C++
- Template C++
- STL

## 编程语言的排行榜之争

笔者拙见：这种排行榜不太有参考意义，去了解一下它的排行数据来源。

面对2023年因为前端火出圈的Rust新秀，号称是“写出自信”。又比如因为SpringBoot占据中国后端软件的半壁江山的Java等等。以Java开发为例，工资是比前端高很多，很多公司的CTO也是Java出身。但是长远来看，用人单位招人的时候，如果你每天做的都是CRUD，那说实话，哪怕一个新人学个1~2年，你所拥有的知识已经足够了，**如果几年内公司不给你涨工资，那么很大程度反映了一个事实：你在公司的价值是可以因为公司的成本、效益原因被取代**。

# 逆向工程

> FPS游戏逆向，编写外挂，如Steam上的CSGO2

## 熟悉的工作环境和相关工具

### Visual Studio 2022

> https://visualstudio.microsoft.com/zh-hans/downloads/

Visual Studio简称VS是微软公司开发的工具包产品，是目前最流行的Windows平台应用程序集成开发环境IDE。

### GCC

GCC（GNU Compiler Collection, GNU编译套件）是由GNU开发的支持C/C++的编译器，是一个跨平台的编译器。在软件逆向工程中，经常会遇见使用GCC编译的应用程序。在Windows上安装GCC可以选择安装Cygwin或MinGW-w64。

#### MinGW-w64

> https://www.mingw-w64.org/  
> https://sourceforge.net/projects/mingw-w64/files/mingw-w64/mingw-w64-release/

在安装的时候，需要选择编译器的最新版本，Architecture CPU选择x86-64，Threads线程API选择win32、Exception异常处理库选择sjlj库。

同时，还需要配置环境变量。将MinGW-w64的bin目录添加到Path变量中，

通过如下命令验证gcc是否安装成功：

```
gcc -v
```

### Clang编译器

> https://releases.llvm.org/download.html

将Clang安装路径的bin目录添加到环境变量Path中，为了防止与Visual Studio中的Clang编译器冲突，可调整环境变量顺序。通过如下命令检查是否安装成功：

```
clang -v
```

### 调试工具OllyDbg

> https://www.ollydbg.de/

在逆向分析领域，分析者利用调试工具来分析软件的行为并验证分析的结果。操作系统提供了完善的调试接口，通过各类调试工具可以方便观察和控制目标软件。在使用调试工具分析程序的过程中，程序会按调试者的意愿，以指令为单位执行。调试者可以随时中断目标的指令流程，以观察相关计算结果和当前设备状况，也可以随时执行程序的后续指令。使用调试工具加载程序并一边运行一边分析的过程，称为**动态分析**。

- 有源码的程序，使用Visual Studio调试，将C++源码反编译
- 无源码的程序，使用OllyDbg调试分析

### 调试工具x64dbg

> https://x64dbg.com/

OllyDbg不支持64位应用程序的调试，x64dbg是一个开源的调试器，支持32/64位程序的调试。

### 调试工具WinDbg

> https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/debuggercmds/windbg-overview  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/getting-started-with-windows-debugging

WinDbg是微软出品的支持32/64位程序调试的免费调试器，支持源码的、无源码的程序调试，可以调试应用程序且可进行内核调试。还可以从微软的符号服务器中获取系统符号文件，使应用程序或内核调试的反汇编代码可读性更好。

### 反汇编静态分析工具IDA

动态分析的过程中，调试器加载程序，并以调试模式运行起来，分析者可以在执行过程中观察程序的执行流程和计算结果。但在实际的分析中，很多场合不方便运行目标，这时候需要直接把程序的二进制代码翻译成汇编语言，方便程序员阅读。由目标软件的二进制代码到汇编代码的翻译过程，称为**反汇编**。

反汇编静态分析工具IDA，它的图标是被称为“世界上第一位程序员”的Ada Lovelace的头像。


## 参考资料

- [Guided Hacking](https://www.youtube.com/@GuidedHacking/videos)
- [Github Osiris](https://github.com/danielkrupinski/Osiris)

# CS2外挂编写

- [基址Offset](https://github.com/frk1/hazedumper) 
- [基址Offset社区](https://www.unknowncheats.me/forum/counterstrike-global-offensive/169351-haze-dumper-json-config-based-offset-dumper.html) 

笔者编写的CS2游戏外挂已开源，采用ImGui+Directx11绘制，代码已托管在[Github](https://github.com/yinleiCoder/cs2-cheat-cpp)上，欢迎Star!