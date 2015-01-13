---
layout: post
title: 使用 http-server 搭建前端服务器环境
description: 前端开发经常要启用一个服务器环境，比如apache,iis,nodejs等作为静态服务器环境，现在可以用用http-server，安装、使用方便
category: blog
---
###1. 安装
npm install http-server -g

###2. 使用
    http-server [path] [options]
    [path] defaults to ./public if the folder exists, and ./ otherwise.
    [path] 未指定时，默认指向./public，如果./public文件夹不存在，则指向./

###3. 预览
http://localhost:8080/

[参考：](https://github.com/nodeapps/http-server#usage)https://github.com/nodeapps/http-server#usage
