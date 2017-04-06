
function changeDropDownInput(inputElement){
	if(typeof(inputElement)=="string")
		inputElement = document.getElementById(inputElement);
	if(inputElement==null || inputElement.tagName!="INPUT")
		return;
	
	if(!document.getElementById("dropDownInputDefaultStyle")){
		var defaultStyle = document.createElement("style");
		defaultStyle.id = "dropDownInputDefaultStyle";
		defaultStyle.innerHTML = 
			".inputDropDown{"+
				"border: 1px solid #666\;"+
				"border-top: 0px solid #666\;"+
				"overflow:auto\;"
				"padding: 0\;"+
				"margin: 0\;"+
			"}"+
			".dropDownItem{"+
				"background: #fff\;"+
			"}"+
			".dropDownItemHover{"+
				"background: #f0f0f0\;"+
			"}"
		;
		document.head.insertBefore(defaultStyle,document.head.firstChild);
	}
	
	
	inputElement.autoMatch = true;
	inputElement.optionList = [];
	inputElement.hitOption = {};
	inputElement.dataSource = [];
	inputElement.firstOption = {};
	
	inputElement.visibleTemplate = function(option){
		return option;
	}
	inputElement.visible = function(option){
		var o = inputElement.visibleTemplate(option);
		if(o==null)
			return "null";
		return o.toString();
	}
	
	inputElement.flush = function(){
		sethoverli(null);
		updateOptionList();
		var ul = inputElement.ul;
		if(!ul){
			try{
				inputElement.firstOption = inputElement.optionList[0] || inputElement.dataSource[0];
			}catch(e){
				inputElement.firstOption = {};
			}
			return;
		}
		ul.innerHTML = "";
		if(!inputElement.optionList || inputElement.optionList.length ==0 ){
			ul.style.display = "none";
			return;
		}
		ul.style.display = "block";
		for(var i=0;i<inputElement.optionList.length;i++){
			var str = inputElement.visible(inputElement.optionList[i]);
			var li = document.createElement("li");
			li.innerText = str; 
			ul.appendChild(li);
			if(inputElement.id)
				li.className = "dropDownItem "+inputElement.id+"_dropDownItem";
			else
				li.className = "dropDownItem";
			li.style.listStyleType = "none";
			li.option = inputElement.optionList[i];
			li.addEventListener("mouseover",function(){
				if(inputElement.chooseKeyDown)
					return;
				sethoverli(this);
			});
			li.addEventListener("mouseout",function(){
				if(inputElement.chooseKeyDown)
					return;
				sethoverli(null);
			});
			li.addEventListener("click",function(){
				inputElement.hitOption = this.option;
				inputElement.value = this.innerText;
				sethoverli(null);
				inputElement.flush();
			});
		}
		var lis = ul.childNodes;
		for(var i=0;i<lis.length;i++){
			lis[i].style.width = ul.scrollWidth+"px";
		}
		if(lis.length>0){
			inputElement.firstOption = lis[0].option;
		}
		else{
			if(inputElement.value==""){
				try{
					inputElement.firstOption = inputElement.dataSource[0];
				}catch(e){}
			}
			if(!inputElement.firstOption)
				inputElement.firstOption = {};
		}
	}
	
	inputElement.add = function(option){
		inputElement.optionList.push(option);
		inputElement.flush();
	}
	inputElement.remove = function(option){
		var arr = new Array();
		for(var i=0;i<option.length;i++){
			if(inputElement.optionList[i]!=option)
				arr.push(inputElement.optionList[i]);
		}
		inputElement.optionList = arr;
		inputElement.flush();
	}
	inputElement.clean = function(){
		inputElement.optionList = new Array();
		inputElement.flush();
	}
	
	inputElement.addEventListener("focus",function(){
		
		var ul = document.createElement("ul");
		inputElement.offsetParent.appendChild(ul);
		
		if(inputElement.id)
			ul.className = "inputDropDown "+inputElement.id+"_inputDropDown";
		else
			ul.className = "inputDropDown";
		ul.style.position = "absolute";
		ul.style.top = inputElement.offsetTop + inputElement.offsetHeight +"px";
		ul.style.left = inputElement.offsetLeft +"px";
		ul.style.width = inputElement.offsetWidth + "px";
		if(window.navigator.userAgent.indexOf("Edge")>-1)
			ul.style.width = 2*inputElement.offsetWidth-ul.offsetWidth+1 + "px";		
		else
			ul.style.width = 2*inputElement.offsetWidth-ul.offsetWidth + "px";
	
		inputElement.ul = ul;
		updateOptionList();
		inputElement.flush();
	});
	
	inputElement.addEventListener("blur",function(){
		setTimeout(function(){
			try{
				sethoverli(null);
				inputElement.offsetParent.removeChild(inputElement.ul);
			}catch(e){}
		},200);
	});
	
	window.addEventListener("resize",function(){
		if(!inputElement){
			return;
		}
		var ul = inputElement.ul;
		if(ul){
			ul.style.top = inputElement.offsetTop + inputElement.offsetHeight +"px";
			ul.style.left = inputElement.offsetLeft +"px";
		}
	},false);
	var getCurrentStyle = function(node) {
		var style = null;
		if(window.getComputedStyle) {
			style = window.getComputedStyle(node, null);
		}else{
			style = node.currentStyle;
		}
		return style;
	}
	var updateOptionList = function(){
		var dataSource = inputElement.dataSource;
		var arr = dataSource;
		var val = inputElement.value;
		if(inputElement.autoMatch && val!=""){
			if(!dataSource || dataSource.length==0)
				return;
			arr = new Array();
			for(var i=0;i<dataSource.length;i++){
				if(inputElement.visible(dataSource[i]).indexOf(val)==0)
					arr.push(dataSource[i]);
			}
			if(arr.length>0 && val==inputElement.visible(arr[0])){
				inputElement.hitOption = arr[0];
			}
			else{
				inputElement.hitOption = {};
			}
		}
		inputElement.optionList = arr;
	}
	
	inputElement.addEventListener("input",function(){
		updateOptionList();
		inputElement.flush();
	});
	
	inputElement.addEventListener("keydown",function(event){
		if(inputElement.dataSource==null){
			return;
		}
		if(event.keyCode==13 && inputElement.hoverLi){
			var li = inputElement.hoverLi;
			inputElement.hitOption = li.option;
			inputElement.value = li.innerText;
			sethoverli(null);
			updateOptionList();
			inputElement.flush();
		}
		if(event.keyCode!=38 && event.keyCode!=40)
			return ;
		inputElement.chooseKeyDown = true;
		if(inputElement.chooseKeyDownTimeout)
			clearTimeout(inputElement.chooseKeyDownTimeout);
		inputElement.chooseKeyDownTimeout = setTimeout(function(){
			inputElement.chooseKeyDown = false;
		},300);
		if(event.keyCode==38){
			if(inputElement.hoverLi==null || inputElement.hoverLi==inputElement.ul.firstChild){
				sethoverli(inputElement.ul.lastChild);
			}
			else{
				var lis = inputElement.ul.childNodes;
				for(var i=1;i<lis.length;i++){
					if(lis[i]==inputElement.hoverLi){
						sethoverli(lis[i-1]);
						break;
					}
				}
			}
			var ust = inputElement.ul.scrollTop;
			var ush = inputElement.ul.scrollHeight;
			
			var lh = inputElement.hoverLi.offsetHeight;
			var lt = inputElement.hoverLi.offsetTop;
			
			if(lt<ust){
				inputElement.ul.scrollTop = lt;
			}
			if(lt+lh+1>=ush){
				if(window.navigator.userAgent.indexOf("Firefox")>-1){
					inputElement.ul.scrollTop = inputElement.ul.scrollTopMax;
				}
				else{
					inputElement.ul.scrollTop = ush;
				}
			}
		}
		if(event.keyCode==40){
			if(inputElement.hoverLi==null || inputElement.hoverLi==inputElement.ul.lastChild){
				sethoverli(inputElement.ul.firstChild);
			}
			else{
				var lis = inputElement.ul.childNodes;
				for(var i=0;i<lis.length-1;i++){
					if(lis[i]==inputElement.hoverLi){
						sethoverli(lis[i+1]);
						break;
					}
				}
			}
			var uh = parseInt(getCurrentStyle(inputElement.ul).height.replace("px",""));
			if(window.navigator.userAgent.indexOf("Firefox")>-1){
				var horizontalScrollBarHeight = inputElement.ul.scrollTopMax 
					+ uh
					- inputElement.ul.lastChild.offsetTop
					- inputElement.ul.lastChild.offsetHeight;
					
				uh -= horizontalScrollBarHeight;
			}
			var ust = inputElement.ul.scrollTop;

			var lh = inputElement.hoverLi.offsetHeight;	
			var lt = inputElement.hoverLi.offsetTop;
		
			if(lt+lh>uh+ust){
				inputElement.ul.scrollTop = lt+lh-uh;
			}
			if(lt<=0){
				inputElement.ul.scrollTop = 0;
			}
		}
	});
	var sethoverli = function(li){
		if(inputElement.hoverLi!=null){
			inputElement.hoverLi.className = inputElement.hoverLi.className
			.replace("dropDownItemHover","")
			.replace(inputElement.id+"_dropDownItemHover","")
			.replace("  "," ").trim();
		}
		try{
			inputElement.hoverLi = li;
			
			if(inputElement.id)
				li.className += " dropDownItemHover "+inputElement.id+"_dropDownItemHover";
			else
				li.className += " dropDownItemHover";
		}catch(e){}
	}
}









