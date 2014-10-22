(function ()
{
    var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function () { return false; },
        requestFullScreen: function () { },
        cancelFullScreen: function () { },
        fullScreenEventName: '',
        prefix: ''
    },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined')
    {
        fullScreenApi.supportsFullScreen = true;
    } else
    {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++)
        {
            fullScreenApi.prefix = browserPrefixes[i];
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined')
            {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen)
    {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
        fullScreenApi.isFullScreen = function ()
        {
            switch (this.prefix)
            {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function (el)
        {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function (el)
        {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }
    // jQuery plugin
    if (typeof jQuery != 'undefined')
    {
        jQuery.fn.requestFullScreen = function ()
        {
            return this.each(function ()
            {
                if (fullScreenApi.supportsFullScreen)
                {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
    window.fullScreenApi = fullScreenApi;
})();

$(function ()
{
    $('a.fs').click(function ()
    {
        if (window.fullScreenApi.supportsFullScreen)
        {
            if (window.fullScreenApi.isFullScreen())
            {
                window.fullScreenApi.cancelFullScreen(document.body);
                setTimeout(function ()
                {
                    $(window).triggerHandler("resize");
                    $(document.body).width('100%');
                    $(document.body).height('100%');
                    $('a.fs').parent().removeClass('selected');
                }, 1000);
            } else
            {
                $(document.body).width('100%');
                $(document.body).height('100%');
                window.fullScreenApi.requestFullScreen(document.body);
                $('a.fs').parent().addClass('selected');
            }
        } else
        {
            alert('就你这浏览器，基本就告别全屏功能了');
        }
        return false;
    });
})