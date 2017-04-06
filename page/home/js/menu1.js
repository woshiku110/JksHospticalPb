
function MenuCell(icon1,icon2,text,uri){
	
	this.isSelected = false;
	
	this.domObj = document.createElement("div");
	this.content = document.createElement("div");
	
	this.domObj.className = "menuCell";
	this.content.className = "iframe_container";
	this.content.style.width = "100%";
	this.content.style.height = "100%";
	this.content.style.display = "none";
	
	var cellBody = document.createElement("div");
	var triangle = document.createElement("div");
	var menuIcon = document.createElement("span");
	var menuText = document.createElement("span");
	
	this.domObj.appendChild(cellBody);
	this.domObj.appendChild(triangle);
	cellBody.appendChild(menuIcon);
	cellBody.appendChild(menuText);
	
	cellBody.className = "cellBody";
	triangle.className = "triangle";
	menuIcon.className = "menuIcon";
	menuText.className = "menuText";
	
	triangle.style.display = "none";
	menuIcon.style.backgroundImage = "url('"+ _webRoot+icon1 +"')";
	menuText.innerHTML = text;
	
	var self = this;
	

	this.loseSelected = function(){
		cellBody.className = "cellBody";
		menuIcon.style.backgroundImage = "url('"+ _webRoot+icon1 +"')";
		menuText.style.color = "#BBB";
		triangle.style.display = "none";
		self.isSelected = false;
	};
	cellBody.onmouseover = function(){
		if(self.isSelected)
			return;
		menuIcon.style.backgroundImage = "url('"+ _webRoot+icon2 +"')";
		menuText.style.color = "#FFF";
	};
	cellBody.onmouseout = function(){
		if(self.isSelected)
			return;
		menuIcon.style.backgroundImage = "url('"+ _webRoot+icon1 +"')";
		menuText.style.color = "#BBB";
	};
	
	MenuCell.currentContent = document.getElementById("welcomePage");
	var unload = true;
	cellBody.onclick = function(){
		if(self.isSelected)
			return;
		cellBody.className = "selected";
		self.isSelected = true;
		if(MenuCell.currentBar){
			MenuCell.currentBar.loseSelected();
		}
		MenuCell.currentBar = self;
		triangle.style.display = "block";
		
		MenuCell.currentContent.style.display = "none";
		MenuCell.currentContent = self.content;
		self.content.style.display = "block";
		if(unload){
			var str="<iframe src=\""+_webRoot+uri+"?token="+_token+"\" style=\"width:100%;height:100%;background:#f3f3f3;\" " +
					"frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" ></iframe>";
			self.content.innerHTML = str;
			unload=false;
		}
	};
}

function createMenu(menuDiv,contentDiv,url){
	var mdiv = document.getElementById(menuDiv);
	var cDiv = document.getElementById(contentDiv);
		
	var xmlhttp = createAjax();
	xmlhttp.open("POST", url,true);
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				try {
					msg = eval("("+xmlhttp.responseText+")");
					
					for ( var i = 0; i < msg.length; i++) {
						var cell = new MenuCell(msg[i][1],msg[i][4],msg[i][2],msg[i][3]);
						mdiv.appendChild(cell.domObj);
						cDiv.appendChild(cell.content);
					}
					mdiv.appendChild(document.createElement("br"));
					mdiv.appendChild(document.createElement("br"));
					mdiv.appendChild(document.createElement("br"));
					mdiv.appendChild(document.createElement("br"));
				} catch (e) {
				}
			}
			else{
				console.log("获取菜单信息失败：" + xmlhttp.status);
			}
		}
	};
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("pid=0");
}




