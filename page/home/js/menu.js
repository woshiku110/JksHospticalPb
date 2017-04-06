
function Menu(menuId,contentId,url){
	
	this.menu = document.getElementById(menuId);
	this.content = document.getElementById(contentId);
	
	this.allMenuCell = new Object();
	
	var superMenu = this;
	/**
	 * 可以通过菜单的ID拿到某个具体的菜单
	 */
	this.getCellById = function(id){
		return this.allMenuCell["menu"+id];
	};
	
	this.createMenuOne = function(){
		var data = getMenuData(0);
		for(var i=0;i<data.length;i++){
			//[0.id 1.ico 2.name 3.url]
			var menucell = new MenuCell(data[i][0],data[i][1],data[i][2],data[i][3],1,this);
			menucell.content = new Content(menucell.id,menucell.url,superMenu.content);
			superMenu.menu.appendChild(menucell.self);
			superMenu.allMenuCell["menu"+menucell.id] = menucell;
			menucell.addOnClickListener(function(cell){
				if(cell.url == null){
					if(cell.loaded == null){
						// 第一次点击加载二级菜单

						cell.container.style.position = "fixed";
						cell.container.style.left = "500px";
						
						cell.father.createMenuTwo(cell);

						cell.container.unfoldHeight = cell.container.offsetHeight;
						cell.container.style.height = "0px";
						cell.container.style.position = "relative";
						cell.container.style.left = "0px";
						cell.container.style.display = "block";
						cell.unfold();
						
						cell.unfolded = true;
						cell.loaded = true;
					}
					else{
						if(cell.unfolded){
							cell.fold();
						}
						else{
							cell.unfold();
						}
					}
				}
				// 显示菜单对应的内容
				else{
					if(superMenu.activeContent != null){
						superMenu.activeContent.hide();
					}
					superMenu.activeContent = cell.content;
					if(superMenu.selectMenuOne !=null){
						superMenu.selectMenuOne.unselected();
					}
					if(superMenu.selectMenuTwo!=null){
						superMenu.selectMenuTwo.unselected();
					}
					superMenu.selectMenuOne = cell;
					superMenu.selectMenuTwo = null;

					cell.selected();
					cell.content.show();
				}
			});
		};
	};
	this.createMenuTwo = function(father){
		var data = getMenuData(father.id);
		for(var i=0;i<data.length;i++){
			//[0.id 1.ico 2.name 3.url]
			var menucell = new MenuCell(data[i][0],data[i][1],data[i][2],data[i][3],2,father);
			father.container.appendChild(menucell.self);
			menucell.content = new Content(menucell.id,menucell.url,superMenu.content);
			superMenu.allMenuCell["menu"+menucell.id] = menucell;
			menucell.addOnClickListener(function(cell){
				if(cell.url == null){
					return;
				}
				// 显示菜单对应的内容
				else{
					if(superMenu.activeContent != null){
						superMenu.activeContent.hide();
					}
					superMenu.activeContent = cell.content;
					if(superMenu.selectMenuOne !=null){
						superMenu.selectMenuOne.unselected();
					}
					if(superMenu.selectMenuTwo!=null){
						superMenu.selectMenuTwo.unselected();
					}
					superMenu.selectMenuOne = cell.father;
					superMenu.selectMenuTwo = cell;

					cell.selected();
					cell.father.selected();
					cell.content.show();
				}
			});
		};
	};
	
	function getMenuData(pid) {
		var msg = [];
		var xmlhttp = false;
		try {
			xmlhttp = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');//ie8
			} catch(e) {
				try {
					xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				} catch(e) {
					alert('浏览器不支持ajax，请使用主流浏览器');
				};
			};
		}
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				msg = eval("("+ xmlhttp.responseText +")");
			}
		};
		xmlhttp.open("POST",url,false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("pid="+pid+"&querytime="+new Date().getTime());
		
		return msg;
	};

	this.createMenuOne();
}

function MenuCell(id,ico,name,url,level,father){
	this.id = id;
	this.ico = (ico==""?null:ico);
	this.name = name;
	this.url = (url==""?null:url);
	this.level = level;
	this.father = father;
	
	this.listenerList = new Array();
	this.unfolded = true;
	this.container = null;
	this.external = null;
	this.self = null;
	
	this.showUnreadMark = function(number){
		this.external.unreadMark.style.display = "block";
	};
	this.cleanUnreadMark = function(){
		this.external.unreadMark.style.display = "none";
	};
	this.addOnClickListener = function(listener){
		this.listenerList[this.listenerList.length] = listener;
	};
	
	this.fold = function(){
		var cont = this.container;
		cont.style.overflow = "hidden";
		cont.currentHeight = cont.unfoldHeight;
		var inte = setInterval(function(){
			cont.currentHeight -= 5;
			cont.style.height = cont.currentHeight+"px";
			if(cont.currentHeight<=0){
				cont.style.height = 0;
				cont.currentHeight = 0;
				clearInterval(inte);
			}
		},10);
		this.unfolded = false;
	};
	this.unfold = function(){
		var cont = this.container;
		cont.style.overflow = "hidden";
		cont.style.display = "block";
		cont.currentHeight = 0;
		var inte = setInterval(function(){
			cont.currentHeight += 5;
			cont.style.height = cont.currentHeight+"px";
			if(cont.currentHeight>=cont.unfoldHeight){
				cont.style.height = cont.unfoldHeight+"px";
				cont.currentHeight = cont.unfoldHeight;
				clearInterval(inte);
			}
		},10);
		this.unfolded = true;
	};
	this.selected = function(){
		if(this.level==1){
			this.external.className = "menuOne hitMenuOne";
		}
		if(this.level==2){
			this.external.className = "menuTwo hitMenuTwo";
		}
	};
	this.unselected = function(){
		if(this.level==1){
			this.external.className = "menuOne";
		}
		if(this.level==2){
			this.external.className = "menuTwo";
		}
	};
	this.onclickNotify = function(){
		for(var i=0;i<this.listenerList.length;i++){
			(this.listenerList[i])(this);
		};
	};
	

	var cell = this;
	(function(){
		 var cont = document.createElement('div');
		 var bar = document.createElement('a');
		 var chil = document.createElement('div');
		 var span2 = document.createElement('span');
		 var span3 = document.createElement('span');
		 
		 cont.className = "menuContainer";
		 if(cell.level==1){
			 bar.className = "menuOne";
			 span2.className = "menuOneText";
		 }else if(cell.level==2){
			 bar.className = "menuTwo";
			 span2.className = "menuTwoText";
		 }
		 chil.className = "menuChildren";
		 span3.className = "UnreadMark";
		 bar.herf = "javasrcipt:void(0)";

		 span2.innerHTML = cell.name;
		 span3.innerHTML = "●";
		 
		 cont.appendChild(bar);
		 cont.appendChild(chil);
		 
		 if(cell.ico!=null){
			 var span1 = document.createElement('span');
			 if(cell.level==1){
				 span1.className = "menuOneIcon";
			 }else if(cell.level==2){
				 span1.className = "menuTwoIcon";
			 }
			 span1.style.background = "url("+cell.ico+")";
			 span1.style.backgroundPosition = "center";
			 span1.style.backgroundRepeat = "no-repeat";
			 span1.style.backgroundSize = "100% 100%";
			 bar.appendChild(span1);			 
		 }
		 
		 bar.appendChild(span2);
		 bar.appendChild(span3);
		 
		 bar.unreadMark = span3;
		 bar.container = chil;
		 bar.inherent = cell;
		 bar.onclick = function(){
			 bar.inherent.onclickNotify();
		 };
		 
		 cell.external = bar;		 
		 cell.container = chil;
		 cell.self = cont;
	})();
}
function Content(id,url,container){
	this.id = id;
	this.url = url;
	this.loaded = false;
	this.parseContent = function(){
		if(this.url==null)
			return "";
		var str="";
		str = "<div id=\"ifdiv"+this.id+"\" class=\"iframe_container\"  style=\"width:100%;height:100%;\">";	
		str +=	"<iframe src=\""+this.url+"\" name=\"cif"+this.id+"\"  style=\"width:100%;height:100%;\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" >";
		str +=	"</iframe>";
		str +="</div>";
		return str;
	};
	this.show = function(){
		if(Content.delWelcome==null){
			try {
				var welcome = document.getElementById("welcomePage");
				console.log(welcome);
				welcome.parentElement.removeChild(welcome);
				Content.delWelcome = true;				
			} catch (e) {
			}
		}
		if(!this.loaded){
			container.innerHTML += this.parseContent();
			this.loaded = true;
		}
		else{
			document.getElementById("ifdiv"+this.id).style.display="block";
		}
	};
	this.hide = function(){
		document.getElementById("ifdiv"+this.id).style.display="none";
	};
};

