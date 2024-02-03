---
title: Linux的方方面面
description: 致敬经典《Unix环境高级编程》，致敬Richard Stevens
date: '2023-12-27 21:08:55'
tag: 计算机
---

## Contents

> 不要学shell编程和linux系统管理  
> shell编程能做到的事情，其他编程语言也能做到（比如python）   
> shell编程是一门编程语言，学了不用就会忘，考虑学习成本  
> linux系统高级管理包含系统备份、灾难恢复、磁盘分区、内核日志等，应用场景不多，还是要考虑学习成本，且云技术会导致传统的linux高级管理技术举步维艰

# 程序员的Linux

> 程序员应该重点掌握怎么使用linux,而不是替代系统管理员、运维人员  
> 建议看《**Linux命令行大全 第二版**》william shotts

![Linux命令行大全 第二版](/images//linux/linux.jpg)

## Linux安装与配置

### 准备服务器

- 本地虚拟机
  - windows：VMWare/VirtualBOX
- 云服务器

### 安装CentOS/Ubuntu操作系统

> 建议选择无图形用户界面的安装包

- [CentOS](https://www.centos.org/download/)
- [Ubuntu](https://cn.ubuntu.com/download/)

### 配置操作系统

> 以centos7为例

#### 配置网卡

```
echo ONBOOT=yes >> /etc/sysconfig/network-scripts/ifcfg-ens33
```

查看ip地址，在结果中查看到1270.0.1和ens33部分的inet xxx.xxx.xxx.xxx/xx即可。

# 《Unix环境高级编程》

![Unix环境高级编程](/images//linux/unix.jpg)


