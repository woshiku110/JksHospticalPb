var currentAbsPath = (function(){
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
	return path.split("dialog.js")[0];
})();

document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+currentAbsPath+"dialog.css\"></link>");

function Dialog(width,height){
	var _width = typeof(width)=="number"?width:300;
	var _height = typeof(height)=="number"?height:200;
	var _title = "";
	var _body = "";
	var _bodyOldOverflow = "scroll";
	var _windowOldOnresize = null;
	var _page = false;
	var _needMask = true;
	var _haveBorder = true;
	var _border = 0;
	
	var _view_mask = null;
	var _view_border = null;
	var _view_container = null;

	function getWindowTopScroll(){
	    var win = window;
	    var doc = document.documentElement;
	    return {x: win.scrollX || win.pageXOffset || doc.scrollLeft,
	    	    y:win.scrollY || win.pageYOffset || doc.scrollTop};
	}
	function getWindowTopInner(){
		var win = window;
	    if(win.innerHeight!= undefined){
	        return {x:win.innerWidth,
	        	    y:win.innerHeight};
	    }
	    else{
	        return {x:win.document.documentElement.clientWidth,
	        	   y:win.document.documentElement.clientHeight};
	    }
	}

	this.setTitle = function(title){
		_title = title;
		return this;
	};
	this.setBody = function(body){
		_page = false;
		_body = body;
		return this;
	};
	this.setPage = function(url){
		_page = true;
		_body = url;
		return this;
	};
	this.needMask = function(need){
		if(typeof(need)=="boolean"){
			_needMask = need;
		}
		return this;
	};
	this.setBorder = function(border){
		if(typeof(border)=="number"){
			if(border>=0)
				_border = border;
			else{
				_border = 0;
				_haveBorder = false;
			}
		}
		return this;
	};
	this.close = function(){
		var body = window.document.body;
		if(_needMask)
			body.style.overflow = _bodyOldOverflow;
		if(_view_container!=null)
			_view_container.parentNode.removeChild(_view_container);
		if(_view_border!=null)
			_view_border.parentNode.removeChild(_view_border);
		if(_view_mask!=null)
			_view_mask.parentNode.removeChild(_view_mask);
		window.onresize = _windowOldOnresize;
	};
	this.destory = this.close;
	this.show = function(){
		var titleBar=null;
		var button=null;
		var title=null;
		var body = window.document.body;
		if(_needMask){
			_view_mask = document.createElement("div");
			_view_mask.className = "dialog_mask";
			_view_mask.style.width = "100%";
			_view_mask.style.height = "100%";
			_view_mask.style.position = "fixed";
			_view_mask.style.left = getWindowTopScroll().x+"px";
			_view_mask.style.top =getWindowTopScroll().y+"px";
			_bodyOldOverflow = body.style.overflow;
			body.style.overflow= "hidden";
		}
		if(_haveBorder){
			_view_border = document.createElement("div");
			_view_border.className = "dialog";
			_view_border.style.position = "fixed";
			_view_border.style.width = _width+_border*2 +"px";
			_view_border.style.height = _height+_border+30 +"px";
			_view_border.style.left = (getWindowTopInner().x -_width)/2-_border + getWindowTopScroll().x + "px";
			_view_border.style.top  = (getWindowTopInner().y -_height)/2-30 + getWindowTopScroll().y + "px";
			
			titleBar = document.createElement("div");
			titleBar.style.width = "100%";
			titleBar.style.height = "30px";
			titleBar.style.position = "absolute";
			titleBar.style.left = "0px";
			titleBar.style.top  = "0px";
			titleBar.style.lineHeight = "30px";
			
			title = document.createElement("a");
			title.innerHTML = _title;
			title.className = "dialog_title";
			title.style.display = "inline-block";
			title.style.maxWidth = _width-40+"px";
			title.style.overflow = "hidden";
			
			button = document.createElement("a");
			button.innerHTML="×";
			button.className = "dialog_colseButton";
			button.style.display = "block";
			button.style.marginRight = "6px";
			button.style.marginTop = "6px";
			button.style.float = "right";
			button.style.width = "18px";
			button.style.height = "18px";
			button.style.lineHeight = "18px";
			button.style.fontSize = "18px";
			button.style.fontWeight = "900";
			button.style.textAlign = "center";
			button.style.cursor = "pointer";
			
			button.onclick = this.close;
		}
		_view_container = document.createElement("div");
		_view_container.className = "dialog_container";
		_view_container.style.position = "fixed";
		_view_container.style.width = _width +"px";
		_view_container.style.height = _height +"px";
		_view_container.style.left = (getWindowTopInner().x -_width)/2 + getWindowTopScroll().x + "px";
		_view_container.style.top  = (getWindowTopInner().y -_height)/2 + getWindowTopScroll().y + "px";

		if(_needMask)
			body.appendChild(_view_mask);
		if(_haveBorder){
			titleBar.appendChild(title);
			titleBar.appendChild(button);
			_view_border.appendChild(titleBar);
			body.appendChild(_view_border);
		}
		if(_page){
			var xmlhttp = false;
		    try {
		    	xmlhttp = new XMLHttpRequest();
		    } catch(e) {
		        try {
		        	xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		        } catch(e) {
		            try {
		            	xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		            } catch(e) {
		            	_view_container.innerHTML ='你的浏览器不支持ajax';
		            }
		        }
		    }
		    _view_container.innerHTML = "加载中";
		    var loading = setInterval(function(){
		    	if(_view_container.innerHTML == "加载中...")
				    _view_container.innerHTML = "加载中";
		    	else
				    _view_container.innerHTML += ".";
		    },500);
		    if(xmlhttp){
			    xmlhttp.open("GET",_body,true);
			    xmlhttp.send();
			    xmlhttp.onreadystatechange=function()
			    {
			    	if (xmlhttp.readyState==4){
			    		clearInterval(loading);
				    	if (xmlhttp.status==200)
				    	{
				    		var cont = xmlhttp.responseText;
				    		var reg1 = new RegExp("<body.*>");
				    		var reg2 = new RegExp("</body *>");
				    		cont = cont.split(reg1)[1].split(reg2)[0];
							_view_container.innerHTML = cont;
				    	}
				    	else
				    	{
						    _view_container.innerHTML = "加载异常，状态码 "+xmlhttp.status;
				    	}
			    	}
			    };
		    }
		}
		else{
			if(typeof(_body) == "string"){
				_view_container.innerHTML = _body;
			}
			else{
				_view_container.appendChild(_body);
			}
		}
		window.document.body.appendChild(_view_container);
		_windowOldOnresize = window.onresize;
		window.onresize = function (){
			if(_haveBorder){
				_view_border.style.left = (getWindowTopInner().x -_width)/2-_border + getWindowTopScroll().x + "px";
				_view_border.style.top  = (getWindowTopInner().y -_height)/2-30 + getWindowTopScroll().y + "px";
			}
			_view_container.style.left = (getWindowTopInner().x -_width)/2 + getWindowTopScroll().x + "px";
			_view_container.style.top  = (getWindowTopInner().y -_height)/2 + getWindowTopScroll().y + "px";
			if(typeof(_windowOldOnresize) == "function"){
				_windowOldOnresize();
			}
		};
		
	}; 
}

Dialog.HINT = function(ico,msg,width){
	
	var div = document.createElement("div");
	var img = document.createElement("img");
	var span = document.createElement("span");
	
	div.style.lineHeight = "100px";
	div.style.TextAlign = "center";
	div.style.width = "100%";
	div.style.height = "100px";
	img.src = ico;
	img.style.width = "50px";
	img.style.height = "50px";
	img.style.margin = "25px 20px";
	span.innerHTML = (msg==null?"操作成功":msg);
	span.style.fontSize = "20px";
	span.style.fontWeight = "900";
	span.style.verticalAlign = "top";

	div.appendChild(img);
	div.appendChild(span);
	
	var s = new Dialog(typeof(width)=="number"?width:200, 100);
	s.setBorder(-1);
	s.needMask(false);
	s.setBody(div);
	s.show();
	setTimeout(function(){
		s.close();
	},700);
};

Dialog.SUCCESS = function(msg,width){	
	Dialog.HINT(currentAbsPath+"icon/yes.gif",msg,width);
};

Dialog.FAIL = function(msg,width){	
	Dialog.HINT(currentAbsPath+"icon/no.gif",msg==null?"操作失败":msg,width);
};






