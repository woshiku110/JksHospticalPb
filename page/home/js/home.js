

if(_loginer.id == undefined){
	//window.location.href = _webRoot+"page/login/login.html";
}

window.onload = function(){
	
	var name = document.getElementById("xingming");
	name.innerHTML = _loginer.name;
	createMenu("menu","content", _serverHome + "system/getMenulist");
	disableBackButton();
	var muenPanel = document.getElementById("menu");
	muenPanel.style.top = "0px";
	
	muenPanel.onwheel=function(event){
		var h = this.offsetHeight;
		var ph = this.parentNode.offsetHeight;
		if(ph>=h)
			return;
		
		var wheel = (event.wheelDelta/120) || (-1*event.deltaY/3);
		var abswheel = wheel;
		if(wheel<0){
			abswheel = -wheel;
			wheel = -1;
		}
		else
			wheel = 1;
		
		var panel = this;
		var inter = {count:{}};
		for(var i=0;i<abswheel;i++){
			inter[i] = setInterval(function(){
				if(inter.count[i] == undefined){
					inter.count[i] = 0;
				}
				if(inter.count[i]>=12){
					clearInterval(inter[i]);
					return;
				}
				inter.count[i]++;
				panel.style.top = parseInt(panel.style.top.replace("px",""))+wheel*8+"px";
				var newTop = parseInt(panel.style.top.replace("px",""));
				if(newTop>0){
					panel.style.top = "0px";
				}
				if(newTop+h<ph){
					panel.style.top = ph-h+"px";
				}
				
			},17);
		}
	};
	muenPanel.onmousewheel = muenPanel.onwheel;
};

window.onresize  = function(){
	var menu = document.getElementById("menu");
	var h = menu.offsetHeight;
	var ph = menu.parentNode.offsetHeight;
	if(ph>=h){
		menu.style.top = "0px";
		return;
	}
	var newTop = parseInt(menu.style.top.replace("px",""));
	if(newTop+h<ph){
		menu.style.top = ph-h+"px";
	}
}

function logout(){
	var date=new Date();
	date.setTime(date.getTime()-10000);
	document.cookie="token="+_token+";path=/;expires="+date.toGMTString();
	goTo("page/login/login.html");
};