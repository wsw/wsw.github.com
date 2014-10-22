var mText = "";
var mGetData = "";
var mShowResult = "";
var hasGetData = false;

var backWidth = "150";
var backHeight = "40";
var mouseDown = false;
var isPop = false;
var canvas = { 'temp': null, 'draw': null };
var mScratchpad = null;

function setupCanvases(element, getdata, showResult) {

    mScratchpad = element;
    mGetData = getdata;
    mShowResult = showResult;

    mScratchpad.width = backWidth;
    mScratchpad.height = backHeight;

    canvas.temp = document.createElement('canvas');
    canvas.draw = document.createElement('canvas');

    canvas.temp.width = mScratchpad.width;
    canvas.temp.height = mScratchpad.height;
    canvas.draw.width = mScratchpad.width;
    canvas.draw.height = mScratchpad.height;

    recompositeCanvases();

    mScratchpad.addEventListener('mousedown', mousedown_handler, false);
    mScratchpad.addEventListener('touchstart', mousedown_handler, false);

    window.addEventListener('mousemove', mousemove_handler, false);
    window.addEventListener('touchmove', mousemove_handler, false);

    window.addEventListener('mouseup', mouseup_handler, false);
    window.addEventListener('touchend', mouseup_handler, false);
}

function recompositeCanvases() {
    var gnum = 0;
    var tempctx = canvas.temp.getContext('2d');
    var mainctx = mScratchpad.getContext('2d');
    canvas.temp.width = canvas.temp.width;

    tempctx.drawImage(canvas.draw, 0, 0);

    tempctx.globalCompositeOperation = 'source-atop';
    tempctx.fillStyle = "#FBEACE";
    tempctx.fillRect(0, 0, backWidth, backHeight);
    tempctx.globalCompositeOperation = 'source-atop';
    tempctx.fillStyle = "#F14553";
    tempctx.lineWidth = 30;
    tempctx.font = "bolder 20px Microsoft YaHei";
    tempctx.textAlign = "center";
    tempctx.textBaseline = "Middle";


    mainctx.fillStyle = "#A8A8A8";
    mainctx.fillRect(0, 0, backWidth, backHeight);
    tempctx.fillText(mText, backWidth / 2, backHeight / 2 + 7);
    mainctx.globalCompositeOperation = 'source-atop';
    mainctx.fillStyle = "#ffffff";
    mainctx.lineWidth = 30;
    mainctx.font = "bolder 20px Microsoft YaHei";
    mainctx.textAlign = "center";
    mainctx.textBaseline = "Middle";
    mainctx.drawImage(canvas.temp, 0, 0);

    var imgData = mainctx.getImageData(0, 0, backWidth, backHeight);

    for (var i = 0; i < imgData.data.length; i += 64) {
        if (imgData.data[i] != 168) {
            gnum += 1;
        }
    }

    //刮的区域超过150显示结果-------------------------- 
    if (gnum >= 150 && !isPop) {
        mShowResult();
        isPop = true;
    }

}

function setScratchpadText(text) {
    mText = text;
}

function scratch(canv, x, y, fresh) {
    var ctx = canv.getContext('2d');
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (fresh) {
        ctx.beginPath();
        ctx.moveTo(x + 0.01, y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

function mousedown_handler(e) {

    //第一次获取抽奖结果数据 
    if (!hasGetData) {
        mGetData();
        hasGetData = true;
    }

    var local = getLocalCoords(mScratchpad, e);
    mouseDown = true;
    scratch(canvas.draw, local.x, local.y, true);
    recompositeCanvases();

    if (e.cancelable) { e.preventDefault(); }
    return false;
};

function mousemove_handler(e) {
    if (!mouseDown) { return true; }
    var local = getLocalCoords(mScratchpad, e);

    scratch(canvas.draw, local.x, local.y, false);
    recompositeCanvases();

    if (e.cancelable) { e.preventDefault(); }
    return false;
};

function mouseup_handler(e) {
    if (mouseDown) {
        mouseDown = false;
        if (e.cancelable) { e.preventDefault(); }
        return false;
    }
    return true;
};

function getLocalCoords(elem, ev) {
    var ox = 0, oy = 0;
    var first;
    var pageX, pageY;

    while (elem != null) {
        ox += elem.offsetLeft;
        oy += elem.offsetTop;
        elem = elem.offsetParent;
    }


    if (ev.hasOwnProperty('changedTouches')) {
        first = ev.changedTouches[0];
        pageX = first.pageX;
        pageY = first.pageY;
    } else {
        pageX = ev.pageX;
        pageY = ev.pageY;
    }

    return { 'x': pageX - ox, 'y': pageY - oy };
}
