---
layout: post
title: "Widget的使用"
description: ""
category: javascript
tags: gazira
---
{% include JB/setup %}

### Widget基类
[1]: https://github.com/caolvchong/gazira    "a javascript library for web develop"
[2]: http://seajs.org/    "javascript模块化开发工具"
[3]: http://aralejs.org/    "支付宝前端架构"
[4]: http://aralejs.org/widget/    "Widget文档"
[5]: http://aralejs.org/base/    "Base文档"
[6]: http://aralejs.org/base/docs/attribute.html    "Attribute文档"
[7]: http://aralejs.org/base/docs/aspect.html    "Aspect文档"
[8]: http://aralejs.org/events/    "Events文档"
[9]: http://aralejs.org/class/    "Class文档"

[gazira][1] 的Widget实际上来自 [arale][3]，因此可以从 [Widget 文档][4] 来获使用上的帮助。这里会结合使用，对Widget做个介绍。

Widget 顾名思义：部件、组件，诸如弹出窗、日历等等都属于组件。
诸多可以复用的组件可以封装，实践多了会发现，组件虽然形态功能千差万别，但是基础流程是大致相同的：
    初始化属性 -> 生成DOM -> 事件处理与方法调用 -> 销毁

因此抽象层面，Widget具有生命周期： initialize、render、destroy；
在OO层面，Widget又是需要继承的；在业务层面，Widget需要有事件支持。

基于上面的要求，我们的组件基类Widget是这样实现的：
Widget继承自[Base][5]。[Base][5]是无关DOM操作的一个类，由[Class][9]创建，提供了OO支持；同时混入 [Events][8] 事件、 [Aspect][7] 切面、 [Attribute][6] 属性操作 功能。
Widget本身提供了对DOM操作的常用操作，这样就提供了一套组件基类的解决方案。


### Widget骨架
<pre name="code" class="js">
Widget.extend({
    attrs: {
        id: null,
        className: null,
        style: null,
        template: '<div></div>',
        parentNode: document.body，
        ...
    },
    events: {
        'click [data-action=close]': function(e) {
            this.hide();
            return false;
        }
    },
    setup: function() {
    },
    ...

    _onRenderX: function() {

    }
});
// render/destroy/$
</pre>


通常，直接使用[Class][9]，[Events][8]，[Aspect][7]，[Attribute][6]，[Base][5] 的机会不多，但需要了解他们的使用，才能对Widget的使用更深入。

### Class API简介
[Class][9] 提供create方法，来创建一个满足OO的“类”
<pre name="code" class="js">
var MyClass = Class.create({
    // 初始化方法，在构建实例时调用
    initialize: function(name, age) {
        this.name = name;
        this.age = age;
    },
    talk: function(word) {
        return this.name + ':' + word;
    }
});
// 调用
var o = new MyClass('Tom', 27);
o.talk('hello');
</pre>
<input type="button" id="btn1" value="点击看看"/>

所有由Class.create创建的类都具有extend方法，使用该方法表示从该类继承。<br/>
子类访问父类使用  ``子类名.superclass.父类方法名.call/apply(this, 参数)`` 方式
<pre name="code" class="js">
var ExtClass = MyClass.extend({
    initialize: function(name, age) {
        ExtClass.superclass.initialize.call(this, name, age);
    },
    work: function() {
        return 'I am working';
    }
});
</pre>
<input type="button" id="btn2" value="点击看看"/>

由Class.create创建的类还可以支持多继承，由``Implements``来支持<br/>
和 Implements 类似的属性``Extends``， 二者区别是 Extends 只支持单个父类， Implements可以是单个父类，也可以是一个数组<br/>

给Class.create创建好的类动态增加或者修改方法，可以使用 ``implement``方法

### Base API简介
[Base][5] 由Class.create创建，同时Implements了 [Events][8]，[Aspect][7] 和 [Attribute][6]<br/>


### Aspect API简介
[Aspect][7] 提供了切面功能，对从[Base][5]继承的类的成员方法，都加入了切面（before/after）功能。<br/>


### Attribute API简介
[Attribute][6] 提供了setter/getter功能，对从[Base][5]继承的类的成员属性，都加入了setter/getter功能。<br/>
_onChangeX 会被转化为 change:x 事件。组件实例化的时候也会设置属性，但不会触发 change:x 事件，即不会执行 _onChangeX


### Events API简介
[Events][8] 提供了事件功能：on/off/trigger。<br/>


<script>seajs.use('dist/app/how-to-create-a-widget-with-gazira/index');</script>