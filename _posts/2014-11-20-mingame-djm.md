---
layout: post
title: h5搭积木小游戏
description: 该游戏主要基于cocos2d-js开发的,简单介绍下写程序的思路.
category: blog
---
###cocos2d-js的介绍
[cocos2d-js 介绍](https://github.com/chukong/cocos-docs/blob/master/manual/framework/cocos2d-js/1-about-cocos2d-js/1-1-a-brief-history/zh.md)
[cocos2d-js 环境介绍](https://github.com/chukong/cocos-docs/blob/master/manual/framework/cocos2d-js/2-working-environment-and-workflow/2-2-cross-native-browser-game-with-cocos-console/zh.md)
[cocos2d-js 基本用法](https://github.com/chukong/cocos-docs/tree/master/manual/framework/cocos2d-js)

注：只开发web版可以不安装ANDROID SDK,NDK,但Ant，java还是必须的。
    当然只开发web版还可以直接下载 cocos2d-js lite version,功能相对少点，
    使用方便，可以用jquery一样直接引用就好了。[cocos2d-js lite](https://github.com/chukong/cocos-docs/blob/master/manual/framework/cocos2d-js/2-working-environment-and-workflow/2-1-cocos2d-js-lite-workflow/zh.md)

####chipmunk物理的一些介绍文档 
[http://www.yxkfw.com/?p=9501](http://www.yxkfw.com/?p=9501)
[http://www.cnblogs.com/linn/p/3656041.html](http://www.cnblogs.com/linn/p/3656041.html)

####游戏试玩
[游戏地址](http://wsw.github.io/minigame/game/djm/html5/index.html)

###创建项目
<pre><code> cocos new -l js dajimu </code></pre>

###文件处理
把图片资源放在res目录下, src/resource.js中加入图片的地址.js统一写在src目录下,当然每写任务js文件必须在project.json中jsList进行添加.

###游戏的一些思路
1.创建第一个loading界面 MyLoaderScene.js. 当然可以通过框架中的loaderscene.js复制一份过来进行修改。 其中一个彩色部分按进度显示，可以通过设置彩色的显示范围，api为setTextureRect.

2.本游戏主要用一个物理引擎的，所以必须把物理引擎chipmunk包含进来，直接通过project.json中设置modules

3.创建游戏的界面, 主要分为两个层面,一个y值不变的（主界面），一个是随积木下落变化y值的（积木层），主界面主要设置logo，时间，成绩，以及转动的积木对象，当然还有背景，背景的y值同积木层一起下降。

4.主界面的设计思路，在构造器中

    1. 添加背景图片
    2. 添加logo
    3. 创建space物理空间
    4. 创建积木层 （通过3创建的space传入积木层）
    5. 初始化旋转积木对象
    6. 初始化当前分数
    7. 初始化时间

5.在进入游戏的函数中

    1. 初始化update方法 (每帧 调用 的 方法)
    2. 碰撞处理事件绑定
    3. 游戏状态的设置
    4. 点击事件的绑定

其中点击的处理是首先考虑游戏是否进行中，积木层是否已经创建，当前是否有旋转的积木，当符合条件时，就获取当前旋转角度，通过计算得出当前点的位置，并以前当位置创建新的含有重力的积木对象，以及设置当前旋转积木隐藏。
碰撞的处理是当落下的积木与底下的积木发生碰撞时，积木层和主界面的背景层的y值就开始变化，并把当前旋转的积木显示出来。当然还要把积木对象的setCollisionType设置与被碰撞的一样的。
update方法即每帧要处理包括物理空间的重力产生，分数的变化，时间的变化。
当然最重要的游戏的游戏结束的处理，包括时间结束和游戏失败情况，游戏失败情况我处理的方法：当前下落的积木下落距离超过了积木对象当前下落距离时（即超过了固定的y），有两种情况，1.当下落的积木没有与底下积木碰撞，即下落距离超出范围了 2.当下落的积木与底下积木碰到并倒了，那么下一次下落的积木落下的距离一定也超出范围，这两种情况都作为游戏失败的。

6.积木层的设计思路

    1.初始化物理空间space由主界面层传进来，使得积木层和主界面层的两层的物理对象可以产生相互作用的 
    2.在积木层底部设置一个固定的刚体
    3.初始化一个固定的积木在游戏底部，由于之前在底部设置了一个固定的刚体，所以积木是不会掉下去的这
    边有个注意的一点，由于积木的搭建需要有两张的图片的重 叠，就通过设置对象的物理形状高度小于图片
    的高度 4.根据坐标创建一个新的积木对象
        
###编译代码
<code> cocos compile -p web -m release </code>