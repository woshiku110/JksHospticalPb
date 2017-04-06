//服务器项目地址
var _serverHome = "http://192.168.0.202:8080/jfs1.1/";
var _pid ;
var _healthMessage_token;
//拿到url的参数
function getParam(paramName) {
	paramValue = "";
	isFound = false;
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
		i = 0;
		while (i < arrSource.length && !isFound) {
			if (arrSource[i].indexOf("=") > 0) {
				if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
					paramValue = arrSource[i].split("=")[1];
					isFound = true;
				}
			}
			i++;
		}
	}
	return paramValue;
}

//页面资源的绝对地址前缀
var _webRoot = (function(){
	var stack=null,path = null;
	try {
		path = document.currentScript.src;
	} catch (e) {
		stack = e.stack || e.sourceURL || e.stacktrace;
	}
	if(path == null){
		var rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/, 
		absPath = rExtractUri.exec(stack);
		try {
			path = absPath[0] || '';
		} catch (e) {
		}
		if(path==null){
			var scripts = document.scripts;
			var isLt8 = ('' + document.querySelector).indexOf('[native code]') === -1;
			for (var i = scripts.length - 1, script; script = scripts[i--];){
				if (script.readyState === 'interactive'){
					path = isLt8 ? script.getAttribute('src', 4) : script.src;   
				}
			}
		}
	}
	var ret = path.split("common/js/util.js")[0];
	if(ret.indexOf("file://")!=0)
		_serverHome = ret;
	return ret;
})();

//图床URI
var _filePath = "http://192.168.0.202:8080/File/filebed/";
var _fileUpPath = "http://192.168.0.202:8080/File/uploadFile";

//用户登录凭证
var _token = (function(){
	var ret ;
	try{
		ret= window.top._token;
	}catch(e){
	}
	if(ret != undefined)
		return ret;
	
	var cookies = document.cookie.split(";");
	if(cookies!=null && cookies.length!=0){
		var reg = new RegExp("^ *token *=.*");
		for ( var i = 0; i < cookies.length; i++) {
			if(cookies[i].search(reg)==0){
				return cookies[i].substring(cookies[i].indexOf("=")+1);
			};
		}
	}
	var query = window.location.search;
	if(query.indexOf("?")==0)
		query = query.substring(1);
	var paras = query.split("&");
	for ( var i = 0; i < paras.length; i++) {
		var para = paras[i].split("=");
		if(para[0]=="token"){
			return para[1];
		}
	}
	return "";
})();
console.log("token="+_token);
//登录用户对象
var _loginer = {
		id:null,
		token:"",
		name:"游客",
		username:"游客",
		phone:"",
		email:"",
		state:null,
		logo:"logo.png",
		};
(function(){
	try{
		_loginer = window.top._loginer;
	}catch(e){
	}
	if(_loginer.id != null)
		return;
	
	var xmlhttp = createAjax();
	xmlhttp.open("POST", _serverHome+"upms/getMyInfo",false);
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				try {
					res = eval("("+xmlhttp.responseText+")");
					if(res.success){
						_loginer = eval("("+res.msg+")");
						_token = _loginer.token;
					}
				} catch (e) {
				}
			}
			else{
				console.log("获取用户的信息失败：" + xmlhttp.status);
			}
		}
	};
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("token="+_token);
})();
console.log("token="+_token);
/**
 * 创建一个原生的AJAX对象
 */
function createAjax() {
	var tel = false;
	try {
		tel = new XMLHttpRequest();
	} catch(e) {
		try {
			tel = new ActiveXObject('Msxml2.XMLHTTP');//ie8
		} catch(e) {
			try {
				tel = new ActiveXObject('Microsoft.XMLHTTP');
			} catch(e) {
				alert('你的浏览器不支持ajax');
			}
		}
	}
	return tel;
}

/**
 * 获的页面占用屏幕的实际尺寸
 * @param win 要获取的页面的window对象，默认当前页面
 * @returns ret.x表示页面显示的实际宽度，ret.y表示页面显示的实际高度
 */
function getWindowSize(win){
	win = win || window;
	if(win.innerHeight!= undefined){
		return {x:win.innerWidth,
			y:win.innerHeight};
	}
	else{
		return {x:win.document.documentElement.clientWidth,
			y:win.document.documentElement.clientHeight};
	}
}

/**
 * 在某个窗口中显示指定页面,需要页面加载完成
 * @param uri 相对于 _webRoot 的地址
 * @param win 窗口对应的window对象，默认当前窗口
 */
function goTo(uri,win){
	win = win || window;
	var url = _webRoot + uri;
	var ua = navigator.userAgent;
	var rl = document.createElement('a');
	rl.href= url;
	win.document.body.appendChild(rl);
	rl.click();
	win.document.body.removeChild(rl);
}

/**
 * 禁用浏览器在某个页面的返回按钮
 * @param win 页面对应的window对象，默认当前页面
 */
function disableBackButton(win){
	var counter = 0;
	win = win || window;
	if (win.history && win.history.pushState) {
		$(win).on('popstate', function () {
			win.history.pushState('forward', null, '');
			win.history.forward(1);
		});
	}
	win.history.pushState('forward', null, ''); //在IE中必须得有这两行
	win.history.forward(1);
}

/**
 * 加载 JS 文件
 * @param fileUri 文件相对webRoot的路径
 */
function loadJS(fileUri )
{
	var oHead = document.getElementsByTagName('HEAD').item(0); 
	var oScript= document.createElement("script"); 
	oScript.type = "text/javascript"; 
	oScript.src= _webRoot + fileUri ; 
	oHead.appendChild( oScript); 
}



