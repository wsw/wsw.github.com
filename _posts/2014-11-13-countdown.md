---
layout: post
title: 简单倒计时
description: 写了一个简单倒计时，刚好复习一下jquery的插件，以及一些js面向对象的写法
category: blog
---
<pre><code>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <span class="countdown" data-endtime="1432326131">
        <i>00</i>
        <em>天</em>
        <i>00</i>
        <em>时</em>
        <i>00</i>
        <em>分</em>
        <i>00</i>
        <em>秒</em>
    </span>
    <span class="countdown" data-endtime="1431326131">
        <i>00</i>
        <em>天</em>
        <i>00</i>
        <em>时</em>
        <i>00</i>
        <em>分</em>
        <i>00</i>
        <em>秒</em>
    </span>
</body>
<script src="http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript">

    (function($) {
        function countdown() {
            //创建一个构造器
            var Obj = function () {
                this.remaining = -1;
                this.dom = null;
            };
            Obj.prototype.init = function($this) {
                var endtime = $($this).attr('data-endtime');
                if (typeof endtime === 'undefined') {
                    return false;
                }
                var currenttime = (new Date().getTime())/1000;

                this.remaining = window.parseInt(endtime - currenttime);
                if (this.remaining <= 0) {
                    return false;
                }
                this.dom = $this;
                //setInterval(this.show.bind(this), 1000);
                setInterval((function(_this) {   //this对象的指向转换  伪造bind
                    return function() {
                        _this.show.call(_this);
                    }
                })(this), 1000);
            };
            Obj.prototype.show = function() {
                var leaveSecond = this.remaining--;
                var day = Math.floor(leaveSecond/(60*60*24));
                var hour = Math.floor((leaveSecond-day*60*60*24)/3600);
                var minute = Math.floor((leaveSecond-day*60*60*24-hour*3600)/60);
                var second = Math.floor(leaveSecond-day*60*60*24-hour*3600-minute*60);
                $(this.dom).html("<i>"+fmt(day)+"</i><em>天</em><i>"+fmt(hour)+"</i><em>时</em><i>"+
                        fmt(minute)+"</i><em>分</em><i>"+fmt(second)+"</i><em>秒</em>");
            };
            var fmt = function(ct) {
                return ct >= 10 ? ct : "0" + ct;
            };
            return  $(this).each(function() {
                var obj = new Obj();
                obj.init(this);
            });
        }

        $.fn.countdown = countdown;

        $('.countdown').countdown();
    })(jQuery);

</script>
</html>
</code></pre>

<pre><code>
    (function($) {
        function countdown() {
            var Obj = function () {
                this.remaining = -1;
                this.dom = null;
            };
            Obj.prototype.init = function($this) {
                var endtime = $($this).attr('data-endtime');
                if (typeof endtime === 'undefined') {
                    return false;
                }
                var currenttime = (new Date().getTime())/1000;

                this.remaining = window.parseInt(endtime - currenttime);
                if (this.remaining <= 0) {
                    return false;
                }
                this.dom = $this;
                //setInterval(this.show.bind(this), 1000);
                setInterval((function(_this) {   //this对象的指向转换  伪造bind
                    return function() {
                        _this.show.call(_this);
                    }
                })(this), 1000);
            };
            Obj.prototype.show = function() {
                var leaveSecond = this.remaining--;
                var day = Math.floor(leaveSecond/(60*60*24));
                var hour = Math.floor((leaveSecond-day*60*60*24)/3600);
                var minute = Math.floor((leaveSecond-day*60*60*24-hour*3600)/60);
                var second = Math.floor(leaveSecond-day*60*60*24-hour*3600-minute*60);
                $(this.dom).html("<i>"+fmt(day)+"</i><em>天</em><i>"+fmt(hour)+"</i><em>时</em><i>"+
                        fmt(minute)+"</i><em>分</em><i>"+fmt(second)+"</i><em>秒</em>");
            };
            var fmt = function(ct) {
                return ct >= 10 ? ct : "0" + ct;
            };
            return  $(this).each(function() {
                var obj = new Obj();
                obj.init(this);
            });
        }

        $.fn.countdown = countdown;

        $('.countdown').countdown();
    })(jQuery);
</code></pre>