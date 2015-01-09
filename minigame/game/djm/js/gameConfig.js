/**
 * Created by weishuwen on 2015/1/8.
 *
 *  游戏的一些配置
 */
var MW = MW || {};

//分数
MW.SCORE = 0;

//游戏状态
MW.GAME_STATUS = {
    GAME_START : 0,
    GAME_IN : 1,
    GAME_OVER: 2
};

MW.SCALE = 720 / 720;
MW.TIMES = 30;
MW.REMAIN = 4;

//游戏当前状态
MW.CUR_GAME_STATUS = MW.GAME_STATUS.GAME_START;

MW.LEVEL_UP_EVERY = 10;          //等级加分

MW.BLOCK_WIDTH = 181;           //BLOCK的宽
MW.BLOCK_HEIGHT = 151 ;           //BLOCK的高

MW.LEVEL_HEIGHT = 200;
MW.TOP_HEIGHT = 389;