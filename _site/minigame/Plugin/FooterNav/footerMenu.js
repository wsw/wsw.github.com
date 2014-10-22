
(function ($)
{
    var startX, startY, endX, endY;
    document.getElementById("footer").addEventListener("touchstart", touchStart, false);
    document.getElementById("footer").addEventListener("touchmove", touchMove, false);
    document.getElementById("footer").addEventListener("touchend", touchEnd, false);
    
    //开关
    var footerSwitch = false;
    var footerAnimateTime = 650;
    var footer = $('.footer'), footerMenuDom = $('.f_menu');
    var footerEmWidth = $('.footer .f_switch em').width();
    var footerShift = footerMenuDom.width() - footerEmWidth;
    var fuDom = $('.footer .f_switch u');
    //阻止默认事件
    function preventDefault(e) { e.preventDefault(); };
    function touchStart(event)
    {
        //阻止滑动事件
        document.addEventListener('touchmove', preventDefault, false);
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    }
    function touchMove(event)
    {
        var touch = event.touches[0];
        endX = (startX - touch.pageX);
        endY = (startY - touch.pageY);
    }
    function touchEnd(event)
    {
        //删除阻止的滑动事件
        document.removeEventListener('touchmove', preventDefault);
        if (endX > 60)
        {
            if (footerSwitch)
            {
                $('.f_switch').click();
            }
        } else if (endX < -60)
        {
            if (!footerSwitch)
            {
                $('.f_switch').click();
            }
        }
        endX = 0;
        endY = 0;
    }
    $(window).resize(function ()
    {
        footerShift = $('.f_menu').width() - footerEmWidth;
        if (footerSwitch)
        {
            footer.animate({
                translate3d: footerShift + 'px,0,0',
            }, footerAnimateTime, 'ease-in-out');
        }
    });

    $('.f_switch').on('click', function ()
    {
        if (!footerSwitch)
        {
            footer.addClass('on').animate({
                translate3d: footerShift + 'px,0,0',
            }, footerAnimateTime, 'ease-in-out', function ()
            {
                footerSwitch = true;
            });
            footerMenuDom.animate({
                translate3d: footerEmWidth + 'px,0,0',
            }, footerAnimateTime, 'ease');
            fuDom.animate({
                translate3d: '-4px,0,0',
            }, footerAnimateTime, 'ease-in-out');
        } else
        {
            footer.removeClass('on').animate({
                translate3d: '0,0,0',
            }, footerAnimateTime, 'ease-in-out', function ()
            {
                footerSwitch = false;
            });
            footerMenuDom.animate({
                translate3d: '0,0,0',
            }, footerAnimateTime, 'ease');
            fuDom.animate({
                translate3d: '0,0,0',
            }, footerAnimateTime, 'ease-in-out');
        }
    })
})(Zepto)