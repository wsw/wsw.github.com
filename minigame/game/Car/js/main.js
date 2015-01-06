/*
 *  edit by weishuwen 2014-10-17
 * */

(function($){

    var Game = function(data) {

        this.ajax = data.ajax;
        this.config = data.config;
        this.curPageId = "start";
        this.point = 0; //游戏分数
        this.userinfo = {};
        this.todayRemain = 0;

        this.blockWidth = $('body').width() / 4;
        this.layerCol = 10;
        this.layerHeight = this.blockWidth * this.layerCol;
        this.index = this.layerCol;
        this.gameplay = false;
        this.isOver = false;

        this.tg = null;  //
    };

    window.Game = function(data){     //挂到window对象下
        var game = new Game(data); //创建对象
        game.init();
    };

    var $layer = $("#layer");
    var $layer1 = $("#gameLayer1");
    var $layer2 = $("#gameLayer2");
    var gameLayerList = [];
    var menu = { start: 0, guide: 1, rank: 2, my: 3, share: 4 };
    var $gameTime = $("#timeLayer"),
        $mask = $("#mask"),
        $cars = $(".game-get i"),
        $gameSuc = $("#sucLayer"),
        $gameResultLayer = $("#resultPage"),
        $rankList = $("#rankList"),
        $rankMy = $("#rankMy"),
        $myPage = $("#myPage"),
        $remain = $(".game-remain i"),
        $title = $(".title"),
        timeStatus = false,   //判读时间是否立即停止
        timeStart = new Date(),
        curScore = 0,
        isUse = false,
        videoTap = new Audio("/App_Content/Game/CarSnatchings2.0/css/tap.mp3"),
        videoErr = new Audio("/App_Content/Game/CarSnatchings2.0/css/err.mp3"),
        videoEnd = new Audio("/App_Content/Game/CarSnatchings2.0/css/end.mp3");

    Game.prototype.init = function () {

        this.initData();
        this.menu();
        this.bodyEvent();
        this.gameOutcome();
    };

    Game.prototype.menu = function () {
        var _this = this;
        $("footer").bind('click', function(e) {
            var action = e.target.getAttribute('data-action');
            switch (action){
                case 'guide':
                case 'rank':
                case 'start':
                case 'my':
                    _this.changePage(action);
                    break;
                case 'share':
                    $("#sharePage").show();
                    break;
            }
            return false;
        });
    };

    Game.prototype.bodyEvent = function () {
        var _this = this;
        $("body").bind("click", function(e) {
            var action = e.target.getAttribute('data-action');
            if (action == "restart") {
                _this.changePage('start');
            }
            if (action == "get") {
                _this.gameSignup();
            }
            if (action == "use") {
                _this.gameUse($(e.target).parent().find('input'));
            }
            if (action == "share") {
                $("#sharePage").show();
            }
        });
    };

    Game.prototype.timeHandle = function () {
        var _this = this;
        var now = 0;
        timeStart = new Date();
        var time = setInterval(function() {
            now = new Date() - timeStart;

            if (timeStatus) {
                $gameTime.text(_this.creatTimeText(0));
                clearInterval(time);
                return ;
            }

            if (now >= _this.config.countSecond*1000) {
                $gameTime.text("时间到~").addClass('animate');
                clearInterval(time);
                _this.gameOver(1);
                return ;
            }

            $cars.text(_this.point);

            //有些界面数据变化直接在处理

            $gameTime.text(_this.creatTimeText(window.parseInt((_this.config.countSecond*1000-now)/10)));
        }, 10)
    };

    Game.prototype.changePage = function(showid) {
        $("#sharePage").hide();
        if (showid === this.curPageId){
            return;
        }
        $("footer .f_menu a").eq(menu[showid]).addClass('on').siblings().removeClass('on');
        $("#" + this.curPageId + "Page").hide();
        $("#" + showid + "Page").fadeIn();
        if (showid === "rank") {
            rankHeight();
        }
        this.curPageId = showid;
    };

    Game.prototype.initData = function () {

        var _this = this;

        $layer1.height(this.layerHeight);
        $layer2.height(this.layerHeight);

        gameLayerList.push($layer1);
        gameLayerList.push($layer2);

        for (var i = 0; i < gameLayerList.length; i++) {
            var box = gameLayerList[i][0];
            for (var j = 0; j < this.layerCol * 4; j++) {
                var child = document.createElement('div');
                var rstyle = child.style;
                box.appendChild(child);
                rstyle.left = (j % 4) * this.blockWidth + 'px';
                rstyle.bottom = Math.floor(j / 4) * this.blockWidth + 'px';
                rstyle.width = this.blockWidth + 'px';
                rstyle.height = this.blockWidth + 'px';
                child.className = 'icon';
            }
        }

        _this.restart();

        _this.eventHandler();
    };

    Game.prototype.restart = function () {

        var _this = this;

        _this.index = _this.layerCol;

        for (var i = 0; i < gameLayerList.length; i++) {
            _this.freshLayer(gameLayerList[i]);
        }

        $gameTime.text(_this.creatTimeText(window.parseInt(_this.config.countSecond*100)));
        _this.isOver = false;
        timeStatus = false;
        _this.point = 0;
        _this.gameplay = false;

        $layer1.css({"-webkit-transform": "translate3d(0px, "+(-this.blockWidth)+"px, 0px)",
            "transition": "0ms"}).attr('offset_y', -this.blockWidth);
        $layer2.css({"-webkit-transform": "translate3d(0px, "+ (-this.layerHeight-this.blockWidth)+"px, 0px)",
            "transition": "0ms"}).attr('offset_y', (-this.layerHeight-this.blockWidth));
    };

    Game.prototype.freshLayer = function (gamelayer) {

        var childrens = gamelayer.find('div');

        for (var i = 0; i < childrens.length; i++) {
            var $child = childrens.eq(i);
            $child.attr('class', 'icon').attr('type', 'blank')
                .attr('data-m', '0').attr('data-index', Math.floor(i/4)+1);
        }
        var m = 4; //配件标识
        for (var i = 0; i < this.layerCol; i++) {
            var r = Math.floor(Math.random() * 4);
            var $child = childrens.eq(i*4 + r);
            $child.addClass('icon-'+(++m)).attr('type', 'car').attr('data-m', m);

            m = (m === 5 ? 0 : m);
        }
    };

    Game.prototype.isNextRow = function(index, did, element) {
        var tg;
        if (index < 10 && (index+1) === did) {
            tg = element.prev().prev().prev().prev();
        }

        if (index == 10 && did == 1) {
            var parent = element.parent();
            var curId = element.index();
            var sibling = parent.siblings("div[id^='gameLayer']");

            tg = sibling.find('div').eq(40-4+curId);
        }

        if (tg && tg.attr('type') == "car") {
            this.tg = tg;
            return true;
        }

        return false;

    };

    Game.prototype.eventHandler = function () {

        var _this = this;

        var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

        $layer.bind(isTouch, function (e) {
            if (_this.isOver) {
                return ;
            }

            if (isUse) {
                $("body").popup("亲~您的券已经使用啦，您不能再玩啦~");
                return ;
            }

            if (_this.todayRemain === 0) {
                $("body").popup("亲~您已经没有游戏机会咯，您不能再玩啦");
                return ;
            }

            var $target = $(e.target);
            var type = $target.attr('type');
            var did = parseInt($target.attr('data-index'));

            if (type === "car" && _this.index == did || _this.isNextRow(_this.index, did, $target)) {

                _this.playAudio(videoTap);

                if (!(type === "car" && _this.index == did)) {
                    $target = _this.tg;
                }

                if (!_this.gameplay) {
                    _this.gameplay = true;
                    _this.timeHandle();
                }
                var m = $target.attr('data-m');

                if (m === "5") {
                    _this.point++;
                    $gameSuc.css({left: $target.offset().left+20, top: $target.offset().top-100});
                    $gameSuc.fadeIn();
                    $target.addClass('icon-'+m+m);
                    setTimeout(function(){
                        $gameSuc.fadeOut();
                    }, 500);
                } else {
                    $target.addClass('icon-'+m+m);
                }
                _this.nextRow();
            } else if (_this.index == did && _this.gameplay) {
                $target.addClass('icon-6 animate');
                timeStatus = true;
                _this.gameOver(1);
            }
        });
    };

    Game.prototype.nextRow = function() {
        this.index = (1 == this.index-- ? this.layerCol : this.index);
        for (var i = 0; i < gameLayerList.length; i++) {
            var gamelayer = gameLayerList[i];
            var offset_y = parseInt(gamelayer.attr('offset_y')) + this.blockWidth;
            gamelayer.attr('offset_y', offset_y );
            if (offset_y >= this.layerHeight) {
                offset_y = -this.layerHeight;
                gamelayer.css({"-webkit-transform": "translate3d(0px, "+ offset_y +"px, 0px)",
                    "transition": "0"});
                gamelayer.attr('offset_y', offset_y );
                this.freshLayer(gamelayer);
            } else {
                gamelayer.css({"-webkit-transform": "translate3d(0px, "+ offset_y +"px, 0px)",
                    "transition": "100ms"});
            }
        }
    };

    Game.prototype.gameOver = function (type) {
        var _this = this;

        _this.isOver = true;

        if (_this.config.maxPoint > 0 && _this.config.maxPoint <= _this.point) {
            _this.point = _this.config.maxPoint;
        }

        _this.playAudio(videoEnd);

        _this.gamePlay(function(result) {
            $gameResultLayer.find(".game-remain i").text(_this.todayRemain);
            if (type == 1) {  //失败结束
                if (!_this.userinfo || _this.point - _this.userinfo.Point > 0) {   //用户还没存在或分数高于当前分数
                    $gameResultLayer.find("#gameResult").text(_this.point);
                    if (result.TotalCount == 0) {
                        var beatRatio = "100%";
                    } else {
                        var beatRatio = Math.floor(100*result.BeatCount/result.TotalCount) + "%";
                    }
                    if (_this.userinfo) {
                        $gameResultLayer.find("#currentRank").text("当前排名第"+result.MyInfo.No+",击败了全国"+beatRatio+"的对手!");
                    } else {
                        $gameResultLayer.find("#currentRank").text("击败了全国"+beatRatio+"的对手!");
                    }
                    $gameResultLayer.find('#resultContainer_1').show();
                    $gameResultLayer.find('#resultContainer_2').hide();
                }else {
                    $gameResultLayer.find("#currentRank").text("当前排名第"+result.MyInfo.No+",低于你当前最高记录！");
                    $gameResultLayer.find("#gameResult").text(_this.point);
                    $gameResultLayer.find('#resultContainer_1').hide();
                    $gameResultLayer.find('#resultContainer_2').show();
                }

                setTimeout(function() {
                    _this.changePage('result');
                    $gameTime.removeClass('animate');
                    _this.restart();
                }, 1000);
            }
        });
    };

    Game.prototype.gamePlay = function (callback) {
        var _this = this;
        curScore = _this.point;
        _this.ajax.play(_this.point, function(result) {
            console.log(result);

            _this.templateRank(result.Rank, _this.userinfo, result.TotalCount);
            _this.todayRemain = result.Status.TodayRemainCount;

            $remain.text(_this.todayRemain);

            callback && callback(result);
        });
    };

    Game.prototype.gameUse = function ($em) {
        var _this = this;
        if (_this.config.code == $em.val()) {
            $("body").popup("兑换成功");
            _this.ajax.use(function() {  //@这个id
                $em.parent().text('已兑奖').removeClass('content-use').addClass('content-used');
            });
            isUse = true;
        } else {
            $("body").popup("亲~此处由经销商输入哦~请正确输入~");
        }
    };

    Game.prototype.templateRank = function (ranklist, myinfo, total) {
        $rankList.html("");
        var html = "";

        $.each(ranklist, function(index, value) {
            html += '<li><span class="list-1"><i class="rank">'+value.No+'</i></span>' +
                '<span class="list-2">'+value.Name+'</span><span class="list-3">'+value.MobilePhone+'</span> ' +
                '<span class="list-4">'+value.Point+'</span></li>';
        });
        $rankList.append(html);

        if (myinfo) {
            $rankMy.html('<li><span class="list-1"><i class="rank">'+myinfo.No+'</i></span>'+
                '<span class="list-2">'+myinfo.Name+'</span><span class="list-3">'+myinfo.MobilePhone+'</span>' +
                '<span class="list-4">'+myinfo.Point+'</span></li>').show();
        } else {
            $rankMy.hide();
        }

        $title.text("当前" + total + "人在玩");
    };

    Game.prototype.myinfoPage = function (myinfo) {
        if (myinfo) {
            $myPage.find('.title').show();
            $myPage.find('.point').text(myinfo.Point + '辆');
            $myPage.find('.name').text(myinfo.Name);
            $myPage.find('.phone').text(myinfo.MobilePhone);
            if (myinfo.IsUse) {
                $myPage.find('.content-use').hide();
                $myPage.find('.content-used').show();
            } else {
                $myPage.find('.content-use').show();
                $myPage.find('.content-used').hide();
            }
            $myPage.find("#myContainer_1").show();
            $myPage.find("#myContainer_2").hide();
        } else {
            $myPage.find('.title').hide();
            $myPage.find('.point').text('亲.你还没开始玩~');
            $myPage.find("#myContainer_2").show();
            $myPage.find("#myContainer_1").hide();
        }
    };

    Game.prototype.gameOutcome = function () {
        var _this = this;
        _this.ajax.outcome(function(result) {

            _this.todayRemain = result.Status.TodayRemainCount;
            _this.userinfo = result.MyInfo;
            if (_this.userinfo != null) {
                isUse = _this.userinfo.IsUse;
            }
            _this.templateRank(result.Rank, result.MyInfo, result.TotalCount);
            _this.myinfoPage(result.MyInfo);

            $remain.text(_this.todayRemain);
        });
    };

    Game.prototype.creatTimeText = function(n) {
        var text = (100000 + n + '').substr(-4, 4);
        text = text.substr(0, 2) + "'" + text.substr(2) + "''";
        return text;
    };

    Game.prototype.gameSignup = function () {
        var _this = this;
        console.log(curScore)
        _this.ajax.signup(curScore, function(result) {
            console.log(result);

            _this.userinfo = result.MyInfo;
            _this.myinfoPage(result.MyInfo);
            _this.templateRank(result.Rank, _this.userinfo, result.TotalCount);

            _this.changePage('my');
        });
    };

    Game.prototype.playAudio = function (audio) {
        audio.play();
    };
})(Zepto);

//排行榜高度
function rankHeight() {
    var windowHei = $(window).height();

    var bottom = $("#footer").height();
    var top = $("#rankList").offset().top;
    var my = $("#rankMy").height() + 15;

    $("#rankList").height(windowHei- bottom - top - my);
}