---
layout: post
title: Chrome and Chrome Mobile 远程调试
description: 主要对Chrome远程调试方法做了总结，希望能对大家的日常工作有多帮助。
category: blog
---

#Chrome and Chrome Mobile 远程调试#

##准备工作：##
<ol>
<li>Android SDK 下载安装</li>
<li>Chrome 下载安装</li>
<li>有一部 Android 手机或安装 Android 虚拟机</li>
<li>移动版 Chrome：Google Play 搜索 Chrome</li>
</ol>

##步骤##
<ol>
<li>Android 设备通过 USB 连接电脑，要访问 Android 设备还需要 Android Debug Bridge(adb)，先前安装的 Android SDK 中包含此款命令行工具。在 Windows 中点击 “开始” ― “运行” ― “cmd” 找到 Android SDK 里的 platform-tools 目录。</li>
<li>在移动设备上打开 Chrome，“设置” ― “开发人员工具” ― “启用 USB 网页调试”。</li>
<li>在 Windows 下输入 adb devices 看下面的列表中有没有你的机器，如果没有检查一下 Android 设备的 USB 调试是否打开。</li>
<li>在 platform-tools 目录下输入：adb forward tcp:9222 localabstract:chrome_devtools_remote</li>
<li>在桌面版 Chrome 输入 localhost:9222，页面出现移动版 Chrome 访问的页面。</li>
<li>点击 “inspectable pages” 下面的任一页面进入调试页面，移动设备页面可以在桌面调试了。</li>
</ol>
参考地址：[http://dev.oupeng.com/articles/remote-debugging-with-browsers](http://dev.oupeng.com/articles/remote-debugging-with-browsers)。