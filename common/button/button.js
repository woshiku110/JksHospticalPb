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
			for (var i = 0;i<scripts.length; i++){
				if (scripts[i].readyState === 'interactive'){
					path = isLt8 ? scripts[i].getAttribute('src', 4) : scripts[i].src;
				}
			}
		}
	}
	return path.split("button.js")[0];
})();
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+currentAbsPath+"button.css\"></link>");

function loadButtonJavaScript(){
	if(document.addEventListener){
		document.registerAllButtionCountEnd = 1;
		document.registerAllButtionCountReady = 0;
		document.addEventListener("DOMNodeInserted",function(){
			document.registerAllButtionCountReady++;
			if(document.registerAllButtionCountEnd == document.registerAllButtionCountReady){
				setTimeout(function(){
					registerAllButtion();
					document.registerAllButtionCountEnd++;
					document.registerAllButtionCountReady = document.registerAllButtionCountEnd-1;
				},10);
			}
		});
	}
	registerAllButtion();
}
function registerAllButtion(){
	var bs = document.getElementsByTagName("a");
	var patt1=new RegExp("\\bbutton\\b");
	for(var i in bs){
		if(typeof(bs[i])!="object"){
			continue;
		}
		if(bs[i].register){
			continue;
		}
		if(bs[i].className.search(patt1)==-1){
			continue;
		}
		if(bs[i].isListenAttr){
			continue;
		}
		renderButton(bs[i]);
		bs[i].setText = function(text){
			this.lastChild.textContent = text;
		}
		bs[i].getText = function(){
			return this.lastChild.textContent;
		}
		try{
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			var observer = new MutationObserver(
				function(records,itself){
					for(var i in records){
						if(records[i].render!=itself.count){
							renderButton(records[i].target);
							records[i].render=itself.count;
						}
					}
					itself.count++;
				});
			observer.count=0;
			var config = {attributes: true, childList: true};
			observer.observe(bs[i], config);
		}catch(e){
			if(document.all){
				bs[i].oldSetAttribute = bs[i].setAttribute;
				if(!bs[i]){
					bs[i].attributes = {};
				}
				bs[i].setAttribute = function(attr,newValue){
					if(this.attributes[attr]==newValue){
						return;
					}
					this.attributes[attr]=newValue;
					this.oldSetAttribute(attr,newValue);
					var it = this;
					renderButton(it);
				}
				bs[i].oldGetAttrbute = bs[i].getAttribute;
				bs[i].getAttribute = function(attr,stop){
					if(stop){
						return;
					}
					return this.attributes[attr] || this.oldGetAttrbute(attr,true);
				}
				bs[i].oldRemoveAttribute = bs[i].removeAttribute;
				bs[i].removeAttribute = function(attr){
					this.oldRemoveAttribute(attr);
					var it = this;
					renderButton(it);
				}
			}
		}
		bs[i].isListenAttr=true;
		bs[i].register=true;
	}
}


function renderButton(button){
	var disabled = button.getAttribute("disabled");

	var patt1=new RegExp("\\bdisabledButton\\b");
	if(disabled=="disabled" || disabled=="true"){
		if(button.className.search(patt1)==-1){
			button.className+=" disabledButton";
			button.oldOnclick = button.onclick;
			button.onclick = function(){};
		}
	}
	else{
		if(button.className.search(patt1)!=-1){
			button.className = button.className.replace(patt1,"").trim();
			if(button.oldOnclick){
				button.onclick = button.oldOnclick;
			}
		}
	}
	loadButtonIcon(button);
}
function loadButtonIcon(button){
	var icon = button.getAttribute("icon");
	if(icon){
		var span = button.getElementsByTagName("span");
		if(span.length==0){
			span=document.createElement("span");
			button.insertBefore(span,button.firstChild);
		}
		else
			span = span[0];
		span.style.backgroundImage="url('../../"+icon+"')";
	}
}


if(document.addEventListener){
	window.addEventListener("load",loadButtonJavaScript,true);
}
