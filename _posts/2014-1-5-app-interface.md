---
layout: post
title: php开发app接口学习整理
description: App接口的定义、通信的数据格式、封装接口数据、缓存技术、定时任务。
category: blog
---
##1.APP接口介绍
PHP面向对象的接口:抽象方法--interface

App（通信）接口定义

    接口地址： http
    接口文件： api.php处理一些业务逻辑
    接口数据
    
###App通信
    B/S --- Browse/Server 浏览器/服务器模式
    C/S --- Client/Server 客户端/服务器模式
    通信格式 XML JSON
    
####通信数据格式xml/json区别
    1、xml数据可读性强
    2、使用php生成json数据简单（json_encode），生成xml数据比较复杂
    3、json数据简洁、更有利于传输
    
###App接口做事
    1、获取数据:从数据库中或者缓存中获取数据，然后通过接口数据返回给客户端
    2、提交数据:通信接口提交数据给服务器，然后服务器入库处理，或者其他处理。
    
####一个应用的基本
    1.版本升级接口（提交+获取）
    2.获取数据接口
    3.提交数据接口（反馈，交互）

##2.封装接口数据
    1、json方式封装接口数据方法
    2、xml方法封装接口数据方法
    3、综合通信方式封装
    
###PHP生成JSON数据
    方法：json_encode($value)
    注意：该函数只能接受utf-8编码的数据，如果传递其他格式的数据该函数会返回null
    字符编码转变函数 iconv（'utf8','gbk',$date）;
    
###通信数据标准格式
    code：状态码；(200,400等)
    message：提示信息； (邮箱格式不正确；数据成功)
    data：数据
    
###PHP生成XML数据
    组装字符串
    生成xml三个类：DomDocument，XMLWriter，SimpleXML
    // header('Content-Type: text/xml');
    <?xml version='1.0' encoding='UTF-8'?>
    <root>
        <code>200</code>
        <message>数据返回成功</message>
        <data>
            <id>1</id>
            <name>wsw</name>
        </data>
    </root>
    
代码:

    <?php
    class Response {
    	const JSON = "json";
    	/**
    	* 按综合方式输出通信数据
    	* @param integer $code 状态码
    	* @param string $message 提示信息
    	* @param array $data 数据
    	* @param string $type 数据类型
    	* return string
    	*/
    	public static function show($code, $message = '', $data = array(), $type = self::JSON) {
    		if(!is_numeric($code)) {
    			return '';
    		}
    
    		$type = isset($_GET['format']) ? $_GET['format'] : self::JSON;
    
    		$result = array(
    			'code' => $code,
    			'message' => $message,
    			'data' => $data,
    		);
    
    		if($type == 'json') {
    			self::json($code, $message, $data);
    			exit;
    		} elseif($type == 'array') {
    			var_dump($result);
    		} elseif($type == 'xml') {
    			self::xmlEncode($code, $message, $data);
    			exit;
    		} else {
    			// TODO
    		}
    	}
    	/**
    	* 按json方式输出通信数据
    	* @param integer $code 状态码
    	* @param string $message 提示信息
    	* @param array $data 数据
    	* return string
    	*/
    	public static function json($code, $message = '', $data = array()) {
    		
    		if(!is_numeric($code)) {
    			return '';
    		}
    
    		$result = array(
    			'code' => $code,
    			'message' => $message,
    			'data' => $data
    		);
    
    		echo json_encode($result);
    		exit;
    	}
    
    	/**
    	* 按xml方式输出通信数据
    	* @param integer $code 状态码
    	* @param string $message 提示信息
    	* @param array $data 数据
    	* return string
    	*/
    	public static function xmlEncode($code, $message, $data = array()) {
    		if(!is_numeric($code)) {
    			return '';
    		}
    
    		$result = array(
    			'code' => $code,
    			'message' => $message,
    			'data' => $data,
    		);
    
    		header("Content-Type:text/xml");
    		$xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
    		$xml .= "<root>\n";
    
    		$xml .= self::xmlToEncode($result);
    
    		$xml .= "</root>";
    		echo $xml;
    	}
    
    	public static function xmlToEncode($data) {
    
    		$xml = $attr = "";
    		foreach($data as $key => $value) {
    			if(is_numeric($key)) {
    				$attr = " id='{$key}'";
    				$key = "item";
    			}
    			$xml .= "<{$key}{$attr}>";
    			$xml .= is_array($value) ? self::xmlToEncode($value) : $value;
    			$xml .= "</{$key}>\n";
    		}
    		return $xml;
    	}
    
    }
    
##3.缓存技术:
    1.静态缓存 : 保存在磁盘上的静态文件，用PHP生成数据放入静态文件中
    2.Memcache,Redis
    
###PHP操作静态缓存：
    1.生成缓存
    2.获取缓存
    3.删除缓存
    
代码：

    <?php
    class File {
    	private $_dir; 
    
    	const EXT = '.txt';
    
    	public function __construct() {
    		$this->_dir = dirname(__FILE__) . '/files/';
    	}
    	public function cacheData($key, $value = '', $cacheTime = 0) {
    		$filename = $this->_dir  . $key . self::EXT;
    
    		if($value !== '') { // 将value值写入缓存
    			if(is_null($value)) { // 删除
    				return @unlink($filename);
    			}
    			$dir = dirname($filename);
    			if(!is_dir($dir)) {
    				mkdir($dir, 0777);
    			}
    
    			$cacheTime = sprintf('%011d', $cacheTime);
    			return file_put_contents($filename,$cacheTime . json_encode($value));
    			// 成功字节数大小，失败false
    		}
    
    		if(!is_file($filename)) {
    			return FALSE;
    		} 
    		$contents = file_get_contents($filename);
    		$cacheTime = (int)substr($contents, 0 ,11);
    		$value = substr($contents, 11);
    		if($cacheTime !=0 && ($cacheTime + filemtime($filename) < time())) {
    			unlink($filename);
    			return FALSE;
    		}
    		return json_decode($value, true);
    		
    	}
    }
    
###Mecache redis
    1.Memcache与Redis 都是用来管理数据的
    2.他们数据都是存放在内存里的
    3.Redis可以定期将数据备份到磁盘（持久化）
    4.Memcache只是简单的key/value缓存
    5.Redis不仅仅支持简单的K/V类型的数据，同时还提供LIST,SET,HASh等数据结构的存储

###Rdies 数据操作
    1.开启redis客户端
    2. set index-mk "数据"
    3. get index-mk (不存在 nil)
    4. 过期时间 setex key 10 'value'
    5. 删除缓存 del key
    
###PHP 操作Redis
    1. 安装phpredis扩展
    2. php链接redis服务-connect（127.0.0.1， 6379）
    3. set
    4. get
    5. setex('key', time, 'value')

###定时任务
    crontab//定时任务服务 (linux)
    crontab -e //编辑某个用户的cron服务
    crontab -l //列出某个用户cron服务的详细内容
    crontab -r //删除某个用户的cron服务
    分 小时 日 月 星期 命令
    *：取值范围内的数字；
    /：每
