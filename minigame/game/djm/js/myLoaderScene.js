/**
 * Created by weishuwen on 2015/1/8.
 *
 *  创建一个程序资源loading界面
 */

var MyLoaderScene = cc.Scene.extend({
    _interval: null,
    _length: null,
    _count: null,
    _label: null,
    _className: "MyLoaderScene",
    _logo: null,
    _logo_bg: null,
    init: function() {
        var _this = this;

        var bgLayer = _this._bgLayer = new cc.Sprite(res.loading_bg);   // 创建背景白色
        bgLayer.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});
        _this.addChild(bgLayer, 1);

        var logo = _this._logo = new cc.Sprite(res.loading);        //中间房子的图片
        logo.attr({anchorX: 0.5, anchorY: 0.5, x: cc.visibleRect.width/2, y: cc.visibleRect.height/2 +120});
        bgLayer.addChild(logo, 1);

        _this._logo_bg = new cc.Sprite(res.loading_s);
        _this.setbgpercent(0);         //
        logo.addChild(_this._logo_bg, 1);
        _this._logo_bg.attr({ anchorX: 0, anchorY: 1, x: 0, y: 0});

        var label = _this._label = cc.LabelTTF.create("0%", "Arial", 50);
        label.attr({anchorX: 0.5, anchorY: 0.5, x: 70, y: 28})
        label.color = cc.color("#f6ac2b");
        logo.addChild(this._label, 1);

        return true;
    },
    onEnter: function() {
        this._super();
        this.schedule(this._startLoading, 0.3);
    },
    onExit: function() {
        this._super();
        this._label.string = "100%";
    },
    initWithResources: function(resources, cb) {
        if (typeof resources == "string") {
            resources = [resources];
        }
        this.resources = resources || [];
        this.cb = cb;
    },
    _startLoading: function() {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        // 注意下loadedCount 表示已经加载的数目
        cc.loader.load(res, function(result, count, loadedCount) {
            var percent = (loadedCount/count * 100) | 0;
            percent = percent >= 100 ? 100 : percent;
            self.setbgpercent(percent / 100);
            self._label.setString(percent + "%");
        }, function() {
            self.onExit();
            setTimeout(function() {
                if (self.cb) {
                    self.cb();
                }
            }, 200);
        });
    },
    setbgpercent: function (percent) {
        var self = this;
        self._logo_bg.setTextureRect(cc.rect(0, 685, 247, -600*percent-85));
        // cc.rect(x, y, width, height)
        // 控制彩色图片显示的大小，通过百分比
    }
});

MyLoaderScene.preload = function(resources, cb) {
    var _myLoaderScene = null;
    if (!_myLoaderScene) {
        _myLoaderScene = new MyLoaderScene();
        _myLoaderScene.init();
    }
    _myLoaderScene.initWithResources(resources, cb);
    cc.director.runScene(_myLoaderScene);

    return _myLoaderScene;
};