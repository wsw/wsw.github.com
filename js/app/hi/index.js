/**
 * User: caolvchong@gmail.com
 * Date: 8/7/13
 * Time: 10:20 AM
 */
define(function(require, exports, module) {
    var $ = require('$');
    var hlJS = require('../../lib/cmp/hl/lang-js');
    require('hl/style.css');

    $(function() {
        hlJS.HELPERS.highlightByName('code', 'pre');
    });
});