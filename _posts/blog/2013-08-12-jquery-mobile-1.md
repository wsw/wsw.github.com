---
layout: post
title: jQuery Mobile 基础
description: 不管你是对jQuery Mobile一无所知或者对它有很大的兴趣在研究过程中，还是已经开始用它做项目的开发者，欢迎加入这个jqm学习之旅
category: blog
---

<h2> jQuery Mobile 的相关概念 </h2>
<p>jQuery Mobile是什么？按照<a href="http://jquerymoblie.com/">官方</a>的描述：针对智能手机和平板、做过触摸优化的web框架。</p>

<p>jQuery Mobile推崇什么？其实很多读者应该多用过jquery，它推崇的是"write less,do more"，那jQuery Mobile呢？答案是一定的，而且更加针对移动设备。</p>

<p>使用jQuery Mobile相关的依赖资源?
1. 首先要依赖于jQuery框架提供的接口。
2. 自身依赖jquery-mobile.js和jquery-mobile.css。</p>

##jquery 页面构建
###jquery mobile 编写的最简单的页面结构 ###
<pre>
<code>
&lt;!doctype html&gt;
&lt;html lang="zh-hans"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;jQuery Mobile基础-页面基本结构&lt;/title&gt;
&lt;!-- 设置meta viewport start --&gt;
&lt;meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1"&gt;
&lt;!-- 设置meta viewport end --&gt;

&lt;!-- jqm依赖文件start --&gt;
&lt;link rel="stylesheet" href="jquery.mobile-1.3.1.css" /&gt;
&lt;script src="http://code.jquery.com/jquery-1.10.2.min.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="jquery.mobile-1.3.1.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;!-- jqm依赖文件end --&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- 页面容器start --&gt;
  &lt;div data-role="page"&gt;
	&lt;!-- 页眉部分start --&gt;
	&lt;div data-role="header"&gt;
	   &lt;h1&gt;我是header部分&lt;/h1&gt;
	&lt;/div&gt;
	&lt;!-- 页眉部分end --&gt;
	&lt;!-- content部分start --&gt;
	&lt;div data-role="content"&gt;
		&lt;p&gt;jQuery Mobile基础-我是content部分&lt;/p&gt;
	&lt;/div&gt;
	&lt;!-- content部分end --&gt;
	&lt;!-- 页脚部分start --&gt;
	&lt;div data-role="footer"&gt;
		&lt;h3&gt;我是footer部分&lt;/h3&gt;
	&lt;/div&gt;
	&lt;!-- 页脚部分end --&gt;
  &lt;/div&gt; 
  &lt;!-- 页面容器end --&gt; 
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>

###jquery mobile 所有组件###
所有的组件及组件的使用方法见
<a href="http://api.jquerymobile.com/category/widgets/">英文官网</a>
<a href="http://www.jqmapi.com/">中文网站</a>，
所有组件的属性信息见<a href="http://api.jquerymobile.com/data-attribute/">英文官网
