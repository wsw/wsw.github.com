var card = [],
    goto1, error = 10,
    errorIndex, errorTemp;
var list = [
    {
        name: '合金弹头',
        id: '合金弹头'
    },
    {
        name: '荷兰皇家航空',
        id: '荷兰皇家航空'
    },
    {
        name: '虎胆龙威',
        id: '虎胆龙威'
    },
    {
        name: '花旗银行',
        id: '花旗银行'
    },
    {
        name: '华尔街',
        id: '华尔街'
    },
    {
        name: '华硕',
        id: '华硕'
    },
    {
        name: '黄飞鸿',
        id: '黄飞鸿'
    },
    {
        name: '回力',
        id: '回力'
    },
    {
        name: '饥饿游戏',
        id: '饥饿游戏'
    },
    {
        name: '机器人历险记',
        id: '机器人历险记'
    },
    {
        name: '机械迷城',
        id: '机械迷城'
    },
    {
        name: '极地特快',
        id: '极地特快'
    },
    {
        name: '监狱兔',
        id: '监狱兔'
    },
    {
        name: '劲量',
        id: '劲量'
    },
    {
        name: '京东商城',
        id: '京东商城'
    },
    {
        name: '景德镇',
        id: '景德镇'
    },
    {
        name: '九色鹿',
        id: '九色鹿'
    },
    {
        name: '狙击电话亭',
        id: '狙击电话亭'
    },
    {
        name: '卡卡西',
        id: '卡卡西'
    },
    {
        name: '凯迪拉克',
        id: '凯迪拉克'
    },
    {
        name: '康熙来了',
        id: '康熙来了'
    },
    {
        name: '柯达',
        id: '柯达'
    },
    {
        name: '克林顿',
        id: '克林顿'
    },
    {
        name: '空中客车',
        id: '空中客车'
    },
    {
        name: '拉萨',
        id: '拉萨'
    },
    {
        name: '拉斯维加斯',
        id: '拉斯维加斯'
    },
    {
        name: '兰博基尼',
        id: '兰博基尼'
    },
    {
        name: '了不起的狐狸爸爸',
        id: '了不起的狐狸爸爸'
    },
    {
        name: '料理鼠王',
        id: '料理鼠王'
    },
    {
        name: '乱世佳人',
        id: '乱世佳人'
    },
    {
        name: '罗永浩',
        id: '罗永浩'
    },
    {
        name: '洛杉矶',
        id: '洛杉矶'
    },
    {
        name: '洛阳',
        id: '洛阳'
    },
    {
        name: '绿箭侠',
        id: '绿箭侠'
    },
    {
        name: '马刺',
        id: '马刺'
    },
    {
        name: '绿野仙踪',
        id: '绿野仙踪'
    },
    {
        name: '马戏团',
        id: '马戏团'
    },
    {
        name: '麦当娜',
        id: '麦当娜'
    },
    {
        name: '麦克格雷迪',
        id: '麦克格雷迪'
    },
    {
        name: '猫和老鼠',
        id: '猫和老鼠'
    },
    {
        name: '猫女',
        id: '猫女'
    },
    {
        name: '美少女战士',
        id: '美少女战士'
    },
    {
        name: '梦工厂',
        id: '梦工厂'
    },
    {
        name: '米菲',
        id: '米菲'
    },
    {
        name: '鸣人',
        id: '鸣人'
    },
    {
        name: '摩登家庭',
        id: '摩登家庭'
    },
    {
        name: '魔女宅急便',
        id: '魔女宅急便'
    },
    {
        name: '尼古拉斯凯奇',
        id: '尼古拉斯凯奇'
    },
    {
        name: '逆世纪',
        id: '逆世纪'
    },
    {
        name: '纽约',
        id: '纽约'
    },
    {
        name: '诺丁山',
        id: '诺丁山'
    },
    {
        name: '皮克斯',
        id: '皮克斯'
    },
    {
        name: '屈臣氏',
        id: '屈臣氏'
    },
    {
        name: '热火',
        id: '热火'
    },
    {
        name: '水瓶',
        id: '水瓶'
    },
    {
        name: '喜旺',
        id: '喜旺'
    },
    {
        name: '大嘴猴',
        id: '大嘴猴'
    },
    {
        name: '人猿星球',
        id: '人猿星球'
    },
    {
        name: '锐步',
        id: '锐步'
    },
    {
        name: '三个和尚',
        id: '三个和尚'
    },
    {
        name: '三国杀',
        id: '三国杀'
    },
    {
        name: '山楂树之恋',
        id: '山楂树之恋'
    },
    {
        name: '少林足球',
        id: '少林足球'
    },
    {
        name: '少数派报告',
        id: '少数派报告'
    },
    {
        name: '射雕英雄传',
        id: '射雕英雄传'
    },
    {
        name: '生化危机',
        id: '生化危机'
    },
    {
        name: '天蝎',
        id: '天蝎'
    },
    {
        name: '星巴克',
        id: '星巴克'
    },
    {
        name: '反恐精英',
        id: '反恐精英'
    },
    {
        name: '十一罗汉',
        id: '十一罗汉'
    },
    {
        name: '双截龙',
        id: '双截龙'
    },
    {
        name: '水果忍者',
        id: '水果忍者'
    },
    {
        name: '死神',
        id: '死神'
    },
    {
        name: '苏格兰',
        id: '苏格兰'
    },
    {
        name: '速度与激情',
        id: '速度与激情'
    },
    {
        name: '台北',
        id: '台北'
    },
    {
        name: '泰迪熊',
        id: '泰迪熊'
    },
    {
        name: '泰格伍兹',
        id: '泰格伍兹'
    },
    {
        name: '坦克大战',
        id: '坦克大战'
    },
    {
        name: '淘宝',
        id: '淘宝'
    },
    {
        name: '天津',
        id: '天津'
    },
    {
        name: '天猫',
        id: '天猫'
    },
    {
        name: '天天向上',
        id: '天天向上'
    },
    {
        name: '铁拐李',
        id: '铁拐李'
    },
    {
        name: '同仁堂',
        id: '同仁堂'
    },
    {
        name: '兔斯基',
        id: '兔斯基'
    },
    {
        name: '哇哈哈',
        id: '哇哈哈'
    },
    {
        name: '汪涵',
        id: '汪涵'
    },
    {
        name: '旺旺',
        id: '旺旺'
    },
    {
        name: '微软',
        id: '微软'
    }
];
var importList = [
    {
        name: '家电',
        id: '10'
    },
    {
        name: '车位',
        id: '20'
    },
    {
        name: '4888',
        id: '30'
    },
    {
        name: '龙泽府',
        id: '40'
    },
    {
        name: '天恒置业',
        id: '50'
    },
    {
        name: '活水湖',
        id: '60'
    },
    {
        name: '天恒龙泽府',
        id: '70'
    },
    {
        name: '双中空玻璃',
        id: '80'
    },
    {
        name: '英国棕',
        id: '90'
    },
    {
        name: '康居示范工程',
        id: '100'
    }
];
var gameLength = list.length;
var limitX = 6;
var limitY = 2;
var index = 48;
var limit;
var result;

function GameNext() {
    // 超过100关时候的事件
    if (index >= 100) {
        $('.dGame,.f100_box1,.f100_box2').addClass('hide');
        $('.c' + index).removeClass('hide');
        $('.dResult').removeClass('hide');
        return ;
    }
    // 滚动广告信息
    $('.txtinfo p').addClass('hide');
    $($('.txtinfo p')[index % 4]).removeClass('hide');

    // 选择备选答案的的基本字
    result = [];
    for (var i = 0; i < gameLength; i += 1) card[i].enable = 0;
    var temp = card[index].name;
    if (card[index].error) {
        temp = temp.substr(1)
    }
    card[index].enable = 1;
    while (temp.length < limit) {
        var random = Random();
        while (card[random].enable) random = Random();
        card[random].enable = 1;
        temp += card[random].name
    }
    // 打乱备选答案的顺序
    temp = temp.substr(0, limit).split('');
    var newTemp = '';
    var l = temp.length;
    while (l) {
        l -= 1;
        var r = Math.round(Math.random() * l);
        var t = temp[r];
        temp[r] = temp[l];
        temp[l] = t;
        newTemp += temp.pop();
        l = temp.length
    }
    // 产生错位的待选字
    newTemp = newTemp.split('');
    var lTemp = newTemp.pop();
    var html = '<div class="choosebox"><ul>';
    while (lTemp) {
        html += '<li>' + lTemp + '</li>';
        lTemp = newTemp.pop()
    }
    // 产生正确答案的框格
    html += '</ul></div>';
    var html1 = '<div class="inbox">';
    var htmlLen = card[index].name.length;
    for (var i = 0; i < htmlLen; i += 1) {
        html1 += ('<span>&nbsp;</span>')
    }
    html1 += '</div>';
    // 界面动态数据的绑定的
    $('#G').html(index + 1 < 10 ? ('0' + (index + 1)) : (index + 1));
//    $('#gamePic').attr('src', 'images1/' + card[index].id + '.png');
    $('#gamePic').attr('src', 'http://wx.qqauto.cn/html/yc/2d1dc70e04e34f9399d19e925dd25f1f/images1/' + card[index].id + '.png');
    $('.choosebox,.inbox').remove();
    $('#gamePic').after(html);
    $('#gamePic').after(html1);
    // 结果框内数据的点击操作
    $('.inbox span').click(function () {
        var o = $(this).html();
        var isGo = 0;
        var liIndex = $(this).index();
        $('.gHide').each(function () {
            if (isGo) return;
            if ($(this).html() == o) {
                var result1 = [];
                var rl = result.length;
                for (var i = 0; i < rl; i += 1) if (i != liIndex) result1.push(result[i]);
                result = result1;
                $('.inbox span').html('&nbsp;').each(function (i) {
                    if (result[i]) $(this).html(result[i])
                });
                $(this).removeClass('gHide');
                isGo = 1
            }
        })
    });
    // 待选数字的选择点击操作
    $('.choosebox li').click(function () {
        if ($(this).hasClass('gHide')) return;
        var l = result.length;
        var ht = $(this).html();
        if (l < card[index].name.length) {
            $(this).addClass('gHide');
            $($('.inbox span')[l]).html(ht);
            result.push(ht);
            l += 1
        }
        // 结果框内对应的字填完时
        if (l == card[index].name.length) {
            if (result.join('') == card[index].name) {
                index += 1;
                $('#type').val('');
                $('#num').val(index);
//                $.ajax({
//                    url: _Mvar.domain + 'Register' + _Mvar.jsoncallback,
//                    type: 'post',
//                    data: $('#form').serialize(),
//                    dataType: 'json',
//                    success: function(ret) {
//                        if (ret) {
//                            if (index > myOrder) {
//                                myOrder = index;
//                                var shareStr = '求超越';
//                                dataForWeixin.title = '我在龙泽府看图猜字闯过' + myOrder + '关,' + shareStr + '！';
//                            }
//                        }
//                    }
//                });
                if (!(index % 10)) {
                    $('.dShare').removeClass('hide')
                }

                if (index == 50 || index == 100) {
                    $('.dGame,.f100_box1,.f100_box2').addClass('hide');
                    $('.c' + index).removeClass('hide');
                    $('.dResult').removeClass('hide')
                } else {
                    alert('闯关成功!点击确定进入下一关');
                    error = 10;
                    GameNext()
                }
            } else {
                // 结果错误
                error -= 1;
                result = [];
                $('.inbox span').html('&nbsp;');
                $('.gHide').removeClass('gHide');
                if (error) {
                    alert('答案不正确，再好好想想或分享到朋友圈求助,连续错误10次将重新开始游戏,您还有' + error + '次机会!')
                } else {
                    alert('这道题似乎太难了!您已经连续错误10次，即将重新开始游戏!');
                    $('.iStart1').click()
                }
            }
        }
    })
};
/**
 * 游戏开始时函数
 * @constructor
 */
function Start() {
    if (!sc) sc = new Scroll(document.getElementById("scroll"));
    errorIndex = Math.round(Math.random() * 101);
    // 临时的temp
    var listTemp;
    if (card.length) listTemp = card;
    else listTemp = list;
    var l = listTemp.length;
    var i = 1,
        n, r, t;
    while (l) {
    // card的值
        l -= 1;
        r = Math.round(Math.random() * l);
        t = listTemp[r];
        listTemp[r] = listTemp[l];
        listTemp[l] = t;
        t = listTemp.pop();
        if (t.error) card.push({
            name: t.name,
            enable: 0,
            id: t.id,
            error: 1
        });
        else card.push({
            name: t.name,
            enable: 0,
            id: t.id
        })
    }
    //
    limit = limitX * limitY;
    GameNext()
};

function Random() {
    return Math.round(Math.random() * 1000) % gameLength
};
var msg = '',
    go, myOrder = 0,
    chance = 0,
    sc, userid;
$('#wxnum').val(_Mvar.wxNum);
$('#headimgurl').val(_Mvar.headimgurl);
$('#nickname').val(_Mvar.nickname);
$('.headimgurl').attr('src', _Mvar.headimgurl);
$('.nickname').html(_Mvar.nickname);
$('#gid').val(_Mvar.id);
msg = '可能是网络原因，请重新访问本页面重试!';
//$.ajax({
//    url: _Mvar.domain + 'Red' + _Mvar.jsoncallback,
//    type: 'post',
//    data: $('#form').serialize(),
//    dataType: 'json',
//    success: function(d) {
var d = {
    "success": 1,
    "msg": {
        "Title": "看图猜字",
        "TotalCount": 0,
        "DaylyCount": 0,
        "StartTime": "\/Date(1418097305000)\/",
        "EndTime": "\/Date(1419782105000)\/",
        "Intro": "看图猜字",
        "Remark": "",
        "WxAccountID": 15,
        "MaxCoin": 101
    },
    "data": 910,
    "data1": 0,
    "data2": null
};
if (d) {
    if (d.success && d.msg) {
        if (d.data2) {
            myOrder = d.data;
            myOrder = d.data2.Num;
            if (d.data2.Tel) {
                $('#phone').val(d.data2.Tel);
                $('.phone').html(d.data2.Tel)
            }
            if (d.data2.TrueName) {
                $('#truename').val(d.data2.TrueName);
                $('.truename').html(d.data2.TrueName)
            }
            $('.pPrize').removeClass('hide');
            if (d.data2.Sts == 'A') {
                $('#usequan').click(function () {
                    $('.dPrize1').removeClass('hide')
                });
                $('.close1').click(function () {
                    $('.dPrize1').addClass('hide')
                })
            } else $('#usequan').html("已兑奖");
            var date = eval('new ' + d.data2.RegTime.replace(/\//g, ''));
            date = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
            if (myOrder == 100) {
                date = '乐天电影票一张<br/>' + date
            } else if (myOrder >= 70) {
                date = '星巴克咖啡券一张<br/>' + date
            } else if (myOrder >= 50) {
                date = '欢乐马克杯一个<br/>' + date
            } else date = '';
            $('#myid').html('ID:' + d.data2.UserListID);
            userid = d.data2.UserListID
        }
        //
        $('.hRed').html(myOrder);
        if (myOrder) {
            var shareStr = '求超越';
            dataForWeixin.title = '我在龙泽府看图猜字闯过' + myOrder + '关,' + shareStr + '！'
        }
        //
        chance = d.data1;
        msg = '';
        init(d.msg)
    } else if (d.msg) msg = d.msg
}
//    },
//    error: function() {},
//    complete: function() {
//        if (msg) alert(msg)
//    }
//}) ;
function usequan() {
    var pwd = $('#pwd').val();
    if (!pwd) {
        alert('请输入兑奖密码!');
        return
    }

//    $.ajax({
//        url: "GetPrize/" + _Mvar.groupID + "?ids=" + _Mvar.id + "&wxid=&myGroup=11&pwd=" + pwd + "&" + Math.random(),
//        type: "post",
//        data: {
//            activeid: userid
//        },
//        dataType: "json",
//        success: function(xd) {
    var xd = {
        "error": 1,
        "message": "密码错误!"
    };
    if (xd.error == 0) {
        canp = 1;
        alert("兑奖成功!");
        $('#usequan').html("已兑奖");
        $(".dPrize1").addClass("hide")
    } else if (xd.message) {
        alert(xd.message)
    }
//        },
//        error: function() {
//            alert("可能是网络原因，请刷新页面重试!")
//        },
//        complete: function() {}
//    })
};

function init(d) {
    $('.iSub').click(function () {
        if (go) return;
        go = 1;
        var phone = $("#phone").val();
        var tn = $('#truename').val();
        if (!tn) {
            alert('填写领奖信息才可继续游戏哦！');
            $('#truename').focus();
            go = 0;
            return
        }

        if (!phone || phone.length != 11) {
            alert('填写领奖信息才可继续游戏哦！');
            $('#phone').focus();
            go = 0;
            return
        }

        $('#type').val('1');
        msg = '可能是网络问题,请重新访问该页面重试';
//        $.ajax({
//            url: _Mvar.domain + 'Register' + _Mvar.jsoncallback,
//            type: 'post',
//            data: $('#form').serialize(),
//            dataType: 'json',
//            success: function (ret) {
                var ret = {
                    success: 104
                };
                if (ret) {
                    if (ret.success) {
                        msg = '信息提交成功!'
                    } else if (ret.msg) msg = ret.msg
                }
//            },
//            complete: function () {
//                if (msg) {
//                    alert(msg);
//                    if (msg == '信息提交成功!') {
//                        $('.iContinue').click()
//                    }
//                }
//                ;
                go = 0;
//            }
//        })
        $('.iContinue').click();
    });
    $('.iList').click(getList);
    $('.close').click(function () {
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        if (goto1) {
            $('.dGame').removeClass('hide');
            goto1 = 0
        } else $('.dIndex').removeClass('hide')
    })
    $('.iPrize').click(function () {
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        $('.dPrize').removeClass('hide')
    })
    $('.iRule').click(function () {
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        $('.dRule').removeClass('hide')
    })
    $('.iStart').click(function () {
        if (new Date() - eval('new ' + d.EndTime.replace(/\//g, '')) > 0) {
            alert('本期活动已结束，请期待下期活动!');
            return
        }
        ;
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        $('.dGame').removeClass('hide');
        Start()
    })
    $('.iStart1').click(function () {
        if (new Date() - eval('new ' + d.EndTime.replace(/\//g, '')) > 0) {
            alert('本期活动已结束，请期待下期活动!');
            return
        }
        ;
        index = 0;
        error = 5;
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        $('.dGame').removeClass('hide');
        Start()
    })
    $('.iShare').click(function () {
        $('.dShare').removeClass('hide')
    })
    $('.dShare').click(function () {
        $('.dShare').addClass('hide')
    })
    $('.iContinue').click(function () {
        GameNext();
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        $('.dGame').removeClass('hide')
    })
    $('.iRule1').click(function () {
        goto1 = 1;
        $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
        $('.dRule').removeClass('hide')
    })
};

function getList() {
//    $.ajax({
//        url: _Mvar.domain + 'List' + _Mvar.jsoncallback,
//        data: {
//            gid: _Mvar.id,
//            wxnum: _Mvar.wxNum,
//            num: 100
//        },
//        dataType: "json",
//        success: function(ret) {
    var ret = {
        "success": 1,
        "message": "",
        "data": [
            {
                "Name": "你不爱的小喵咪",
                "Coin": "100",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmCITmU3LItAveBV01q2W4DOK7CZfMwCgfgHqrvjxpn9ia8R4VvRGLrvv9as6GvI8rdTYbuO4Uwrp8g/0",
                "Tel": "156****5520",
                "Remark": ""
            },
            {
                "Name": "??渔小鱼??",
                "Coin": "100",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp0K310uX1O0lDpKRrFib1t47hic5c25UdhwIiaaULTXb2gyBYPh7OUe4npibePzH0F9v9j04Q5bWMzqE/0",
                "Tel": "185****8420",
                "Remark": ""
            },
            {
                "Name": "圆又圆",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaRajtaZpC0jHbcMb1JCian9M7qMrvWia6VHibG20UaFT811cViaoibBqQLSczmhBiaYBic183pBI4GBeLDR/0",
                "Tel": "186****6812",
                "Remark": ""
            },
            {
                "Name": "记得我吗",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmBRw5pXpJZa47AvTSjldicjjS3P8Lj2DPBTKcl90BL9tCzvzmbaHCZOeObibQvSAuwwBHVhqQFVSRSQ/0",
                "Tel": "150****1006",
                "Remark": ""
            },
            {
                "Name": "姜姜",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq6CHe7Lk38R3VA4vGFFIDtAQgiabf9yich3icMqgfEtDsJVUxfpXopsZq0yh8Rx1UZcw25FYtt07z2X/0",
                "Tel": "136****3052",
                "Remark": ""
            },
            {
                "Name": "林小姿姿姿?",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNM8ZnlPxBYTBmB4b3EaucGF7yTfSFWfAwJo401YapQo2LlxPdBHdj5Micat9xqhUNZL24xr6kibSnQ/0",
                "Tel": "150****4935",
                "Remark": ""
            },
            {
                "Name": "如继格格",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq7QScGzlk2FmkdT9TruTK1iaae0jAPgP6rzwicLLUx50sbsjJAUuHyavrypMKOibrOo87JmQpNWaZ8H/0",
                "Tel": "138****9083",
                "Remark": ""
            },
            {
                "Name": "以爱之名",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA9NufyD8DdJMiagFkf6WEicBOYbAS3lnEyGCGaTA5hDPjMx8QjfQBvhcYIwpZC9nTL1Qjib0YnUpIMw/0",
                "Tel": "136****7913",
                "Remark": ""
            },
            {
                "Name": "Christmas",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwqwpnUoXIq8BibMo5H90wcE4PW7Q3nKgrVXjwojgB1C8VkgNA60mXbnrHmMSM7xqSm9ZImEafIujjK/0",
                "Tel": "150****2960",
                "Remark": ""
            },
            {
                "Name": "某某",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1eibUAr1d3asHFHWib0Nc9hdXiczNibFXjOgWjklbzicHdW9PqJ4MXtEW4X1LAqxsc7VpF37DPUqmGpg0/0",
                "Tel": "135****4820",
                "Remark": ""
            },
            {
                "Name": "lanjiang",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwqzib4HrEMJbjxM0kI39oqgA2V7Hib3laqn3qLZZich0NmHylBGomhdgMeYeUBSbe6rDrVLM0qPbic16ic/0",
                "Tel": "152****1240",
                "Remark": ""
            },
            {
                "Name": "??向阳光",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq9oPrCU5ToB7dv5ibctBW6q0XljZDhxwjp0ZkZm5jI9kJsJ6O5ibJmZksLuj5FlDFwvmdFSZ8WKY6u/0",
                "Tel": "186****4227",
                "Remark": ""
            },
            {
                "Name": "\"",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLCoFNMLwIBXEnf8ftaHoEDyjuKsIPDRuLPUI6F9onJIb4ibjS1ZBZGURHM2UM45UQ0A4r2O4nbWaUVlkxUvIx6qlqgCBG2WbaLU/0",
                "Tel": "151****3710",
                "Remark": ""
            },
            {
                "Name": "雨爱",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN415kicNAD0eicjibakRStR3HYROfX7rLoEZOicIDDEJ4L59ou9or4vS17b0kibVw5Dso5lrXemIcYGpCvnMibsoQiaiaVq8/0",
                "Tel": "185****1543",
                "Remark": ""
            },
            {
                "Name": "大王叫我来遛遛",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmB1jnME1KYNUMWRat7tSl1FFrzjHGUTPuC5fEzqKjp05vNpKDWZKAqIdVspAibFVEJWGAEHk6d2w3Q/0",
                "Tel": "185****7608",
                "Remark": ""
            },
            {
                "Name": "小华",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXOI3fpUq4GbKh0yTh6qIAUiaibKkbk4K6PwicdxCW0YVGJr31TkVSqIWKfJwZZbTD84T5e5tA8xGEKS4Xo6t73naibR/0",
                "Tel": "137****2700",
                "Remark": ""
            },
            {
                "Name": "波波",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwqzw7E3C8YPFTvBfiaMibGMv1tCicfPOUTjHd7BaWwVlmQagwmWpolfia6EuboES4Dkh4ibRCYXrtsy2xn/0",
                "Tel": "133****4233",
                "Remark": ""
            },
            {
                "Name": "Ada",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1WrE4TuoFW1GibNibFEEYItxibiaUicreZGI3ZpSXwmOpI3TQqFUKPaTSoCyKictFpPOb0aWmricACNicrqt/0",
                "Tel": "137****4690",
                "Remark": ""
            },
            {
                "Name": "水墨晴空",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp1mJ1OIZJbZW9ovNrzibqJRCrTxM2AzjlDVlQtFdozRWNIibQEaz0mYr5AHv92mkAws1xGzjkFDMht/0",
                "Tel": "134****0983",
                "Remark": ""
            },
            {
                "Name": "SUBY",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1VHJVibMQORwhCBPe4DBSeibx9GuzrlJgQfMTJnQKaK7IYqPskhfb2fWEcicPG2jUavPrmLczQR6HtU/0",
                "Tel": "182****9858",
                "Remark": ""
            },
            {
                "Name": "晓",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe70iahWDiba9nYibkw0Hn0KkPTKx6BlaibYYlTW1IOvz5cY3mTrnibRFd52gwSeib1x4WUsGQiaTUwgQSKWpZxtDUnk0Xu/0",
                "Tel": "183****6925",
                "Remark": ""
            },
            {
                "Name": "果奶一丁",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1fpqaSgdTzgr8xIqu40hjPeGpQXHEiascGslTnoAPPVqUXg5IQ92VjiavuYKIzYWLG5LUKFkta8TMC/0",
                "Tel": "186****7499",
                "Remark": ""
            },
            {
                "Name": "琛",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaToumianWOANJ2PZdljLGRzJl3eKTibjWM3ul9PPw7RD5XibdPDL4SQicFwib07SfHsPpFKVQhvEHb2j9/0",
                "Tel": "138****1001",
                "Remark": ""
            },
            {
                "Name": "Amour丶晓明",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLDJscvVyndhDDaYnEERg3Vzd9j85PNPibc7XN7EEmj0cobJqt2lXFIZUibaL45hOF4Mn0icKhwticcTMg/0",
                "Tel": "151****5417",
                "Remark": ""
            },
            {
                "Name": "/:turn",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXMC2z4mBSjCHSBua6uAMs2Uv8NrhiahRxTRibFiaM8gNicYaCetCf1Tcgty3DJnbBTkS0sEfquhdjjABOA6rjPnwibgl/0",
                "Tel": "134****1360",
                "Remark": ""
            },
            {
                "Name": "笑而不语",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM5oGa7Uliao3I4jIDDp77HaAeQGU9RQSLgtkoUpCXgzRx0ib0bbWf7M3QkxoagibCp3kDl1ibm6w71HBQXm7IA1gPSdm4khEtxtSL0/0",
                "Tel": "138****1577",
                "Remark": ""
            },
            {
                "Name": "zhoujp",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1V1fTbiaic2wgBB3MhDb543NJVsreT8FZn0AWdGCIDm9MSfEBL0tIjtbTkbobjgvhKcaeyeUbd9y7u/0",
                "Tel": "186****3251",
                "Remark": ""
            },
            {
                "Name": "仲 仲",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1WuS29IZoOl3tk2lUaGcAtLdjwCrdUUckpMBX9llMOEkibJ5nXnxmAiaInI2ZX84rYr2f5yZq42cHb/0",
                "Tel": "134****0003",
                "Remark": ""
            },
            {
                "Name": "花开不败",
                "Coin": "90",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq76aicaJiahRIapwrOIXFQm8yg6DSaZal8QENrDSl3FKRkkYoSLPhkjoNUCt6MZ7L3a6QmaKXedDbD/0",
                "Tel": "186****7221",
                "Remark": ""
            },
            {
                "Name": "茶余饭后",
                "Coin": "66",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1W1FajwicaVDlgytyDa6V82fPOicEIUYltiapbQOkKF5dG3LM0QmswvoEfuJFbERlnia2YQHxBC9ZWlA/0",
                "Tel": "186****8939",
                "Remark": ""
            },
            {
                "Name": "潜龙腾渊",
                "Coin": "50",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe5LuJ4JUSQu9JbAIfJQ5ib7JTXGQZAapwbEypzw1zbheiaO9acCEicNYYOvdkWqGwUz9bbfZNSp24iaaLtxuU9ZulGP/0",
                "Tel": "156****8958",
                "Remark": ""
            },
            {
                "Name": "丛林山猪",
                "Coin": "50",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmBPkiaklOzDibQ4jEXd2XEojFmWCTZL0ZxYI1sa7QryvSNibtt7YBnSg3MbJC48Il4XCt36r2ODEEficg/0",
                "Tel": "158****6374",
                "Remark": ""
            },
            {
                "Name": "@小龙",
                "Coin": "49",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp58Xvwy0b2gq0q06JL0pgQ0cpzHa6iaahVw6pibJDRhFWcnUsHduCoGwectyKEia9OBPfNV87pNH4icV/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "「微小沫┘ ",
                "Coin": "32",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1S0QtoukYtaicf7dm9tUlCj5ia0eHCzDZfHiaroiaYK39QOibPwhPiaibg5EcypdiazuKicnqArniaaIYNXK1ib/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "晓隆MICHAEL",
                "Coin": "31",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp7hL5WKoJ4dA0szk3tEmaYMVYlj8ptZricLeQyxicgibgaIkJOJag5QicG6AB0BGXrG709ibhlzydwoeB/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "英杰",
                "Coin": "19",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBuc7PPzMYicqqPglnNJfEhVPzFYcRG86Chiao4qHpkdia9wE6SJYupVG6yqHwMAecW7QasEg8qwbB3xQ6O6UPh7GXydicRX3aExAc/0",
                "Tel": "135****9310",
                "Remark": ""
            },
            {
                "Name": "小胖妞",
                "Coin": "17",
                "Img": "http://wx.qlogo.cn/mmopen/JYGEZicql1iakV346nQfVoyKoW4L70DlYn2JCRhGPDM2gfqFonicgdrhBZCJmXaLaQnNiaGv0wW3enIoYVzH9xjTxF5g8eUGy2Os/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "简单爱",
                "Coin": "17",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwqy8jkExgAYysJVQ7gFENibmSWIXZRMia4XQa65wOaib0PibicZAmDe6J5QZcvoa06SRsCKViaGrbxlPBZia/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "啊哦",
                "Coin": "16",
                "Img": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEKQng2saU6Fp1VMuOweWEf2nslfV90Y81HUicCXTDITSW0EVZ8b18YAIAYU2h84Pib3fcibusAoePc9w/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "赵小贤",
                "Coin": "15",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iad9AMymZgkKnBuojp8A5AbkpG0BvFmh5fmSckCKQeQ4NVicicDbgNBAToBz8lrjicrrsflUzaJqayzf/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "腾飞",
                "Coin": "15",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmCIOeSOKBcmNGkXMaOicP7NjdtLWh3JgCQ25icv3Ue3LSawGOFesH4wlTwJnHMmGqeibNXdOGPjUGbbA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "菠菜",
                "Coin": "14",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLC1eKpMpNHl6o9rarZHOgIgUaZs8NTZXZwHQ6Uo9HZnEgpB1AxtdcrkT9xQyxaciaGaiasabNc4zdAA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "峰子",
                "Coin": "14",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXOrcst6G364StjO4tHYicZKogicpuWqR1ziccEic5FP79TxcT5B4KOfEfgggjPyMHBGl03hPDVdzX0tJA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "J.Super",
                "Coin": "12",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4zwVLhzA0riaClYyATgI6A1PVIGkicWgW8e6HCwYprqAgvv5LYIr7TuCaFOewdElp3iaic0KL3lolTjqbCSMLEtuQd/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "王颖",
                "Coin": "11",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN42u6NHfZiaBzm4wmwLZrIzKol74hUTXWPe2icAYicuvv4hv6usL1HZAp4AqTLSBnBXILtwcdbyF2OZsw/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "虾米球",
                "Coin": "10",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXOs6JlULJd1QtPOOXk0q3CX7nILt9DkfBsHniaA0YWtBMwmraDzpgiaulXSeUqUdIXp7cxIGVeCSO2A/0",
                "Tel": "138****5362",
                "Remark": ""
            },
            {
                "Name": "??幸福的斌媳妇儿???",
                "Coin": "10",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaT2kmPqZ1SCL3cFZylrlneOr3oGswWM1GtsVvwnzBEg9PEVzqD5H4h1EmsLBicsPYugAOzfFvkros/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "周小名",
                "Coin": "10",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM6tcHXLQw6hqhZEU1CWKRJIDvC1JLXvBnsgGQf7Ajh9LpKicmLsK5ZMmTJd3iakK8CqlfibdFrrEANPvcfh8MiberDYd3IvAOUhwc4/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "??℡就是你",
                "Coin": "10",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1RnhBqdqm58VqIBQrkRUGsJ5r5efytNBvlp7PEmxo05tP1jxGsbVI7yBOgcfiaeqrARicuQU79L4Yd/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "洛秋",
                "Coin": "9",
                "Img": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEL3qjXTiaT9iaF9tatibQY3lggv572Af5GZ4mzddOGv4GKg7zhan5qibDu54u6QLOJvvMKKRiceG1JaQeA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "水",
                "Coin": "8",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1ZqicKH5tKBH0VcgChialxrauKgIPNr2IKia2A6476ibE1EI4XhqXxhsFRVltnrBnETgiaIibaztb3ee43/0",
                "Tel": "152****6123",
                "Remark": ""
            },
            {
                "Name": "艾7儿",
                "Coin": "8",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp0FJgz9SpUtPhWyVPU6CZSBaj7s64YuRl7hiayvPQKqvG8ibD8iaCsBcHPb4lEkxLibL95ibXGHam1byn/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "小名叫有数。",
                "Coin": "8",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1RUJvEh8TeRrVnPY9icg5wwQfns9KiaRwPqtUjnJQ9ysIZ5dtHPQFNxKDSwTaib2JQnO2fS9UoDT93k/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "-",
                "Coin": "7",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1Zyt3ttoQtqCJNnImTdPbqR9MK2CeRQSiczdXoO1D5mtDnficxibHgria5JnLYprKnOfRbAHbv3SR1BF/0",
                "Tel": "135****0882",
                "Remark": ""
            },
            {
                "Name": "张乾乾",
                "Coin": "7",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq49wp3ekG4RSbQdtJiamRu7jmGpibYtic7YD6wfnYAxU2G3pco2zicuqmev9iaMjLk83jOfOO4CEErNPD/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "一朵奇葩児",
                "Coin": "7",
                "Img": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEIGdIib9ic18ZcibJurwmugfvdBvglcStFk8mdLUb5JqiaMUdWTZ8R3gwX999Kic9YKNXbVVsdLhmtgGew/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "人生如戏",
                "Coin": "7",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe7ia7pKWQM0wowWibR1bE9ZIN5q4dKIVfddeIKicO2YXg1K1ISYkABgR0TB4dWmplLKWTYibicBibWJpYQDibRxqh6PKn5/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "喜从天降",
                "Coin": "6",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM5pZiatqv43xx1pA8HjhbELG0Yg9J5XHzXD0UHD4WaaEWeW0h1xhsmsG2AXj9AR5ELsicNgEvqZKys0DXRkQPOLltWRL4gYVbWQ8/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "夏筱媛",
                "Coin": "6",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1drx095Chu8cg1FovRobnXZOOeFgWQR1lZVQmhgZy7VTaLtibaQ7tYg9rgmM4LuicHibsaicQZlEmVO0/0",
                "Tel": "182****3336",
                "Remark": ""
            },
            {
                "Name": "小糖块",
                "Coin": "6",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmCaEMFgW67Ko4Pamgn3nWH8AAzu5Sj0DZ9fp52d9SbmXHurWs3cEkv7kFiadPg8wyv1ps5NsJ0DlWeibdPc1iatPsB/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "靈淵",
                "Coin": "5",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN42dQuWspicofiaegcAVOxuDWFPHreQonkXcJ9u8iaXeicwzRSYibwsYnrzqn5LbWyZ03qBBru7scP7ia4nibicS7xxtGkcw/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "华华",
                "Coin": "5",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq2zjgvhXrM7JPictibibiaMA0PrOicPLrqPntTFh6xQZ3NgMGnicb9s7pHvjyQ3iaCg5Q0fYWqWBW72xHVU/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "鱼酱",
                "Coin": "5",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1SmVB0oQSYgODTjGh32e0A5eNzZfBpc9L1Mm2dF5B3FkaKSpuVoh2jdYxrNWO70VbG1yUQvhE6uH/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "Aa依依韩妆美淘",
                "Coin": "5",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLDUjFPGWj1iclBoR7pprIztlKHhibHNUAcBibfo4pgQTyHdQtEicAO8QUs8EYRyFUMe7kISECguPHZfJw/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "小 ?Ｙ?",
                "Coin": "4",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1ffGZImA2nufP1hfPGcIUSp9kHcIG6ibfapQ91mp0oic1b6pCZI4dD0945vvXjX56iboM4rF8XNTbOD/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "荷塘莲语",
                "Coin": "4",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN42DlkvGSjfcGY7pkbHpY27etDXkQicqRplZuhTYxaUiaO7Ps8VW8vjAyAJhbib7KPRtz5KAUcbliaU4XvkHiaCLu9JQN/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "Varian.Wrynn",
                "Coin": "4",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM58J5LKcib4BQsdswxNorA94tl89p2Ob7L3hVfHSef8Ej1Eqx5x4gCIUmeB5ibDdPBy1DD2pTBJNMRw/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "荷塘月",
                "Coin": "4",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaRwTOzGfw8D8ia9d2rPwIFMcxiaPQdx8AuHepvaiarImkcXH7t608GbK5FBiao85UZbJ5maFlEdfU3eM/0",
                "Tel": "138****0151",
                "Remark": ""
            },
            {
                "Name": "尹飞",
                "Coin": "4",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM5pZiatqv43xx1pA8HjhbELGUficDa11tkMSxM3mOswpTfnwdLyycDg2Oia70ShdRb4jqcO60OGeC9evicmI6UeVichogJI0mVqQicHE/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "天亮天后",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaYyRmXHEkGg7WqTz7H44k0uZLLGIIPJl8JhkhIkSI4G5c2X2dicHGZEA3YfmsBhsqibNacUiaamlG6C/0",
                "Tel": "189****5800",
                "Remark": ""
            },
            {
                "Name": "婷婷",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM5pZiatqv43xx1pA8HjhbELGpMF99utFEx2qX3vYaoria4UaiczBUzOwbpdTAey8NXfQiaOrdWHGtfCRP9WMdzVouG60EX7ic3zPIG0/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "安静的 Aries ",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN43TSqUUejZibKc0rvbCnSkGzibkHJiaPNWPaUGj063EaNG72XPicVQ2icC5ph2boXEdX4iauyThELFF9M4fBDl3dibHUpr/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "昧魅mm",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaYUFe7OVItMlHX9ic0d19eYcK5nYpicCvsUqia7uAZd8smH3WvF1u6qmiam5ANbuntpkmuOibQOCIWqK1/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "candy",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1XscqEoj1W2fTAw87kl9W28ujGJhjxyUvD5TicfQeGD26b9qGvL0cB4mUiahdXpS6eIoicddxhcdEuF/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "～靜之喧嚣～",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq9B0BgukJwxujxLPI1HOopnzYYMbZFbGviafWzehvDxRU7pFDgnRJ9ruQIs5N6tX12iaZiaDMRLMrRN/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "妮儿",
                "Coin": "3",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmBaTyNhA2y0iafm45VLpGp1kWexC0lFNrkbxdaRzk2jKSE3VR973poiaZQP4D1lDdSYSyEibxnHpQhAA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "阳仔",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLACURQBbWHI92VzibcQqXHbINGK7JAkpibUtDZeVBMzKg2iaE3S8gwpBhiaemYUchnAGG8iczJFx5qicBJQ/0",
                "Tel": "186****6897",
                "Remark": ""
            },
            {
                "Name": "^O^被宠坏的我^O^",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1U3qbueWyccleyibmYllewVvfdIxiauicOS57Z08SsumxWHSWNU0suRG1Mw2ZXquB2FyCYsIB3JJXdw/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "风云天下",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM6yShGNPLut0QzdKGzan7Sjt9AgyuCYkuwp0g20xYMRE1OIYd5bBIGLbYRJL7eDr0FvNibLo75VAxA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "T_T",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNpicjHEfvoVtOSvaGCVqEYToxuNBc24T2JSaKnyKAOKbyhEyHRnl7NWUQ60SKKvSJagg7UHWcuS93cnWEUQmrnE/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "高蕾",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEIufZ26ImoIQyWnwyxTNgwPSAicicibWpvKAibJuUzQ6RC89NRe7riaD3tf3SIbhuMOpdib7HwpScQEcsYA/0",
                "Tel": "132****7827",
                "Remark": ""
            },
            {
                "Name": "。",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq4PSbxrSemXBAzRFpUyswibkRvVZA1MFibdJo0GiakicH4aPH3B5S1LGyhDXZHtb4kJMk1yfaO5hMSMO/0",
                "Tel": "135****3518",
                "Remark": ""
            },
            {
                "Name": "LiuXiang.翔",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaeohLxW1MEpEGUgCZFiccQeZICMcXiaGYW9d0xicH2oHOTPmacooILNCnma6J22K3Hx65DNOKr071pK/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "心疼谁疼我",
                "Coin": "2",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN43Je0wAqPJ5ZQ7LS72vYsiaJAX06MZPS2JYJgOvYbSuicJV8mzhJcoAeTUPibNucxiciaLGWTgK6PpGKy1vUicfWib5eZB/0",
                "Tel": "123****8901",
                "Remark": ""
            },
            {
                "Name": "? 街角幸福ヽ",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN42ehibBkGBWJmuy5xQmSUb85FJcgnlicHydGJ2GhicuKjv1wTXORIuRzh13SUlY4fg7SfuM6zW2wicCPw/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "刘小成~~^_^~~",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBuc7PPzMYicqqPglnNJfEhVIp9vtP1roh7RaQsMaKSdpx3MurPcjLYnibAzIVHWnAeC6nxFbb4gQxfff4Rqx076N7DFFYG2uo5Q/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "下辈子学乖",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1WK1EvEJGyVurhpcWegiaiaPY5CAnuMhdnL3yMGyhPIdDbIWeuyE3e2MTKyrmLuxKB9GsXhxOh2w42/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "小可儿",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1eMJ4QKYQZ8V7PiclUj5CDicSibmficvRkVozP2g94LicWsG95FAqOyh7MDdb0k5MYkics3nTNA0YmkBIib/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "崔",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/JYGEZicql1iakV346nQfVoyH3u3xIjiaFdNbFpYtc2Kog1uJApujhHaZYpXiaXQuKn380jSD6YnlAA5iahOY3h5icVbQSHiaCuANUbx/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "匆匆那年",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp16utI4Tpg5UJklhTZzXT50lO8ApPHZHOCeN6Uhicx5YO1zjRJcurFq53nDKibSianej19XkVNnPGDa/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "周倩倩",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp6d9C7kk9amgoDFBBym4dNxRDGuARVFn70NeXclaCpHzQtbe3eJfq7qRIUAVTebcibhLgaj70gIL0/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "小女ren'真翺",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmDic45PBbaUnp3kdRgGfNqibgqnTCOO0oJFAt11ReZib08rWSYa0pLvLE1DK44dk1UVkdfTQricWCiadY4A7GXhGUngA/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": " 等你爱我",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/eFO0G2SdRe4N8giaIP9ib4iaVgzlAjH3WbB2gfmHSHpPRA1speOPSwHeGiboZUWiaHDKo936qcvmbib4wicdAuJHJfKeqLSpeewgEB4/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "天之蓝",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1aicnCVudZ5wEkT7Dfj4pOZBUYDVibhFBdlmM0XnVmCDEkheduOicxsJ4Eh7gyaFjN2ZtG2jPicj0uice/0",
                "Tel": "151****6162",
                "Remark": ""
            },
            {
                "Name": "冷。",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1TygmemicXRUq21s7GmwRfCBrVq1zS34LvZiaictXUeaibgH6TER5mx6P2ck3yZQA2M3mwqUPpgg10Az/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "weishuwen",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/hgXWbMaaqmAMDlS4P27oEBJqsmlJGy5yRLV5DGLD3iafMfeVjIpicvbicNzYbp82PJmXXEyjX1Qlqic7QbNicNT50TQ/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "吕小布",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/hUN2NibMVN40pdNmMobZwq6M2nCvRBmFqrcy6t57SdFh7RichdiawzW25Lxr2mQCiakecbXHxET6K9maAE0CIm2WM3bfKrgiaUibbJ/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "晴风暖雨向阳花",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEJpKGsgkkKwhtBrhicwBNdYE3r9ic9N97eaQA3tic1MFYXnpq185OaV3z9sFyQpgsmLdgWseDztbSs1Q/0",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "轮回5",
                "Coin": "1",
                "Img": "http://wx.qqauto.cn/css/images/Head.png",
                "Tel": "139****4103",
                "Remark": ""
            },
            {
                "Name": "公子",
                "Coin": "1",
                "Img": "http://wx.qlogo.cn/mmopen/krLSVZObVXNCeNOlorHq1RO0yEia44oPJia1xUkRZU66OOian2XWSGH0vclfttWluTbQNDVBpUw46AU5GIyQLWmibH3IG3uWibczd/0",
                "Tel": "139****4103",
                "Remark": ""
            }
        ],
        "List": "921",
        "data1": {
            "Name": "轮回5",
            "Coin": "1",
            "Img": "http://wx.qqauto.cn/css/images/Head.png",
            "Tel": "131****4282",
            "count": "99",
            "Remark": ""
        }
    };
    $('.dIndex,.dGame,.dResult,.dRule,.dList,.dShare,.dPrize').addClass('hide');
    $('.dList').removeClass('hide');
    var str = "",
        str1;
    if (ret && ret.success) {
        $(".title i").html(ret.List + '人参加');
        var data = ret.data,
            len = data.length;
        if (len > 0) {
            for (var i = 0; i < len; i += 1) {
                str += '<dd class="mytop"><i class="num">' + (i + 1) + '</i><span class="name"><img src="' + (data[i].Img.length > 1 ? data[i].Img.substr(0, data[i].Img.length - 1) + "46" : data[i].Img) + '"><em class="people_name">' + (data[i].Name.length > 8 ? data[i].Name.substr(0, 8) : data[i].Name) + '</em></span><b class="money1">' + data[i].Coin + '</b></dd>'
            }
        } else str = "暂无用户参与";
        var myoyder = "";
        if (ret.data1 && ret.data1.count != "") myoyder = ret.data1.count;
        if (ret.data1) {
            str1 = '<dd class="mytop" id="mypm"><i class="my_num">' + myoyder + '</i><span class="name"><img src="' + (ret.data1.Img.length > 1 ? ret.data1.Img.substr(0, ret.data1.Img.length - 1) + "46" : ret.data1.Img) + '"><em class="people_name">' + (ret.data1.Name.length > 8 ? ret.data1.Name.substr(0, 8) : ret.data1.Name) + '</em></span><b class="money1">' + ret.data1.Coin + '</b></dd>'
        }
    } else str = "<li>" + data.message + "</li>";
    $("#list1").html(str);
    if (str1 != "") $("#mypm").html(str1);
//        },
//        error: function() {
//            alert("可能是网络原因，请点击关闭按钮重试!");
//        },
//        complete: function() {}
//    })
};

function onBridgeReady() {
    if (dataForWeixin.hideToolbar) {
        WeixinJSBridge.invoke("hideToolbar")
    } else {
        WeixinJSBridge.invoke("showToolbar")
    }
    ;
    if (dataForWeixin.hideOptionMenu) {
        WeixinJSBridge.invoke("hideOptionMenu")
    } else {
        WeixinJSBridge.invoke("showOptionMenu")
    }
    ;
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": dataForWeixin.img,
            "img_width": "120",
            "img_height": "120",
            "link": dataForWeixin.link,
            "desc": dataForWeixin.desc,
            "title": dataForWeixin.title
        }, function () {
        })
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": dataForWeixin.img,
            "img_width": "120",
            "img_height": "120",
            "link": dataForWeixin.link,
            "desc": dataForWeixin.desc,
            "title": dataForWeixin.title
        }, dataForWeixin.callback)
    });
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
        WeixinJSBridge.invoke('shareWeibo', {
            "content": dataForWeixin.title,
            "url": dataForWeixin.link
        }, function () {
        })
    });
    WeixinJSBridge.on('menu:share:facebook', function (argv) {
        WeixinJSBridge.invoke('shareFB', {
            "img_url": dataForWeixin.img,
            "img_width": "120",
            "img_height": "120",
            "link": dataForWeixin.link,
            "desc": dataForWeixin.desc,
            "title": dataForWeixin.title
        }, function () {
        })
    })
};
var dataForWeixin;
var url = location.href;
dataForWeixin = {
    hideToolbar: true,
    hideOptionMenu: false,
    title: '破关大战 猜图有礼',
    desc: '破关大战 猜图有礼',
    img: 'share.jpg',
    link: url,
    callback: function () {
        return;
        $('#type').val('2');
        $.ajax({
            url: 'RotateData',
            data: $('#form').serialize(),
            type: 'get',
            dataType: 'json',
            success: function (ret) {
                if (ret && ret.success && ret.msg) {
                    jAlert('恭喜您分享到朋友圈获得额外' + ret.msg + '次抽奖机会!', '温馨提示', function () {
                        snum += ret.msg;
                        $(".morebtn strong").text('您还有' + snum + '次抽奖机会')
                    })
                }
            },
            error: function () {
                jAlert('可能是网络问题，请稍后再试!')
            }
        })
    }
};
if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
} else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
}


// 广告滚动信息
function Scroll(element) {
    var content = document.createElement("div");
    var container = document.createElement("div");
    var _this = this;
    var cssText = "position: absolute; visibility:hidden; left:0; white-space:nowrap;";
    this.element = element;
    this.contentWidth = 0;
    this.stop = false;
    content.innerHTML = element.innerHTML;
    content.style.cssText = cssText;
    element.appendChild(content);
    this.contentWidth = content.offsetWidth;
    this.contentWidth = element.offsetWidth;
    content.style.cssText = "float:left;";
    container.style.cssText = "width: " + (this.contentWidth * 3) + "px; overflow:hidden";
    container.appendChild(content);
    container.appendChild(content.cloneNode(true));
    element.innerHTML = "";
    element.appendChild(container);
    container.onmouseover = function (e) {
        clearInterval(_this.timer)
    };
    container.onmouseout = function (e) {
        _this.timer = setInterval(function () {
            _this.run()
        }, 20)
    };
    _this.timer = setInterval(function () {
        _this.run()
    }, 20)
};
Scroll.prototype = {
    run: function () {
        var _this = this;
        var element = _this.element;
        element.scrollLeft = element.scrollLeft + 1;
        if (element.scrollLeft >= this.contentWidth) {
            element.scrollLeft = 0
        }
    }
};