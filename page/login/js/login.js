
var date=new Date();
date.setTime(date.getTime()-10000);
document.cookie="token=null;path=/;expires="+date.toGMTString();

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

function doLogin(){
	
	var xmlhttp = createAjax();
	var url = document.getElementById("login").getAttribute("action");
	xmlhttp.open("POST", url, true);
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				try {
					var res = eval("("+xmlhttp.responseText+")");
					if(res.success){
						var _loginer = eval("("+res.msg+")");
						window.location = _webRoot+"home.html?token="+_loginer.token;;
					}
					else{
						var hint = document.getElementById("hint");
						hint.innerHTML = res.msg;
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
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	xmlhttp.send("username="+username+"&password="+password);
	return false;
	/*
	var data = {
			"username":document.getElementById("username").value,
			"password":document.getElementById("password").value,
			"loginTime":new Date().getTime()
	};
	var option = {
			type : "post",
			url  : document.getElementById("login").getAttribute("action"),
			data : data,
			dataType : 'json',
			success : function(msg){
				if(msg.success){
					var token = eval("("+msg.msg+")").token;
					document.cookie = "token="+token+";path=/";
					window.location = _webRoot+"home.html?token="+token;
				}
				else{
					var hint = document.getElementById("hint");
					hint.innerHTML = msg.msg;
				}
			}
	};
	$.ajax(option);
	return false;
	*/
}

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
	var ret = path.split("page/login/js")[0];
	return ret;
})();

window.onload = function(){
	var counter = 0;
	if (window.history && window.history.pushState) {
		$(window).on('popstate', function () {
			window.history.pushState('forward', null, '');
			window.history.forward(1);
		});
	}
	if(document.all){
		try{
			window.history.pushState('forward', null, '#');
			window.history.forward(1);
		}
		catch(e){
			
		}
	}
	
	document.getElementById("submit").onclick = doLogin;
};


