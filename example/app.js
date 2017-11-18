var app = angular.module("app",["ngConsole"]);
			
/*切换开发模式release和debug，一键隐藏或展示所有的console输出信息*/
app.constant("mode","debug");

//设置提示查看console api文档仅在页面初始化加载或刷新页面的时候出现1次
app.value("isLogTips",true);

app.controller("testCtrl",testCtrl);
testCtrl.$inject = ["$console"];
function testCtrl ($console) {
	var vm = this;
	var obj = "李小明";
	var obj1 = 100;
	var obj2 = false;
	var obj3 = null;
	var obj4 = ["第一次滚出去","第2次滚出去","第3次滚出去"];
	var obj5 = {id:1,name: '李小明',alias: '狗蛋'};
	
	//log服务
	$console.log(obj);
	$console.log(obj,obj1,obj2,obj3,obj4,obj5);
	//info服务
	$console.info(obj);
	$console.info(obj,obj1,obj2,obj3,obj4,obj5);
	//warn服务
	$console.warn(obj);
	$console.warn(obj,obj1,obj2,obj3,obj4,obj5);
	//error服务
	$console.error(obj);
	$console.error(obj,obj1,obj2,obj3,obj4,obj5);
	//group服务
	$console.group();
	//assert断言服务
	$console.assert(obj2,obj);
	$console.assert(obj2,obj,obj3,obj4,obj5);
	$console.assert(true,obj);
	//groupCollapsed服务
	$console.groupCollapsed();
	//count统计执行多少次的服务
	$console.count(obj);
	//clear服务
//	$console.clear();
	//dir/dirxml服务
	$console.dir(obj4);
	$console.dir(obj5);
	$console.dir(obj4,obj5);
	$console.dirxml(obj4);
	$console.dirxml(obj5);
	$console.dirxml(obj4,obj5);
	//groupEnd服务
	$console.groupEnd();
	//table服务
	$console.table(obj4);
	$console.table(obj5);
}