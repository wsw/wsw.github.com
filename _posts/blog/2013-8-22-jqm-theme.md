---
layout: post
title: jqm主题化
description: 如何为每种jQuery Mobile元素类型创建定制主题，定制主题允许你创建的网站的移动版本，其与网站的桌面版本遵循同样的品牌概念。
category: blog
---
<p>jQuery Mobile框架包含了一个页面主题系统，其提供了对页面元素的外观和样式的完全控制。可把HTML5的data-theme属性添加到元素中，以此来应 用现有的jQuery Mobile主题调板（theme swatch)或是新的调板。主题系统包含了五个调板，使用字母来标识每个调板——比如说，A-E代表jQuery Mobile框架自身提供的调板。你可通过下载jQuery Mobile框架提供的CSS文件来查看现有的调板。若要创建新的调板，可使用任何还未被用的字母表中的字母（即F-Z）。一旦确定了自己想用的字母，你 就可以参考任何现有的调板来为所有的各种页面元素复制定制的类。</p>
###1.页面主题化
页面主题由包含了整个网页的样式化了的HTML元素构成.下面的代码展示了一个page元素的例子，该元素使用了值为F的 data-theme：<br/>
<code>< div data-role="page" data-theme="f"></code> <br />
jQuery Mobile框架实际上创建并添加了几个CSS类到page元素中,经过框架处理之后，浏览器中的输出会变成什么样子：<br/>
<code>< div data-role="page" data-theme="f" 
class="ui-page ui-body-f ui-page-active" style="min-height: 580px;"></code><br/>
根据data-role的值page，指派了ui-page和ui-page-active类，根据data-theme的值f,指派了ui-body-f类。你可以使用任何的这些类来样式化page元素或是它的内容。现在为ui-body-f添加css样式：<br />
<code>.ui-body-f {<br />
background-color: #cfe8cc;<br />
font-family: "Lucida Sans Unicode", "Lucida Grande", Arial, sans-serif;
} </code><br />
同样可以样式化所有出现在page元素内容的input text和password域:<br />
<code>.ui-body-f input[type="text"], <br />
.ui-body-f input[type="password"] {<br />
background-color: #ccc;
} </code>
###2.工具栏主题化
在jQuery Mobile框架中，工具栏是指页头和页脚元素,若要把工具栏定义成页头或页脚，使用data-role属性。data-role属性的值应该为 header或者footer.<br />
<code>< div data-role="header">
<br />
< div data-role="footer">
</code><Br/>
缺省情况下，会为其指派ui-header或ui-footer和ui-bar-a类。为页头工具栏header添加自定义调色板f:<br />
<code>.ui-bar-f {
padding: 10px 0px;
background-color: #069;
border-bottom: 2px solid #036;
color: #fff;
}</code><br />
为页脚工具栏footer添加自定义调色板g<br />
<code>.ui-bar-g {
margin-top: 20px;
padding: 10px 0;
color: #fff;<br />
border-bottom: 2px solid #000;
background-color: #000;
background: -moz-linear-gradient(top, rgba(204,204,204,1) 0%, rgba(0,0,0,0.65) 100%);
/* FF3.6+ */ <br />
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,
rgba(204,204,204,1)), color-stop(100%,rgba(0,0,0,0.65))); /* Chrome,Safari4+ */<br />
background: -webkit-linear-gradient(top, rgba(204,204,204,1) 0%,
rgba(0,0,0,0.65) 100%); /* Chrome10+,Safari5.1+ */<br />
background: -o-linear-gradient(top, rgba(204,204,204,1) 0%,rgba(0,0,0,0.65) 100%); 
/* Opera11.10+ */<br />
background: -ms-linear-gradient(top, rgba(204,204,204,1) 0%,rgba(0,0,0,0.65) 100%); 
/* IE10+ */<br />
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cccccc', 
endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */<br />
background: linear-gradient(top, rgba(204,204,204,1) 0%,rgba(0,0,0,0.65) 100%); 
/* W3C */<br />
}</code><br />
###3.内容主题化
content元素可使用你所选的自定义调板来主题化。若要为你的移动网站中的内容创建自定义调板，你必须先创建一个content元素。比如在content中加入<br />
<code>< div data-role="collapsible" data-collapsed="true"></code> <Br/>
为可折叠块的标题栏相关的自定义CSS类<br />
<code>ui-body-f .ui-collapsible-contain 
.ui-collapsible-heading .ui-btn-up-f {<br />
background: #666;
color: #fff;
text-decoration: none;
}
.ui-body-f .ui-collapsible-contain <br />
.ui-collapsible-heading .ui-btn-down-f, <br />
.ui-body-f .ui-collapsible-contain 
.ui-collapsible-heading .ui-btn-hover-f { <br />
background: #999;
color: #fff;
text-decoration: none;
}</code>
###4.列表主题化
把一个普通的HTML列表转换成一个在触摸设备上容易使用的漂亮的移动列表，所需要做的就是把data-role属性的值设为listview。自定义列表项<br />
<code>.ui-listview .ui-btn-up-f a, <br />
.ui-listview .ui-btn-down-f a, <br />
.ui-listview .ui-btn-hover-f a {<br />
color: #fff;
}</code>