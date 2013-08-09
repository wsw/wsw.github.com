/**
 * User: caolvchong@gmail.com
 * Date: 8/9/13
 * Time: 2:08 PM
 */
define(function(require, exports, module) {
    var $ = require('$');
    var hlJS = require('../../lib/cmp/hl/lang-js');
    require('hl/style.css');

    var Class = require('../../lib/util/class');

    $(function() {
        hlJS.HELPERS.highlightByName('code', 'pre');

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

        $('#btn1').click(function() {
            // 调用
            var o = new MyClass('Tom', 27);
            alert(o.talk('hello'));
        });

        var ExtClass = MyClass.extend({
            initialize: function(name, age) {
                ExtClass.superclass.initialize.call(this, name, age);
            },
            work: function() {
                return 'I am working';
            }
        });

        $('#btn2').click(function() {
            // 调用
            var o = new ExtClass('Jerry', 22);
            alert(o.talk('hi') + o.work());
        });
    });
});