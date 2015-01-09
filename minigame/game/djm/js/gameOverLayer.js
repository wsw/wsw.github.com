/**
 * Created by weishuwen on 2015/1/8.
 *
 * 主要是游戏结束后弹出的界面，显示得分，次数，以及分享
 */

var GameOverLayer = cc.Layer.extend({
    remain: 0,
    score: 0,
    text: "",
    resultSprite: null,
    /**
     *
     * @param remain
     * @param score
     * @param text
     */
    ctor: function(remain, score, text) {
        this._super();

        this.remain = remain || 0;
        this.score = score || 0;
        this.text = text || "";
    },
    onEnter: function() {
        this._super();

        var bg = new cc.Sprite(res.result_bg);
        bg.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});
        this.addChild(bg, 0);

        this.resultSprite = new cc.Sprite(res.result);
        this.resultSprite.attr({anchorX: 0.5, anchorY: 1, x: bg.width/2, y: bg.height-160});
        this.addChild(this.resultSprite, 1);

        this.initRemainText();
        this.initScoreText();
        this.initShareText();
        this.initButton();
        this.initCloseBtn();
    },
    initRemainText: function() {
        var txt = new cc.LabelTTF("今天您还能再玩" + this.remain + "次", "Arial", 40);
        this.resultSprite.addChild(txt, 1);
        txt.color = cc.color("#8e8e8e");
        txt.attr({anchorX: 0, anchorY: 0, x: 120, y: this.resultSprite.height-270});
    },
    initScoreText: function() {
        var txt = new cc.LabelTTF(this.score, "Arial", 100);
        this.resultSprite.addChild(txt, 1);
        txt.color = cc.color("#f68a43");
        txt.attr({anchorX: 0, anchorY: 0.8, x: this.resultSprite.width/2, y: this.resultSprite.height/2});
    },
    initShareText: function() {
        var txt = new cc.LabelTTF(this.text, "Arial", 40);
        this.resultSprite.addChild(txt, 1);
        txt.boundingWidth = 500;
        txt.color = cc.color("black");
        txt.attr({anchorX: 0, anchorY: 0, x: 120, y: this.resultSprite.height/2-220});
    },
    initButton: function() {
        var btn_1 = new cc.Sprite(res.result_btn);
        this.resultSprite.addChild(btn_1, 2);
        btn_1.attr({anchorX: 1, anchorY: 0.3, x: this.resultSprite.width/2, y: 0});
        var txt_1 = new cc.LabelTTF("再玩一次", "Arial", 46);
        btn_1.addChild(txt_1, 1);
        txt_1.attr({anchorX: 0.5, anchorY: 0.5, x: btn_1.width/2, y: btn_1.height/2});

        btn_1.btnType = "btn1";
        btn_1.btnTypeName = "再玩一次";

        var btn_2 = new cc.Sprite(res.result_btn);
        this.resultSprite.addChild(btn_2, 2);
        btn_2.attr({anchorX: 0, anchorY: 0.3, x: this.resultSprite.width/2, y: 0});
        var txt_2 = new cc.LabelTTF("分享", "Arial", 46);
        btn_2.addChild(txt_2, 2);
        txt_2.attr({anchorX: 0.5, anchorY: 0.5, x: btn_2.width/2, y: btn_2.height/2});

        if (this.remain == 0) {
            txt_1.string = "返回";
            btn_1.btnTypeName = "返回";
        }

        btn_2.btnType = "btn2";

        var _this = this;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
                    if (target.btnType === "btn1") {
                        if (target.btnTypeName === "再玩一次") {
                            setTimeout(function() {
                                cc.director.runScene(new DaJiMuScene());
                            }, 300);
                        } else {
                            location.href = "#";
                        }
                    } else if (target.btnType === "btn2") {
                        var share = new ShareLayer();
                        share.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});
                        _this.addChild(share, 10);
                    }
                    return true;
                }
                return true;
            },
            onTouchEnded: function() {
                return true;
            }
        });
        cc.eventManager.addListener(listener, btn_1);
        cc.eventManager.addListener(listener.clone(), btn_2);
    },
    initCloseBtn: function() {
        var close = new cc.Sprite(res.result_close);
        this.resultSprite.addChild(close, 2);
        close.attr({anchorX: 1, anchorY: 1, x: this.resultSprite.width-100, y: this.resultSprite.height-110});

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
                    location.href = "#";
                    return true;
                }
                return true;
            }
        });
        cc.eventManager.addListener(listener, close);
    }
});

var ShareLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
    },
    onEnter: function() {
        this._super();

        var bg = new cc.LayerColor(cc.color(0,0,0,180));
        this.addChild(bg, 0);

        var share = new cc.Sprite(res.share);
        share.scale = 2;
        share.attr({anchorX: 1, anchorY: 1, x: cc.visibleRect.width, y: cc.visibleRect.height});
        this.addChild(share, 1);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
                    target.visible = false;
                    return true;
                }
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
    }
});