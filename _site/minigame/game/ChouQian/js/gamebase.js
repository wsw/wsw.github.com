/**
 * Created by weishuwen on 2014/10/9.
 * 礼品类游戏的基类， 主要实现了大部分的ajax操作
 * 游戏次数 count
 * 中大奖 bigGift
 * 奖品等级 rank
 * 奖品标题 title
 */

var GameBase = function () {
    this._super = this;   //父类
    this.count = 0;
    this.bigGift = false;
    this.rank = 0;
    this.title = "";
    this.myPoint = 0;
    this.gameClearlPoint = 0;
};

GameBase.prototype = {
    _init: function (data) {
        this.ajax = data.ajax;
        this.config = data.config;
    },
    outcome: function (callback) {
        var _this = this;
        _this.ajax.outcome(function(result) {

            _this.count = result.Status.TodayRemainCount;
            _this.bigGift = result.Status.WinBigGift;
            _this.myPoint = result.Status.MyPoint;
            _this.gameClearlPoint = result.Status.GameClearlPoint;

            if (result.NextGift) {
                _this.rank = result.NextGift.GiftRank + 1;
                _this.title = result.NextGift.GiftTitle;
            } else {
                _this.rank = 0;
                _this.title = "";
            }

            callback && callback(result);
        });
    },
    play: function (callback) {
        var _this = this;
        _this.ajax.play(function(result){

            if (result.NextGift) {
                _this.rank = result.NextGift.GiftRank + 1;
                _this.title = result.NextGift.GiftTitle;
            } else {
                _this.rank = 0;
                _this.title = "";
            }

            _this.count = result.Status.TodayRemainCount;
            _this.bigGift = result.Status.WinBigGift;
            _this.myPoint = result.Status.MyPoint;
            _this.gameClearlPoint = result.Status.GameClearlPoint;

            callback && callback(result);
        });
    },
    signup: function (callback) {
        var _this = this;
        _this.ajax.signup( function (result) {

            _this.bigGift = result.Status.WinBigGift;

            callback && callback(result);
        });
    },
    use: function (id, callback) {
        var _this = this;
        _this.ajax.use(id, function(result) {
            callback && callback(result);
        });
    }
};

var tipObject = {
    over : "亲~您已经没有游戏机会咯，您不能再玩啦~",
    username: "亲~请输入姓名",
    phonenumber: "亲~请输入手机号",
    phoneerror: "'亲~电话号码错啦，请重新输入哦~'",
    pointmore: "亲，您需要更多的积分才能再玩一次哦~"
};

function preLoadImg(list, callback) {
    var lg = list.length;
    var count = 0;
    for (var i = 0; i < lg; i++) {
        (function(index) {
            var img = new Image();
            img.src = list[index];
            img.onload = function () {
                if (++count == lg) {
                    callback && callback();
                }
            };
        })(i);
    }
};