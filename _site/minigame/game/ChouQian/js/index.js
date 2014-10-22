/**
 * Created by weishuwen on 2014/10/9.
 *
 * 摇一摇 类 的 游戏
 */

(function() {

    var Game = function (data) {
        this._super._init(data);

        //游戏配置属性
        this.curRank = 0;
        this.curTitle = "";
        this.curRandom = "";

        this.playGame = false;
    };
    Game.prototype = new GameBase();  // 继承
    Game.prototype.constructor = Game;

    window.Game = function(data){
        var game = new Game(data); //创建对象
        game.init();
    };

    var $indexPaly = $(".index-play");
    var $mask = $("#mask");
    var $show = $("#show");
    var $success = $("#success");
    var $fail = $("#fail");
    var $count = $("#count");
    var $myGift = $("#myGift");
    var $username = $("#Name");
    var $phoneNumber = $("#MobilePhone");
    var zh = ['零','一','二','三','四','五','六','七','八','九'];
    var resultName = [
        ["三十九", "五十五"],
        ["六十六", "八十一"],
        ["三十六", "八十八"],
        ["零九", "十六"],
        ["三十三", "九十九"],
        ["二十五", "一百"],
        ["零三","十五","二十二","三十一","五十二","六十三","八十九","九十二"]
    ];
    var resultType = ["上上签", "上签", "中平签"];
    var cqAduio = new Audio("/App_Content/Game/ChouQian/css/audio/chouqian.mp3");

    Game.prototype.init = function () {
        this.initData();
        this.motionHandler();
        this.eventHandler();
    };

    Game.prototype.initData = function () {
        var _this = this;

        _this.outcome(function(result) {
            $count.text(_this.count);
            $myGift.html(template.rewardList(result.MyGift));
            _this.curRank =_this.rank ;
            _this.curTitle = _this.title;
        });
    };

    Game.prototype.eventHandler = function () {
        var _this = this;
        var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
        $("body").bind(isTouch, function(e) {

            var action = $(e.target).attr('data-action');

            if (action === "restart") {
                $(e.target).parent().parent().hide();
                $mask.css('display', 'none');
            }
            if (action === "submit") {

                if ($username.val() == "") {
                    $('body').popup(tipObject.username);
                    return ;
                }

                if ($phoneNumber.val() == "") {
                    $('body').popup(tipObject.phonenumber);
                    return ;
                }
                var mobilePhoneReg = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|14[57])[0-9]{8}$");
                if (!mobilePhoneReg.test($phoneNumber.val())) {
                    $('body').popup(tipObject.phoneerror);
                    $phoneNumber.focus();
                    return false;
                }
                _this.resultSubmit(function () {
                    $(e.target).parent().parent().hide();
                    $mask.css('display', 'none');
                });
            }
            if (action === "use") {
                var iptCode = $(e.target).parent().find('input').val();
                if (_this.config.code == iptCode) {
                    _this.use($(e.target).attr('data-id'), function() {
                        $("body").popup('亲，兑奖成功！');
                        $(e.target).parent().removeClass('ipt').addClass('ipt-used').text('已兑奖')
                    });
                } else {
                    $("body").popup('亲~此处由经销商输入哦~请正确输入~');
                }
            }
            if (action === "close") {
                $(e.target).parent().parent().hide();
                $("footer .block-2 div").removeClass('active');
            }
        });
    };

    Game.prototype.removeMotion = function() {
        window.removeEventListener('devicemotion', this.motion);
    };

    Game.prototype.motionHandler = function () {
        var _this = this;

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion',deviceMotionHandler, false);
        }
        var SHAKE_THRESHOLD = 800;
        var last_update = 0;
        var x, y, z, last_x, last_y, last_z;

        this.motion = deviceMotionHandler;

        function deviceMotionHandler(eventData) {

            if (_this.playGame) {
                return ;
            }

            if (_this.myPoint < _this.gameClearlPoint) {
                $("body").popup(tipObject.pointmore);
                return ;
            }

            var acceleration = eventData.accelerationIncludingGravity;
            //alert(newDate().getTime());
            var curTime = new Date().getTime();

            // alert(curTime - last_update);
            if ((curTime - last_update)> 300) {

                var diffTime = curTime -last_update;
                last_update = curTime;

                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;

                var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;

                if (speed > SHAKE_THRESHOLD) {
                    _this.playGame = true;
                    if (parseInt(_this.count) === 0) {
                        $('body').popup(tipObject.over);
                        setTimeout(function() {
                            _this.playGame = false;
                        }, 1000);
                    } else {
                        _this.playAudio();
                        setTimeout(function() {
                            _this.show();
                            _this.playGame = false;
                        }, 3000);
                        $indexPaly.addClass('active');
                    }
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        }

        /*模拟事件*/
//        $(".index-play").click(function() {
//
//            if (_this.playGame) {
//                return ;
//            }
//
//            _this.playGame = true;
//            if (parseInt(_this.count) === 0) {
//                $('body').popup(tipObject.over);
//                setTimeout(function() {
//                    _this.playGame = false;
//                }, 1000);
//            } else {
//                setTimeout(function() {
//                    _this.show();
//                    _this.playGame = false;
//                }, 3000);
//                $indexPaly.addClass('active');
//            }
//        });
    };

    Game.prototype.show = function () {
        var _this = this;
        $mask.css('display', 'block');
        _this.curRandom = _this.getRandomName(_this.curRank);
        $show.find(".show-center p").text(_this.getRandomName(_this.curRank));
        if (parseInt(_this.curRank) === 0) {
            setTimeout(function() {
                $show.hide();
                $indexPaly.removeClass("active");
                _this.fail();

                _this.curRank =_this.rank ;
                _this.curTitle = _this.title;

            }, 3000);
        } else {
            setTimeout(function() {
                $show.hide();
                $indexPaly.removeClass("active");
                _this.success();

                _this.curRank =_this.rank ;
                _this.curTitle = _this.title;

            }, 3000);
        }
        $show.show();
        this.gamePlay();
    };

    Game.prototype.success = function () {
        var _this = this;
        $success.find('.title').text(_this.curRandom + " " + _this.getRandomType(_this.curRank));
        $success.find('h1 span').text(_this.getZH(_this.curRank));
        $success.find('h2').text(_this.curTitle);

        if (_this.count === 0) {      //隐藏再玩一下
            $success.find('.btn a').eq(1).hide();
        }

        $success.show();
    };

    Game.prototype.fail = function () {
        var _this = this;

        $fail.find('.title').text(_this.curRandom + " " + _this.getRandomType(_this.curRank));
        $fail.show();
    };

    Game.prototype.gamePlay = function () {
        var _this = this;
        _this.play(function(result) {

            // 显示次数的变化
            $count.text(_this.count);
        });
    };
    Game.prototype.resultSubmit = function (callback) {
        var _this = this;
        _this.signup(function(result) {
           //提交成绩后处理
            callback && callback();
            $myGift.html(template.rewardList(result.MyGift));

        });
    };
    Game.prototype.getZH = function (num) {
        var str ="";
        num += "";
        var l = num.length;
        for (var i = 0; i < l; i++) {
            str += zh[num[i]];
            if (l == 3) {
                if (i == 0) {
                    str += "百";
                } else if(i == 1) {
                    str += "十";
                }
            } else if(l == 2)  {
                if (i == 0) {
                    str += "十";
                }
            }
        }
        return str + "等奖";
    };
    Game.prototype.getRandomName = function (rank) {
        rank = rank > 6 ? 6 : rank;
        var lg = resultName[rank].length;
        var id = Math.floor(Math.random()*lg);
        return "第" + resultName[rank][id] + "签";
    };
    Game.prototype.getRandomType = function(rank) {
        if (parseInt(rank) === 0) {
            return resultType[2];
        } else {
            if (parseInt(rank) > 4) {
                return resultType[1];
            } else {
                return resultType[0];
            }
        }
    };
    Game.prototype.playAudio = function () {
        cqAduio.play();
    };

    var template = {
        rewardList: function (items) {
            var html = "";
            $.each(items, function(index, value) {
                if (!value.IsUse) {
                    html += '<div class="wrap">';
                    html += '<h1>'+ value.GiftTitle +'</h1>';
                    html += '<div class="ipt"><input type="text" placeholder="由经销商输入验证码"/>';
                    html += '<a href="#" data-action="use" data-id="'+value.GiftId+'">兑奖</a></div></div>';
                } else {
                    html += '<div class="wrap">';
                    html += '<h1>'+ value.GiftTitle +'</h1>';
                    html += '<div class="ipt-used">已兑奖</div></div>';
                }
            });
            return html;
        }
    }
})();