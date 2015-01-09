/**
 * Created by weishuwen on 2015/1/8.
 *
 *  创建游戏的主界面, 主要分为两个层面,一个y值不变的，一个是随积木下落变化y值的
 *  本游戏主要用一个物理引擎的，所以必须把物理引擎chipmunk包含进来，直接通过project.json中设置modules
 *  主界面主要设置logo，时间，成绩，以及转动的积木对象，当然还有背景，背景的y值同下降层一起下降
 *
 *  ctor
 */
var winSize;

var GameLayer = cc.Layer.extend({
    bgLayer: null,
    statusLayer: null,

    cmheight: 0,  //物理引擎下降的高度差
    topSprite: null,   // 顶部
    playOn: false,
    separateBox: null,
    gameOver: false, //游戏状态
    score: null,   //分数精灵
    remain: null,   //还剩次数
    topBox: null,
    timeStart: 0,

    ctor: function () {
        this._super();

        winSize = cc.director.getWinSize();

        this.bgLayer = new cc.Sprite(res.bglist);
        this.bgLayer.scale = MW.SCALE;
        this.bgLayer.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});
        this.addChild(this.bgLayer);

        var logo = new cc.Sprite(res.logo_png);
        logo.attr({anchorX: 0, anchorY: 0, x: 30, y: winSize.height - logo.height - 30});
        this.addChild(logo, 2);

        this.space = new cp.Space(); //创建space

        this.statusLayer = new StatusLayer(this.space);  //
        this.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});
        this.addChild(this.statusLayer, 1);

        this.initTopSprite();
        this.initCurScore();
        this.initTimeStatue();
    },
    onEnter: function() {
        this._super();

        this.scheduleUpdate();  //每帧 调用 update

        // 碰撞处理事件绑定
        // 参数1， 参数2, 是物理对象设置的不同碰撞类别setCollisionType
        this.space.addCollisionHandler( 1, 2,
            this.collisionBegin.bind(this),
            this.collisionPre.bind(this),
            this.collisionPost.bind(this),
            this.collisionSeparate.bind(this)
        );

        MW.CUR_GAME_STATUS = MW.GAME_STATUS.GAME_IN;

        //事件处理
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                swallowTouches: true,
                onTouchesBegan: function(touches, event){
                    event.getCurrentTarget().playEvent(touches[0]);
                }
            }, this);
        } else if( 'mouse' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                swallowTouches: true,
                onMouseDown: function(event){
                    event.getCurrentTarget().playEvent(event);
                }
            }, this);
        }
    },
    update: function() {
        if (MW.CUR_GAME_STATUS == MW.GAME_STATUS.GAME_IN) {
            this.space.step(1/60.0);
            this.score.string = MW.SCORE;
            if (this.timeStart > 0) {
                var now = new Date() - this.timeStart;
                if (MW.TIMES*1000 - now <= 0) {
                    this.gameOver = true;
                    MW.CUR_GAME_STATUS = MW.GAME_STATUS.GAME_OVER;
                    this.playOn = true;
                    this.gameOVerShow();
                } else {
                    this.time.string = this.createTimeText(window.parseInt((MW.TIMES*1000 - now)/10));
                    this.timeIcon.scaleX = (MW.TIMES*1000 - now)/(MW.TIMES*1000);
                }
            }
        }
        //游戏结束判断
        if (this.statusLayer.curbox && this.statusLayer.curbox.y < 100+this.cmheight && !this.gameOver) {
            this.gameOver = true;
            MW.CUR_GAME_STATUS = MW.GAME_STATUS.GAME_OVER;
            this.playOn = true;
            this.gameOVerShow();
        }
    },
    collisionBegin: function (arbiter, space) {
        var shapes = arbiter.getShapes();

        var shapeA = shapes[0];
        var shapeB = shapes[1];

        var collTypeA = shapeA.collision_type;
        var collTypeB = shapeB.collision_type;

        if (collTypeA == 1) {
            this.processEvent();
            shapeA.setCollisionType(2);
        }
        return true;
    },
    collisionPre : function () {
        return true;
    },
    collisionPost: function () {
        return true;
    },
    collisionSeparate : function() {
        return true;
    },
    processEvent: function() {
        this.statusLayer.y -= MW.BLOCK_HEIGHT-40;
        this.cmheight += MW.BLOCK_HEIGHT-40;
        this.statusLayer.cmhight += MW.BLOCK_HEIGHT-40;
        this.playOn = false;
        this.bgLayer.y = -this.cmheight;

        this.topBox.visible = true;
    },
    playEvent: function(event) {

        if (MW.REMAIN <= 0) {
            alert('没有机会了');
            return ;
        }
        //1.游戏进行中 2. 积木层已经创建 3.积木可以降落
        if (MW.CUR_GAME_STATUS == MW.GAME_STATUS.GAME_IN && this.statusLayer && !this.playOn) {
            this.playOn = true;
            this.topBox.visible = false;

        // 注意点 math 的三角函数参数是弧度，不是角度 . 获取当前旋转的角度去计算新下落积木对象的位置
            if (this.topSprite.rotation >= 0) {
                var levelWidth = this.topSprite.height*Math.sin(this.topSprite.rotation*Math.PI/180);
                var levelHeight = this.topSprite.height*Math.cos(this.topSprite.rotation*Math.PI/180);
                this.statusLayer.initRandomBlock(this.topSprite.x-levelWidth, this.topSprite.y-levelHeight);
            } else {
                levelWidth = this.topSprite.height*Math.sin(-this.topSprite.rotation*Math.PI/180);
                levelHeight = this.topSprite.height*Math.cos(-this.topSprite.rotation*Math.PI/180);
                this.statusLayer.initRandomBlock(this.topSprite.x+levelWidth, this.topSprite.y-levelHeight);
            }

            MW.SCORE += MW.LEVEL_UP_EVERY;

            //timeStart为0时，说明游戏还是第一次点击，必须记录当前的开始时间
            if (this.timeStart == 0) {
                this.timeStart = new Date();
            }
        }
    },
    /**
     *  游戏顶部的旋转积木的创建，直接是个贴图，不用是物理对象
     */
    initTopSprite: function() {
        // 顶部动画的积木
        this.topSprite = new cc.Sprite(res.top_png);
        this.addChild(this.topSprite, 2);
        this.topSprite.attr({anchorX:0.5, anchorY: 1, x: cc.visibleRect.width/2-5, y: cc.visibleRect.height-220});

        this.topBox = new cc.Sprite(res.jimu_png);
        this.topBox.attr({anchorX: 0.5, anchorY: 0, x: this.topSprite.width/2, y: 2});
        this.topSprite.addChild(this.topBox, 1);

        var rotate_1 = new cc.RotateTo(0.6, 30);
        var rotate_2 = new cc.RotateTo(0.6, 0);
        var rotate_3 = new cc.RotateTo(0.6, -30);

        var action = new cc.RepeatForever(new cc.Sequence(rotate_1, rotate_2, rotate_3, rotate_2));

        this.topSprite.runAction(action);
    },
    /**
     *  设置当前的界面上的一些文字
     */
    initCurScore: function() {
        //当前分数
        var scoreSprite = new cc.Sprite(res.score_png);
        this.addChild(scoreSprite, 3);
        scoreSprite.attr({anchorX: 0.5, anchorY: 0.5, x: cc.visibleRect.width/2, y: cc.visibleRect.height-250});
        this.score = new cc.LabelTTF(MW.SCORE, "Arial", 90);
        this.score.color = cc.color(244,90,19);
        this.score.attr({anchorX: 0.5, anchorY: 0.5, x: scoreSprite.width/2, y: scoreSprite.height/2-20});
        scoreSprite.addChild(this.score);

        this.remain = new cc.LabelTTF("您还能玩"+MW.REMAIN+"次", "Arial", 30);
        this.remain.attr({anchorX: 0.5, anchorY: 0.5, x: scoreSprite.width/2, y: 40});
        scoreSprite.addChild(this.remain);
    },
    /**
     *  时间的动画设置，通过设置中间图标的scaleX值来模拟时间进度动画
     */
    initTimeStatue: function() {
        var timeSprite = new cc.Sprite(res.time_png);
        this.addChild(timeSprite, 3);
        timeSprite.attr({anchorX: 1, anchorY: 1, x: cc.visibleRect.width-40, y: cc.visibleRect.height-50});
        this.time = new cc.LabelTTF(this.createTimeText(MW.TIMES*100), "Arial", 28);

        timeSprite.addChild(this.time);
        this.time.attr({anchorX: 0.5, anchorY: 0.5, x: timeSprite.width-60, y: timeSprite.height/2});
        this.timeIcon = new cc.Sprite(res.time_icon_png);
        timeSprite.addChild(this.timeIcon, 0);
        this.timeIcon.attr({anchorX: 0, anchorY: 0.5, x:57, y: timeSprite.height/2-1});
        this.timeIcon.scaleX = 1;
    },
    /**
     *
     */
    gameOVerShow: function() {
        var text = "关注我们公众号，与朋友一起玩游戏吧。";

        var gameOverLayer = new GameOverLayer(MW.REMAIN-1, MW.SCORE, text);
        this.addChild(gameOverLayer, 5);
        gameOverLayer.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});

        this.gameRestart();
    },
    gameRestart: function() {
        MW.SCORE = 0;
    },
    createTimeText: function(n) {
        var text = (100000 + n + '').substr(-4, 4);
        text = text.substr(0, 2) + "'" + text.substr(2) + "''";
        return text;
    }
});
/**
 * 通过主界面层传space过来，使得积木层和主界面层的 两层的物理对象可以产生相互作用的。
 * initPhysics 初始化物理空间，同时设置一个固定在底部的一个刚体
 * initDebugMode 开启物体形状测试
 * initBoxWithBody 初始化一个固定的积木在游戏底部，由于之前在底部设置了一个固定的刚体，所以积木是不会掉下去的
 *      这边有个注意的一点，由于积木的搭建需要有两张的图片的重叠，就通过设置对象的物理形状高度小于图片的高度
 * initRandomBlock 通过x,y位置创建出一个新的积木对象
 */

var StatusLayer = cc.Layer.extend({
    space: null,
    cmhight: 0,
    curbox: null,

    ctor: function(space) {
        this.space = space;
        this._super();
    },
    onEnter: function() {
        this._super();

        this.initPhysics();
        this.initBoxWithBody();

        this.bgLayer = new cc.Sprite(res.bg_png);
        this.bgLayer.scale = MW.SCALE;
        this.bgLayer.attr({anchorX: 0, anchorY: 0, x: 0, y: 0});
        this.addChild(this.bgLayer, 0);
    },
    initPhysics: function () {
        var space = this.space;
        var staticBody = space.staticBody;

        //开启物体形状测试
        //this.initDebugMode();
        if (cc.sys.os.toLowerCase() === "android") {
            space.gravity = cp.v(0, -6000);
        } else {
            space.gravity = cp.v(0, -2500);
        }
        space.sleepTimeThreshold = 0.5;
        space.collisionSlop = 0.5;

        var bottomShape = new cp.SegmentShape(staticBody, cp.v(0,0), cp.v(winSize.width,0), 0-1 );
        bottomShape.setElasticity(1); // 弹性
        bottomShape.setFriction(1);  //  摩擦力
        bottomShape.setCollisionType(3);
        bottomShape.setLayers(1);
        space.addShape(bottomShape);
    },
    initDebugMode: function () {
        this._debugNode = cc.PhysicsDebugNode.create(this.space);
        this.addChild(this._debugNode);
    },
    initBoxWithBody: function () {
        var body = new cp.Body(Infinity, Infinity);
        body.nodeIdleTime = Infinity;
        body.setPos(cc.p(winSize.width/2, MW.LEVEL_HEIGHT+2));

        var shape = new cp.BoxShape(body, MW.BLOCK_WIDTH, MW.BLOCK_HEIGHT-40);
        shape.setElasticity(1);
        shape.setFriction(0.5);
        shape.setLayers(2);
        shape.setCollisionType(2); // 不同刚体时设置不同的值
        this.space.addShape(shape);

        var texture = cc.textureCache.addImage(res.jimu_png);
        var block = new cc.PhysicsSprite(texture);
        block.setBody(body);
        this.addChild(block, 1);
    },
    initRandomBlock: function(offsetx, offsetY) {
        var _this = this;
        var mass = 1;

        var body = new cp.Body(mass, cp.momentForBox(mass, MW.BLOCK_WIDTH, MW.BLOCK_HEIGHT));
        body.setPos(cc.p(offsetx, offsetY+_this.cmhight));
        _this.space.addBody(body);
        var shape = new cp.BoxShape(body, MW.BLOCK_WIDTH, MW.BLOCK_HEIGHT-40);
        shape.setElasticity(0);
        shape.setFriction(1);
        shape.setCollisionType(1); // 不同刚体时设置不同的值
        shape.setLayers(3);
        _this.space.addShape(shape);

        //创建一个箱子
        var v_texture = cc.textureCache.addImage(res.jimu_png);
        _this.curbox = cc.PhysicsSprite.create(v_texture, cc.rect(0, 0, MW.BLOCK_WIDTH, MW.BLOCK_HEIGHT));
        _this.curbox.setBody(body);
        _this.addChild(_this.curbox, 1);
        _this.curbox.setTag(103);
    },
});

var DaJiMuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});