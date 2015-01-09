---
layout: post
title: Phonegap/Cordova 3.4 android 环境配置
description: Phonegap/Cordova 3.4 android 环境配置
category: blog
---
###Jdk下载安装

[官网地址 :](http://www.oracle.com/technetwork/java/javase/downloads/index.html)http://www.oracle.com/technetwork/java/javase/downloads/index.html

根据自己的系统对应下载安装

环境变量设置：

JAVA_HOME: 对应安装的主目录

比如我的：JAVA_HOME:  D:\Program Files\Java\jdk1.6.0_22

PATH: 对应目录下的bin文件夹路径

###Apache-ant下载配置

[官网地址 ：](http://ant.apache.org/bindownload.cgi)http://ant.apache.org/bindownload.cgi

环境变量设置：

ANT_HOME: 对应下载解压后的主目录

PATH: %ANT_HOME%bin

CLASSPATH: %ANT_HOME%lib

###Android-SDK 下载

[官网地址 ：](http://developer.android.com/sdk/index.html)http://developer.android.com/sdk/index.html

最新的sdk文件中已经包含以下， 可以在eclipse里直接创建android虚拟机了。

环境变量

PATH: 加入adb文件对应目录和tools目录

###Cordova 安装

新版的cordova可以直接通过nodejs的npm进行直接安装了

Nodejs直接去官网下载安装，新版默认装了npm

Npm 进行全局安装cordova：

npm install -g cordova

创建项目目录，当然当前目录自己选择：

cordova create workshop com.yourname.workshop Workshop

进入创建项目后的目录

cd Workshop

创建android文件：

Cordova platform add android

对应的删除：

cordova platform rm android

加入一些插件：

cordova plugin add org.apache.cordova.device

cordova plugin add org.apache.cordova.console

编译文件：

Cordova build android

在虚拟机上运行：

Cordova emulate android

    注： 查看当前设备列表  adb devices
    
    Npm 安装一些包可能失败：通过镜像使用方法： 有三种方法：
    
    1.通过config命令
    
    npm config set registry http://registry.cnpmjs.org
    
    npm info underscore （如果上面配置正确这个命令会有字符串response）
    
    2.命令行指定
    
    npm –registry http://registry.cnpmjs.org info underscore
    
    3.编辑 ~/.npmrc 加入下面内容
    
    registry = http://registry.cnpmjs.org