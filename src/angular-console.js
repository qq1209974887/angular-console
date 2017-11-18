
;(function(){
"use strict";
	var app = angular.module('ngConsole',[])
		.service("$console",console);
	console.$inject = ["$http","mode","isLogTips"];
	
	function console($http,mode,isLogTips) {
		return {
			/*常用console输出*/
			log: function () {
				this.logType("log",arguments);
			},
			info: function () {
				this.logType("info",arguments);
			},
			warn: function () {
				this.logType("warn",arguments);
			},
			error: function () {
				this.logType("error",arguments);
			},
			count: function () {
				this.logType("count",arguments);
			},
			assert: function () {
				/*语法：$console.group(boolean，obj);*/
				this.logType("assert",arguments);
			},
			debug: function () {
				/* TODO 尚无法使用*/
			},
			clear: function () {
				this.logType("clear");
			},
			group: function () {
				/*语法：$console.group();*/
				this.logType("group");
			},
			groupCollapsed: function () {
				/*语法：$console.groupCollapsed();*/
				this.logType("groupCollapsed");
			},
			groupEnd: function () {
				/*语法：$console.groupEnd();*/
				this.logType("groupEnd");
			},
			dir: function () {
				/*语法：$console.dir(Object);*/
				this.logType("dir",arguments);
			},
			dirxml: function () {
				/*语法：$console.dirxml(Object);*/
				this.logType("dirxml",arguments);
			},
			table: function () {
				/*语法：$console.table(Object);*/
				this.logType("table",arguments);
			},
			time: function () {
				/*语法：$console.time(label);*/
				this.logType("time",arguments);
			},
			timeEnd: function () {
				/*语法：$console.timeEnd(label);*/
				this.logType("timeEnd",arguments);
			},
			timeStamp: function () {
				/*语法：$console.timeStamp(label);*/
				this.logType("timeStamp",arguments);
			},
			profile: function () {
				/*语法：$console.timeStamp(profileName);*/
				this.logType("profile",arguments);
			},
			profileEnd: function () {
				/*语法：$console.profileEnd(profileName);*/
				this.logType("profileEnd",arguments);
			},
			trace: function () {
				/*语法：$console.trace();*/
				this.logType("trace");
			},
			
			/*$console服务公用方法调用*/
			logType: function (type, obj) {
				/*根据mode的值，确定是否隐藏console信息输出*/
				if (mode === 'release') {
					return null;
				} else {
					/*TODO 通过ajax请求获取css样式并赋值给style*/
					var console = window.console || {},
						logFn = console[type] || console.log,
						style = $http.get("../assets/file/css.json").then(function success(data) {
							var ret = data.data;
							return ret;
						});
					style.style2 = "padding:100px 10px;line-height:200px;background:url('http://chuantu.biz/t6/144/1511022273x2728278961.png') no-repeat";
						
					/*提示仅在页面中第一次使用的时候进行提示*/
					if (isLogTips === true) {
						console.info("%c$console服务专门用于Angular，使用方法同原生console方法完全一致，详情可参考" 
					   		+ "http://www.css88.com/doc/chrome-devtools/console/console-reference/"
					   		+ "，或Opra官方文档：http://www.opera.com/dragonfly/documentation/console/"
					   		+ "，或Chrome官方文档：https://developers.google.com/web/tools/chrome-devtools/console/console-reference"
					   		+ "，因console的许多特性属于非标准规范，生产环境请谨慎使用。",
					   		"background: linear-gradient(to top,#FCAA40,#FF8E00,#FCAA40);color: #eee;padding: 8px 0;line-height:32px;font-size: 16px;text-indent: 2em;text-align:left");
				   		isLogTips = false;
					}
					
					if (obj) {
						if (type === ("dir" || "dirxml")) {
							if (obj.length < 2 && typeof obj[0] === "object" && obj[0] !== null) {
								console[type].apply(console, obj);
							} else {
								console.error("请遵守dir或dirxml语法：console.dir(object)或console.dirxml(object);");
							}
						} else if (type === "table") {
							if (obj.length < 2 && typeof obj[0] === "object" && obj[0] !== null) {
								console[type].apply(console, obj);
							} else {
								console.error("请遵守table语法：console.table(object);");
							}
						} else if (type === "assert") {
							if (typeof obj[0] === "boolean") {
								console[type].apply(console, obj);
							} else {
								console.error("请遵守assert语法：console.assert(boolean,obj)");
							}
						} else {
							console[type].apply(console, obj);
						}
					} else {
						console[type].apply(console);
					}
					console.log("%c                                                                 "
					     + "                 ",style.style2);
			   		return logFn;
				}
			}
		};
	}

})();