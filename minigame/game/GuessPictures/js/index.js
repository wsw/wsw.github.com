/**
 * 猜图游戏
 * Created by weishuwen on 2014/12/11.
 */

(function ($, undefined) {

    var Guess = function (data) {

        this.list = [];   // 基本的数据集合
        this.card = [];   // 用来操作的数据集合
        this.limitX = 6;  // 备选答案的 二维 数据
        this.limitY = 2;

        this.index = 0;  // 当前的关卡
        this.error = 3;  // 当前的分数

        this.limit = this.limitX * this.limitY;

        this.curName = "";
        this.curLength = 0;
        this.selectNumber = 0;
        this.selectName = [];
        this.isSubmit = false;
        this.isUse = false;
        this.isTime = false;
        this.isPass = false;

        this.ajax = data.ajax;
        this.config = data.config;
        this.outCome = data.result;
    };

    window.Game = function (data) {
        var guess = new Guess(data);
        guess.init();
    };

    var $selectModel = $(".select-model");
    var $resultModel = $(".result-model");
    var $gameMain = $(".game");
    var $back = $("#back");
    var $index = $(".index");
    var $main = $(".main");
    var $rank = $(".rank");
    var $myGift = $(".my");
    var $submit = $(".submit");
    var $guide = $(".guide");
    var $gitfcontent = $('.giftcontent');

    var $nav = $(".main nav");
    var $share = $(".share");

    var $gameTip = $("#gameTip");
    var $gameImg = $("#gameImg");
    var $Number = $(".Number");
    var $rankCT = $("#rankContent");
    var $myRank = $("#myRank");
    var $allCount = $(".AllCount");

    var $fail = $("#fail");
    var defaultSelect = "云程科技金幸运不怕周天王";

    Guess.prototype = {
        init: function () {
            var _this = this;
            _this.list = gameData.list;
            _this.gameOutcome();
            _this.start();
            _this.bindBodyEvent();
            _this.bindEventHandler();
        },
        /**
         * 处理数据相关的，本地是否有缓存，URL是否有number
         * 产生错位的答题序号
         */
        start: function () {
            var i, lg = this.list.length;

            // 先判断本地是否已经有缓存了。
            if (localStorage.getItem('card') && localStorage.getItem('index')) {
                this.card = JSON.parse(localStorage.getItem('card'));
                this.index = window.parseInt(localStorage.getItem('index'));
            } else {
                // 打乱顺序继续存在card中
                var temp = this.cloneArr(this.list);
                var l = temp.length, idx;
                while (l) {
                    l -= 1;
                    idx = Math.floor(Math.random() * l);
                    this.card.push({
                        name: temp[idx].Name,
                        id: temp[idx].Id,
                        enable: 0,
                        tip: temp[idx].Keys,
                        image: temp[idx].Image
                    });
                    temp.splice(idx, 1);
                }
                // 获取URL是否有地址传过来
                var number = this.getParamByUrl('levelId');
                if (number) {
                    var flag = true, length = this.card.length;
                    for (i = 0; i < length && flag; i++) {
                        if (this.card[i].id == number) {
                            flag = false;
                            var tempOne = this.card[i];
                            this.card[i] = this.card[0];
                            this.card[0] = tempOne;
                        }
                    }
                }
                // 加入本地缓存中
                localStorage['card'] = JSON.stringify(this.card);
                localStorage['index'] = this.index;
            }

            this.gameNext();
        },
        gameNext: function () {
            // this.index
            var _this = this;

            if (this.index >= this.card.length) {
                $Number.parent().text('已通关');
                _this.ajax.setPass();
                $('body').popup("您已经通关了，请提交您的信息去领取您的奖品！");
                $gameMain.find('.result-model, .select-model, .main-tip').hide()
                $gameMain.append('<p style="margin-top: 60px; color: white; text-align: center; padding: 0 30px; ">您已成功通关，建议收藏游戏，于1月4-6日，在“我的礼品”页面进入抽奖游戏。</p>');
                $gameImg.attr('src', _this.config.root + '/App_Content/Game/GuessPictures/css/images/default.jpg');
                if (!_this.isSubmit) {
                    _this.showSubmitPage();
                } else {
                    _this.showMyGiftPage();
                    if (_this.isTime) {
                        $myGift.find('a').show();
                    }
                }
                return;
            }

            var cardLg = _this.card.length;
            for (var i = 0; i < cardLg; i++) {
                _this.card[i].enable = 0;
            }
            var select = _this.card[_this.index].name;
            _this.card[_this.index].enable = 1;

            if (cardLg >= 6) {
                while (select.length < _this.limit) {
                    var r = _this.randomNum();
                    if (_this.card[r].enable == 0) {
                        select += _this.card[r].name;
                        _this.card[r].enable = 1;
                    }
                }
            } else {
                select += defaultSelect;
            }

            // 创建一个临时的数组用来保存乱位的
            var selectArr = select.split("").slice(0, this.limit);
            var tempSelect = "";
            while (selectArr.length) {
                var tr = Math.floor(Math.random() * selectArr.length);
                tempSelect += selectArr.splice(tr, 1)[0];
            }

            console.log(_this.index);
            console.log("answer:" + _this.card[_this.index].name + "length" + _this.card[_this.index].name.length);
            console.log(tempSelect);

            //$('body').popup(_this.card[_this.index].image)
            $gameImg.attr('src',_this.config.root + _this.card[_this.index].image);
            $gameTip.text(_this.card[_this.index].tip);

            _this.setSelectTemplate(tempSelect);
            _this.setResultModel(_this.card[_this.index].name);

            $Number.text(_this.index+1);
            initShare(shareTitle, shareContent, shareImage, shareUrl +'&levelId='+_this.card[_this.index].id, shareAppId);

        },
        setSelectTemplate: function (str) {
            var html = "", lg = str.length;
            for (var i = 0; i < lg; i++) {
                html = html + "<span>" + str[i] + "</span>"
            }
            $selectModel.html(html);
        },
        setResultModel: function (str) {
            this.curName = str;
            var html = "", lg = this.curLength = str.length;
            for (var i = 0; i < lg; i++) {
                html = html + "<span>&nbsp;</span>";
            }
            $resultModel.html(html);
        },
        bindEventHandler: function () {
            var _this = this;
            var isTouch = 'ontouchstart' in document ? "touchstart" : 'click';
            $selectModel.on(isTouch, 'span', function () {
                if ($(this).hasClass('selected')) {
                    return;
                }
                if (_this.error <= 0) {
                    $('body').popup("您已经没有机会了，您可以提交成绩，或者分享给好友，好友点击即可获取机会!");
                    if (!_this.isSubmit) {
                        _this.showSubmitPage();

                    } else {
                        _this.showMyGiftPage();
                    }
                    return;
                }

                $(this).addClass('selected');
                _this.selectName.push($(this).text());
                $resultModel.find('span').eq(_this.selectNumber).text($(this).text());
                _this.selectNumber++;

                if (_this.selectNumber === _this.curLength) {
                    if (_this.selectName.join("") == _this.curName) {
                        // _this.score += _this.curGrade;
                        _this.index++;
                        localStorage['index'] = _this.index;
                        if (_this.index < _this.card.length) {
                            $('body').popup('恭喜您答对了，现在进入下一题！'+ '还剩'+(_this.card.length - _this.index)+'关');
                        }
                        _this.gameNext();
                    } else {
                        //提交分数
                        _this.ajax.play(_this.index);

                        // 答错处理
                        _this.error--;
                        if (_this.error <= 0) {
                            $('body').popup("您已经没有机会了，您可以提交成绩，或者分享给好友，好友点击即可获取机会!");
                            if (!_this.isSubmit) {
                                _this.showSubmitPage();
                            } else {
                                _this.showMyGiftPage();
                                if(_this.isUse){
                                    _this.giftHtml(3);
                                }else{
                                    _this.giftHtml(2);
                                }
                            }
                        } else {
                            //$('body').popup('您只剩下'+ _this.error +'次机会了');

                            $fail.show().find('span').text(_this.error);
                            $resultModel.find('span').html("&nbsp;");
                            $selectModel.find('span').removeClass('selected');
                        }
                        /*
                        if (confirm('你答错了，是否跳过本题!')){
                            _this.gameNext();
                        } else {
                            $resultModel.find('span').html("&nbsp;");
                            $selectModel.find('span').removeClass('selected');
                        }*/
                    }

                    _this.selectName = [];
                    _this.selectNumber = 0;
                }
            });

            $("#giftSubmit").on("click", function () {
                if ($("#Province").val() == "") {
                    $('body').popup('请选择省份！');
                    return false;
                }

                if ($("#city").val() == "") {
                    $('body').popup('请选择城市！');
                    return false;
                }

                if ($("#selTenant").val() == "") {
                    $('body').popup('请选择经销商！');
                    return false;
                }

                if ($("#codeva").val() == "") {
                    $('body').popup('请输入兑换码！');
                    return false;
                }


                if ($("#Code").val() == $("#codeva").val()) {
                    _this.ajax.use($("#Province").find("option:selected").text(), $("#city").find("option:selected").text(), $("#selTenant").find("option:selected").text(), function () {
                        _this.showMyGiftPage();
                        _this.giftHtml(3);
                    });
                } else {
                    $('body').popup('您输入的兑换码不正确！');
                }

            });

            $("#signup").on("click", function () {
                var name = $("#UserName").val().trim();
                if (name.length == 0) {
                    $('body').popup('亲~姓名不能为空哦~');
                    return false;
                }
                var mobilePhone = $("#PhoneNumber").val();
                if (mobilePhone.length == 0) {
                    $('body').popup('亲~电话号码不能为空哦~');
                    return false;
                }
                var mobilePhoneReg = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|14[57])[0-9]{8}$");
                if (!mobilePhoneReg.test(mobilePhone)) {
                    $('body').popup('亲~电话号码错啦，请重新输入哦~');
                    return false;
                }

                _this.ajax.signup(name, mobilePhone, function () {
                    $('body').popup("提交成功！");
                    _this.showMyGiftPage();
                    _this.giftHtml(2);
                    if (_this.index >= _this.card.length) {
                        if (_this.isTime) {
                            $myGift.find('a').show();
                        }
                    }
                });
            });

            $resultModel.on(isTouch, 'span', function () {
                var index = $(this).index();
                console.log(index);
                if (index < _this.selectNumber) {
                    _this.selectNumber--;
                    var tem = _this.selectName.splice(index, 1);
                    $selectModel.find('.selected').each(function () {
                        if ($(this).text() == tem[0]) {
                            $(this).removeClass('selected');
                            return;
                        }
                    });
                    $resultModel.find('span').html("&nbsp;").each(function (index, value) {
                        if (index < _this.selectNumber) {
                            $(this).html(_this.selectName[index]);
                        }
                    });
                }
            });
        },
        randomNum: function () {
            return Math.round(Math.random() * 1000) % this.list.length;
        },
        getParamByUrl: function (key) {
            var url = location.search;
            if (url.indexOf("?") !== -1) {
                var params = url.substr(1).split('&');
                for (var i = 0; i < params.length; i++) {
                    if (params[i].split('=')[0] === key) {
                        return params[i].split('=')[1];
                    }
                }
            }
            return null;
        },
        bindBodyEvent: function () {
            var _this = this;
            $('body').on('click', function (e) {
                var ac = e.target.getAttribute('data-action');
                switch (ac) {
                    case "guide":
                        _this.showGuidePage();
                        break;
                    case "rank":
                        _this.showRankPage();
                        break;
                    case "game":
                        _this.showMainPage();
                        break;
                    case "my":
                        _this.showMyGiftPage(0);
                        break;
                    case "submit":
                        _this.showSubmitPage();
                        break;
                    case "back":
                        _this.showIndexPage();
                        break;
                    case "share":
                        _this.showSharePage();
                        break;
                    case "check":
                        $(e.target).parents('.guide').hide();
                        $('.giftcontent').show();

                        var imgs = $(".giftcontent").find('img');

                        imgs.hide().each(function (index, value) {
                            (function (_this, ix) {
                                setTimeout(function () {
                                    $(_this).show().addClass('animated zoomIn');
                                }, ix * 1000);
                            })(this, index);
                        });
                        setTimeout(function() {
                            imgs.removeClass('animated zoomIn');
                        }, 1000*imgs.length);
                        break;
                    case "clear":
                        //localStorage.clear();
                        break;
                    default:
                        break;
                }
            });
        },
        hidePage: function () {
            $gameMain.hide();
            $rank.hide();
            $myGift.hide();
            $submit.hide();
            $guide.hide();
            $index.hide();
            $back.hide();
            $main.hide();
            $gitfcontent.hide();
        },
        showRankPage: function () {
            this.hidePage();
            $main.show();
            $nav.find("span").removeClass('active').eq(1).addClass('active');
            $back.show();
            $rank.show();
        },
        showMainPage: function () {
            this.hidePage();
            $main.show();
            $nav.find("span").removeClass('active');
            $gameMain.show();
        },
        showSubmitPage: function () {
            this.hidePage();
            $main.show();
            $back.show();
            $submit.show();
        },
        showMyGiftPage: function () {
            this.hidePage();
            $main.show();
            $nav.find("span").removeClass('active').eq(2).addClass('active');
            $back.show();
            $myGift.show();
        },
        giftHtml:function(status){
            $myGift.find('#noGift,#hasGift,#unHasGift').hide();
            //无礼品
            if (status == 1) {
                $("#noGift").show();
            }
            //有礼品，未兑奖
            else if(status == 2) {
                $("#hasGift").show();
            }
            //有礼品，已兑奖
            else if(status == 3){
                $("#unHasGift").show();
            }
        },
        showGuidePage: function () {
            this.hidePage();
            $main.show();
            $nav.find("span").removeClass('active').eq(0).addClass('active');
            $back.show();
            $guide.show();
        },
        showIndexPage: function () {
            this.hidePage();
            $index.show();
        },
        showSharePage: function () {
            $share.show();
        },
        gameOutcome: function () {
            var _this = this;
            var result = _this.outCome;
            _this.getRankList(result.Ranks);
            _this.getMyRank(result.MyRank);
            $allCount.html(result.Count);
            _this.error = result.RemainCount;
            _this.isSubmit = result.IsSubmit;
            _this.isUse = result.IsUse;
            _this.isTime = result.IsTime;
            _this.isPass = result.IsPass;

            if(_this.isSubmit&&result.IsUse){
                _this.giftHtml(3)
            }else if(_this.isSubmit&&!result.IsUse){
                _this.giftHtml(2)
            }else{
                _this.giftHtml(1)
            }
/*            if(!result.IsUse){
                $("#giftSubmit").show();

            } else {
                $(".unHasGift").show();
            }*/
        },
        getRankList: function (data) {
            var html = "";
            var _this = this;
            $.each(data, function (index, value) {
                if (index === 0) {
                    html = html + '<li><span class="row-1 color-red">' + 1 + '</span>';
                } else if (index === 1) {
                    html = html + '<li><span class="row-1 color-orange"> ' + 2 + ' </span>';
                } else if (index === 2) {
                    html = html + '<li><span class="row-1 color-yellow"> ' + 3 + ' </span>';
                } else {
                    html = html + '<li><span class="row-1">' + (index + 1) + '</span>';
                }
                html = html + '<span class="row-2"> ' + value.Name + ' </span>';
                html = html + '<span class="row-3"> ' + value.MobilePhone.substring(0,3) + '****'+value.MobilePhone.substring(7,11)+'</span>';
                html = html + '<span class="row-4"> ' + _this.list.length + ' </span>';
                html = html + '</li>';
            });
            $rankCT.html(html);


        },
        getMyRank: function (data) {
            var _this = this;
            var h = '';

            if (data != null) {
                h += '<li>';
                h += '<span class="row-1"> ' + data.MyNo + '  </span>';
                h += '<span class="row-2"> ' + data.Name + ' </span>';
                h += '<span class="row-3"> ' + data.MobilePhone.substring(0,3) + '****'+data.MobilePhone.substring(7,11)+' </span>';
                h += '<span class="row-4"> ' + _this.list.length + ' </span>';
                h += '</li>';
            }

            $myRank.html(h);
        },
        cloneArr: function (arr) {
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                temp.push(arr[i]);
            }
            return temp;
        }
    }

})(jQuery);
