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

查看ip地址，在结果中查看到1270.0.1和ens33部分的inet xxx.xxx.xxx.xxx/xx即可：

```
ip addr
```

## 云服务器

linux服务器有两种类型：

- 物理服务器：只安装了Linux操作系统的服务器
- 云服务器：虚拟化平台分配出来的一台虚拟机，在虚拟机上安装了Linux操作系统

云厂商：
- 阿里云
- 腾讯云
- 华为云
- 亚马逊AWS
- Google Cloud

云服务器的安全：

- 设置强密码
- 禁用root用户远程登录：/etc/ssh/sshd_config -> PermitRootLogin no
- 修改ssh端口: /etc/ssh/sshd_config -> Port 其他端口
- 开通云服务器的主机防火墙、云平台的安全组

## 远程登录服务器

本地虚拟机中的linux服务器和本机的windows逻辑上是两个操作系统。其中的Linux、Unix的特点是稳定、高效，界面不重要。在实际使用中，windows是客户端，linux是服务器端。

可以远程登录服务器的软件很多：
- MobaXterm(这个也不错)
- XShell
- SecureCRT(我工作中用的这个)

> 远程登录的前提是知道服务器的ip地址，然后用远程登录软件登录即可（云服务器用公网ip）

## 设置虚拟机的静态IP

企业的网络有统一的规划设计，服务器的网络参数由网络管理员分配。通常我们终端设备使用的是DHCP动态分配的IP，但是每次远程登录服务器前要先查看虚拟机的IP很麻烦，所以服务器的IP地址应该是静态的。

VMWare提供了：桥接模式、NAT模式、仅主机模式。

如果要修改虚拟机的静态IP：


```
cd /etc/sysconfig/network-scripts/
vi ifcfg-ens33
```

(1). 如果是NAT模式：

添加如下静态IP配置：

```
BOOTPROTO=static
IPADDR=服务器的IP(在vmware的虚拟网络编辑器中查看)
NETMASK=掩码(在vmware的虚拟网络编辑器中查看)
GATEWAY=网关(在vmware的虚拟网络编辑器中查看)

DNS1=8.8.8.8
DNS2=114.114.114.114
```

(2). 如果是桥接模式：

先在windows上ipconfig查看网络配置信息，然后再设置：

```
BOOTPROTO=static
IPADDR=服务器的IP(在windows ipconfig中查看)
NETMASK=掩码(在windows ipconfig中查看)
GATEWAY=网关(在windows ipconfig中查看)

DNS1=8.8.8.8
DNS2=114.114.114.114
```

## 主机名

```
hostnamectl set-hostname 主机名
```

## 网络故障诊断

### 网络连通性测试

```
ping 目标主机的IP地址
```

### 服务可用性测试

```
telnet 网络主机的IP地址 端口号
```

## 系统服务管理

Centos7以后采用systemctl命令管理系统服务(运行在后台的程序)：/usr/lib/systemd/system

```
systemctl 操作 服务名
```

### 启动服务

```
systemctl start 服务名.service
```

### 停止服务

```
systemctl stop 服务名.service
```

### 重启服务

```
systemctl restart 服务名.service
```

### 查看服务是否已启动

```
systemctl is-active 服务名.service
```

### 查看服务的状态

```
systemctl status 服务名.service
```

### 启用开机自启动服务

```
systemctl enable 服务名.service
```

### 禁用开机自启动服务

```
systemctl disable 服务名.service
```

### 查看服务是否为开机自启动

```
systemctl is-enabled 服务名.service
```

### 添加自定义系统服务

先准备你的服务程序源码，然后编写自定义的系统服务脚本和停止服务的脚本。

比如我用的是go语言编写的程序，先build出可执行文件，然后编写start.sh里执行该文件的指令，再编写stop.sh里killall杀死进程的指令，最后编写restart.sh。

同时，需要给脚本chmod +x增加可执行权限。接下来就是编写自定义服务的配置文件/usr/lib/systemd/system/test.service：

```
[Unit]
Description=test
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/su - yinlei -c "xxxx/.start.sh"
ExecStop=/usr/bin/su - yinlei -c "xxxx/.stop.sh"
ExecReload=/usr/bin/su - yinlei -c "xxxx/restart.sh"
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

重新加载服务配置文件：

```
systemctl daemon-reload
```

## 防火墙

防火墙=网络防火墙+主机防火墙

### 查看防火墙服务状态

```
systemctl status firewalld
```

### 查看防火墙已开通的端口

```
firewall-cmd --list-port
```

### 查看防火墙已开通的服务

```
firewall-cmd --list-service
```

### 开通端口

```
firewall-cmd --zone=public --add-port=端口号/tcp --permanent
```

### 移除端口

```
firewall-cmd --zone=public --remove-port=端口号/tcp --permanent
```

### 开通服务

```
firewall-cmd --zone=public --add-service=服务名 --permanent
```

### 移除服务

```
firewall-cmd --zone=public --remove-service=服务名 --permanent
```

### 重新加载防火墙配置参数

```
firewall-cmd --reload
```

## 环境变量

### 查看环境变量

```
env
```

```
echo $环境变量名
```

### 设置环境变量

```
export 变量名=值
```

PATH环境变量要注意：

```
export PATH=$PATH:新增目录:新增目录...
```

要想永久更改环境变量，需要在脚本中配置。

### 设置系统环境变量

- /etc/profile.d中增加环境变量脚本文件
- /etc/profile文件中设置环境变量
- /etc/bashrc文件中设置环境变量

### 设置用户环境变量

在用户的主目录：

- .bash_profile
- .bashrc
- .bash_logout
- .bash_history

## 开机启动程序

centos7中配置/etc/rc.local脚本文件也可以实现开机启动程序。

- /etc/rc.local是/etc/rc.d/rc.local的软链接
- rc.local脚本在操作系统启动时只执行1次
- rc.local中执行程序无环境变量，可以用su切换用户来执行
- 不要让rc.local挂起,加&符号让程序在后台运行

## 计划任务

linux使用crond服务来计划任务。

### 用户计划任务

#### 查看crontab文件

```
crontab -l [-u 用户名]
```

#### 修改crontab文件

```
crontab -e [-u 用户名]
```

## Linux常用命令

> 在服务器上执行以下的命令

### 关机

```
init 0
```

### 重启

```
init 6
```

```
reboot
```

### 目录和文件

- linux下，一切都是文件
- linux支持磁盘分区，即文件系统，文件系统也挂载在目录下（查看文件系统的命令：df）
- 不是自己创建的目录和文件不要动

#### 查看当前目录

```
pwd
```

#### 切换到指定目录

```
cd 目录名
```

#### 列出目录和文件

```
ls 
```

```
ls 目录名
```

列出目录和文件的详细信息：

```
ls -l
```

按照时间降序显示：

```
ls -lt
```

#### 创建目录

```
mkdir 目录名
```

#### 创建文件

```
touch 文件名
```

把屏幕显示的内容输出到文件：

```
任意可以屏幕输出内容的命令 > 文件名 
```

把屏幕显示的内容追加到文件：

```
任意可以屏幕输出内容的命令 >> 文件名 
```

#### 删除目录和文件

```
rm -rf 目录和文件列表
```

> -r：删除目录，无此参数只能删除文件  
> -f: 强制删除，不需要确认  
> 目录和文件列表中间用空格分隔，如： rm -rf aa bb cc

#### 复制目录和文件

```
cp -r 旧目录或文件名 新目录或文件名
```

> 如果第二个参数是已经存在的目录，则把第一个参数复制到该目录中

#### 移动目录和文件

```
mv 旧目录或文件名 新目录或文件名
```

> 如果第二个参数是已经存在的目录，则把第一个参数移动到该目录中

#### 查找目录和文件

```
find 查找目录 -name "文件名" -print
```

#### 远程拷贝目录和文件

ssh协议在两个linux服务器之间拷贝目录文件。

把远程服务器的目录拷贝到本地：

```
scp -r -P 22 root@另一个服务器ip:/tmp/aa bb
```

把本地目录拷贝到远程服务器：

```
scp -r -P 22 bb root@另一个服务器ip:/tmp/cc
```

#### 列出目录文件树

```
tree
```

> - -d: 只列出目录
> - -D: 列出目录和文件的修改时间
> - -p：列出目录和文件的权限
> - -f: 列出目录和文件名的路径
> - -a: 列出隐藏的目录和文件

#### 统计目录的大小

```
du -m
```

### 获取命令的帮助文档

```
man 命令名
```

### 清屏

```
clear
```

### 时间

查看时间：

```
date
```

设置时间:

```
date -s "yyyy-mm-dd hh:mi:ss"
```

例如：date -s "2023-12-03 10:42:22"

### vim

vi是最强大的文本编辑器,尤其是在服务器上操作。 

### 命令历史

- 命令历史记录存放在用户主目录的.bash_history文件
- 用上、下光标键可以调取历史命令
- 很多命令可以用tab键自动补全命令
- 书写目录或文件名时，可以用星号*匹配多个字符，用问号？匹配1个字符

### 用户管理

> linux的用户属于组角色，系统可以对一个组中的全部用户进行集中管理权限 /etc/group、/etc/passwd、/etc/shadow

#### 创建组

```
groupadd 组名
```

#### 删除组

```
groupdel 组名
```
#### 创建用户

```
useradd -n 用户名 -g 组名 -d 用户的主目录
```

#### 删除用户

```
userdel 用户名
```

#### 修改用户密码

```
passwd 用户名
```

#### 切换用户

```
su - 用户名
```

### 权限管理

#### 修改目录和文件的拥有者

```
chown -R 用户:组 目录和文件列表
```

> -R: 各子目录一起修改

#### 权限的标志位

例如ls命令中常看到的输出：drwxr-xr-x
- 第1个字符：文件类型
- 其他字符：文件的权限，每个权限的枚举值为r(可读)、w(可写)、x(可执行)
- 第2-4个字符：所有者用户的权限
- 第5-7个字符：同组用户的权限
- 第8-10个字符：其他用户的权限

以drwxr-x--- yinlei yin为例：此文件是目录，用户的所有者为yinlei具有可读可写可执行权限，用户组yin具有可读可执行但不可写权限，其他用户不可读不可写不可执行权限。

文件的权限：
- r：读取文件内容的权限
- w: 修改文件内容的权限，同时需要有r权限。若要删除文件，需要有目录的w权限
- x: 执行文件的权限，同时需要有r权限，文件是否能真正执行，还需要由文件本身决定 

目录的权限：
- x：可进入目录权限
- r: 可浏览目录中有那些子目录和文件，同时需要有x权限
- w: 可在目录中新增、删除、移动子目录和文件，同时需要有x权限

#### 设置权限

1. 八进制语法

权限的r、w、x分别对应数字如下：
- r: 4
- w: 2
- x: 1
- rwx: 4+2+1=7
- r-x: 4+1=5
- r--: 4+0=4

```
chmod -R 三位的八进制权限 目录和文件列表
```

e.g: chmod 461 test.cpp

2. 符号模式

```
chmod -R WhoOperatorPermission 目录和文件列表
```

(1).who:

| who | 用户类型 | 说明 | 
| :---: | :---: | :---: |
| u | user | 文件的所有者 |
| g | group | 文件所有者的组 | 
| o | others | 其他用户 | 
| a | all | 全部用户 | 

(2).operator:

| operator | 用户类型 | 
| :---: | :---: |
| + | 增加权限 |
| - | 取消权限 | 
| = | 重新设置权限 | 

e.g: chmod ug=rw test.c

### 文件内容操作

主要用于分析源代码文件、数据文件、日志文件等。

#### 查看文件内容

一次性显示文件全部的内容：

```
cat 文件名
```

按空格键继续显示，ctrl+u上翻页，ctrl+d下翻页，j下一行，k上一行:

```
less 文件名
```

按空格键显示下一页，按b显示上一页：

```
more 文件名
```

#### 统计文件行数

```
wc 文件名列表
```

#### 查找文件中的内容

```
grep "字符串" 文件名列表
```

#### 显示文件头部的内容

```
head -n 行数 文件名
```

#### 显示文件尾部的内容

```
tail -n 行数 文件名
```

#### 跟踪文件尾部的内容

> 主要用于查看后台程序运行的日志

```
tail -f 文件名列表
```

### 管道

管道就是将命令的输出重定向为另一个命令的输入,管道的操作符是|，用它将命令连接起来就可以了。

```
ls -l | more

tail xx.cpp | more
```

### 链接

Linux链接可分为硬链接、软链接(符号链接)。

#### 软链接

类似windows快捷方式，可为目录和文件创建软链接。

```
ln -s 目录或文件名 链接名
```

#### 硬链接

可理解为文件的别名，只能为文件创建硬链接，不能为目录创建。

```
ln 文件名 链接名
```

> - 硬链接不能跨文件系统
> - 硬链接是允许一个文件拥有多个有效的文件名，如果重要文件创建硬链接，可防止误删除，只有当最后一个链接被删除后，文件才会被真正的删除

### 上传、下载文件

- secureCRT

### 软件包的安装和卸载

很早之前linux只能用rpm安装软件包(ubuntu同理，可以看文章开头推荐的书)，需要手工解决软件包的依赖关系，相信做过java的感同身受。而centos的yum是基于rpm的软件包管理器，能够从指定的服务器下载软件包并安装，还可以自动处理依赖性关系，一次性安装所有依赖的软件包(像不像java开发中的maven)。

> 软件包的安装和卸载需要系统管理员权限

#### centos安装软件包

```
yum -y install 软件包名
```

#### centos删除软件包

```
yum -y remove 软件包名
```

#### centos升级软件包

```
yum update 软件包名
```

#### centos查找软件包

```
yum search 软件包名
```

### 压缩打包

#### zip

```
yum -y install zip unzip
```

```
zip -q -r -d -u 压缩包文件名 目录和文件列表
```

> - -q: 不显示命令执行的过程
> - -r: 递归处理，打包各级子目录和文件
> - -u: 文件增加/替换到压缩包中
> - -d: 从压缩包中删除指定的文件

```
unzip 压缩包文件名
```

> zip是通用的压缩格式，windows、linux都支持

#### tar

压缩打包：

```
tar zcvf 压缩包文件名 目录和文件列表
```

解包解压：

```
tar zxvf 压缩包文件名
```

### 进程

linux的命令也是程序。

#### 查看进程

```
ps -ef 
```

```
ps aux
```

#### 终止进程

```
kill 进程编号
```

> 加-9参数可以强行终止进程

```
killall 程序名
```

### 性能分析

top是linux下常用的性能分析工具，能实时显示系统运行的总体状态和每个进程使用资源的情况，类似windows的任务管理器。

```
top
```

### 查看系统磁盘分区

```
df
```

### 查看内存和交换区

```
free
```

### 

# 《Unix环境高级编程》

![Unix环境高级编程](/images//linux/unix.jpg)


