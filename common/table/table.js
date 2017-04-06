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
	return path.split("table.js")[0];
})();
var tableHome=currentAbsPath;
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+currentAbsPath+"table.css\"></link>");


/**
 * 在页面上生成一个不带表头的表格
 * @param divId 表格所在的DIV的ID
 * @param rowSize 表格最小的行数
 * @param colSize 表格的列数
 * @return 一个Table对象
 */
function Table(container,rowSize,colSize){

	var _template = null;
	var _heads = null;
	var _styleRow=null;
	var _allDataRow = new Array();
	var _allVoidRow = new Array();

	var div = typeof(container)=="string"?document.getElementById(container):container;
	var divId = div.id;

	var _view_table = document.createElement("table");
	_view_table.setAttribute("id",divId+"_t");
	_view_table.setAttribute("class","t_table");
	_view_table.setAttribute("cellspacing","0");
	_view_table.style.width="100%";
	

	_styleRow = document.createElement("tr");
	for(var i=0;i<colSize;i++){
		var td=document.createElement("td");
		td.style.height="0px";
		td.style.border="0px";
		td.style.margin="0px";
		td.style.padding="0px";
		_styleRow.appendChild(td);
	}
	_styleRow.style.height="0px";
	_styleRow.style.border="0px";
	_styleRow.style.margin="0px";
	_styleRow.style.padding="0px";
	_view_table.appendChild(_styleRow);

	for(var i=0;i<rowSize;i++){
		var vr = voidRow();
		_view_table.appendChild(vr);
		_allVoidRow.push(vr);
	}
	div.innerHTML = "";
	div.appendChild(_view_table);


	/**
	 * 设置表格的表头，会使表格增加一行
	 * @param heads 字符串数组，内容与表头对应，为null删除表头
	 */
	this.setHead = function(heads){
		if(heads == null){
			return _view_table.removeChild(_heads);
		}
		var tr=document.createElement("tr");
		tr.className = "t_tr "+divId+"_tr";
		for (var i = 0; i < heads.length; i++) {
			var th = document.createElement("th");
			th.setAttribute("align","left");
			th.className = "t_th "+divId+"_th"+i;
			th.innerHTML = heads[i];
			tr.appendChild(th);
		}
		_view_table.insertBefore(tr,_view_table.childNodes[0]);
		_heads = tr;
		return tr;
	};

	this.setColWidth=function(widths,tableWidth){
		if(tableWidth!=null)
			_view_table.style.width = tableWidth;
		var tds = _styleRow.childNodes;
		for ( var i = 0; i < tds.length; i++) {
			tds[i].style.width=widths[i];
		}
	};
	/**
	 * 设置生成表格一行的模板
	 * @param template 数组，字符串或者返回值为DOM元素的函数（参数为数据数组）
	 */
	this.setTemplate = function(template){
		_template = template;
	};
	/**
	 * 按照模板解析一组数据生成一个数据行，并插入表格，成为表格的最顶上的一个数据行
	 * @param data 要解析的数组或者TR的DOM对象
	 * @param overflow 为false表示不允许溢出，溢出时隐藏表格最下面的一行，默认为false
	 * @return 添加行的DOM对象，添加失败返回null
	 */
	this.push = function(data,overflow){
		var a = data;
		if(data instanceof Array){
			a= parseRow(data, _template);
		}
		if(_allDataRow.length==0 && _allVoidRow.length>0){
			_view_table.replaceChild(a,_allVoidRow[0]);
			_allDataRow.unshift(a);
			_allVoidRow.shift();
		}
		else if(_allDataRow.length>0){
			_view_table.insertBefore(a,_allDataRow[0]);
			_allDataRow.unshift(a);
			if(_allDataRow.length>rowSize){
				if(!overflow){
					_view_table.removeChild(_allDataRow[_allDataRow.length-1]);
					_allDataRow.pop();
				}
			}
			else{
				_view_table.removeChild(_allVoidRow[_allVoidRow.length-1]);
				_allVoidRow.pop();
			}
		}
		calcColor();
		return a;
	};
	/**
	 * 按照模板解析一组数据生成一个数据行，并插入表格，成为表格的最底下的一个数据行
	 * @param data 要解析的数组或TR的DOM对象
	 * @param overflow 为false表示不允许溢出，溢出时隐藏表格最上面的一行，默认为false
	 * @return 添加行的DOM对象，添加失败返回null
	 */
	this.add = function(data,overflow){
		var a = data;
		if(data instanceof Array){
			a= parseRow(data, _template);
		}
		if(_allVoidRow.length>0){
			_view_table.replaceChild(a,_allVoidRow[0]);
			_allDataRow.push(a);
			_allVoidRow.shift();
		}
		else{
			if(!overflow){
				_view_table.removeChild(_allDataRow[0]);
				_allDataRow.shift();
			}
			_view_table.appendChild(a);
			_allDataRow.push(a);
		}
		calcColor();
		return a;
	};
	/**
	 * 按照模板解析一组数据生成一个数据行，并去替换表格中指定数据行
	 * @param data 要解析的数组
	 * @param rowId 指定的行的DOM对象的ID
	 * @return 替换后的行的DOM对象，替换失败返回null
	 */
	this.replace = function(data,rowId){
		var olda = document.getElementById(rowId);
		if(olda == null)
			return null;
		if(olda.parentNode != _view_table){
			return null;
		}
		else{
			var a = parseRow(data, _template);
			_view_table.replaceChild(a,olda);
			for(var i=0;i<_allDataRow.length;i++){
				if(olda == _allDataRow[i]){
					_allDataRow[i] = a;
				}
			}
		}
		calcColor();
		return a;
	};
	/**
	 * 移除表格中某个指定的数据行
	 * @param rowId 指定的数据行的DOM对象的ID
	 * @returns 移除的行的DOM对象，移除失败返回null
	 */
	this.remove = function(rowId){
		var olda = document.getElementById(rowId);
		if(olda == null)
			return null;
		if(olda.parentNode != _view_table){
			return null;
		}
		_view_table.removeChild(olda);
		for(var i=0;i<_allDataRow.length;i++){
			if(olda == _allDataRow[i]){
				_allDataRow.splice(i,1);
			}
		}
		var vr = voidRow();
		_view_table.appendChild(vr);
		_allVoidRow.push(vr);
		calcColor();
		return olda;
	};
	/**
	 * 清空表格数据
	 */
	this.clean = function(){
		for(var i=0;i<_allDataRow.length;i++){
			_view_table.removeChild(_allDataRow[i]);
		}
		for(var i=0;i<_allDataRow.length;i++){
			var vr = voidRow();
			_view_table.insertBefore(vr,_allVoidRow[0]);
			_allVoidRow.unshift(vr);
		}
		_allDataRow = new Array();
		calcColor();
	};
	/**
	 * @return 表格当前的数据行个数
	 */
	this.size = function(){
		return _allDataRow.length;
	};
	/**
	 * @return 表格当前的数据行个数
	 */
	this.size = function(){
		return _allDataRow.length;
	};
	/**
	 * @return 得到表格中所有数据行的DOM对象的数组，按从上到下依次排列
	 */
	this.getRows = function(){
		return _allDataRow;
	};

	function parseRow(data,template){
		var tr = document.createElement("tr");
		tr.className = "t_tr "+divId+"_tr";
		for(var i=0;i<colSize;i++){
			var td = document.createElement("td");
			var input = document.createElement("input");
			if(template[i]==null || template[i]==""){
				td.innerHTML = "";
			}
			else if(typeof(template[i]) == "function"){
				var cell = template[i](data);
				if(typeof(cell)=="string"){
					td.innerHTML = cell;
				}
				else{
					td.innerHTML = "";
					td.appendChild(cell);
				}
			}
			else if(typeof(template[i]) == "string"){
				var key=new RegExp("\\[\\d+\\]","g");
				var ms = template[i].match(key);
				if(ms==null){
					td.innerHTML = template[i];
				}
				else{
					for(var j=0;j<ms.length;j++){
						var m = ms[j].match(new RegExp("\\d+"));
						ms[j] = data[parseInt(m[0])];
					}
					var ss = template[i].split(key);
					key="";
					for(var j=0;j<ms.length;j++){
						key += ss[j];
						key += ms[j];
					}
					key += ss[ss.length-1];
					td.innerHTML = key;
				}
			}
			else{
				td.innerHTML = template[i];
			}
			var tdcs = td.childNodes;
			var k = 0;
			for ( ; k < tdcs.length; k++) {
				try {
					if(tdcs[k] instanceof HTMLElement){
						td.title="";
						break;
					}
				} catch (e) {
					var reg = new RegExp("<.*>");
					if(td.innerHTML.search(reg)==-1){
						td.title="";
						k = tdcs.length;
					}
					else{
						k = 0;
					}
					break;
				}
			}
			var inhtml = td.innerHTML;
			if(!(inhtml==null || inhtml=="") && k == tdcs.length){
				input.type = "text";
				input.readOnly = "readonly";
				input.style.border = "0px";
				input.style.width = "calc(100% - 2px)";
				input.style.height = "calc(100% - 2px)";
				input.style.backgroundColor = "transparent";
				input.value = inhtml;
				td.innerHTML = "";
				td.appendChild(input);
				var title = "";
				for(var temp=0;temp<inhtml.length;temp+=20){
					if(temp>0)
						title += "\n";
					var s = inhtml.substr(temp,20);
					title += s;
				}
				td.title = title;
			}
			td.className = "t_td "+divId+"_td"+i;
			td.style.overflow = "hidden";
			tr.appendChild(td);
		}
		return tr;
	}
	function voidRow(){
		var tr = document.createElement("tr");
		tr.className = "t_tr "+divId+"_tr";
		for(var i=0;i<colSize;i++){
			var td=document.createElement("td");
			td.className = "t_td "+divId+"_td"+i;
			td.setAttribute("align","center");
			tr.appendChild(td);
		}
		return tr;
	}
	function calcColor(){
		var odd = "#fff";
		var even = "#E8F5FF";
		for ( var i = 0; i < _allDataRow.length; i++) {
			if(i%2==1){
				_allDataRow[i].style.backgroundColor=even;
			}else{
				_allDataRow[i].style.backgroundColor=odd;
			}
		}
		if(_allDataRow.length%2==0){
			odd = "#E8F5FF";
			even = "#fff";
		}
		for ( var i = 0; i < _allVoidRow.length; i++) {
			if(i%2==1){
				_allVoidRow[i].style.backgroundColor=odd;
			}else{
				_allVoidRow[i].style.backgroundColor=even;
			}
		}
	}
	calcColor();
}
/*IE浏览器不能使用split*/
var split;
split = split || function (undef) {
	var nativeSplit = String.prototype.split,
	compliantExecNpcg = /()??/.exec("")[1] === undef, 
	self;

	self = function (str, separator, limit) {
		if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
			return nativeSplit.call(str, separator, limit);
		}
		var output = [],
		flags = (separator.ignoreCase ? "i" : "") +
		(separator.multiline  ? "m" : "") +
		(separator.extended   ? "x" : "") + 
		(separator.sticky     ? "y" : ""), 
		lastLastIndex = 0,
		separator = new RegExp(separator.source, flags + "g"),
		separator2, match, lastIndex, lastLength;
		str += ""; 
		if (!compliantExecNpcg) {
			separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
		}
		limit = limit === undef ?
				-1 >>> 0 : 
					limit >>> 0; 
					while (match = separator.exec(str)) {
						lastIndex = match.index + match[0].length;
						if (lastIndex > lastLastIndex) {
							output.push(str.slice(lastLastIndex, match.index));
							if (!compliantExecNpcg && match.length > 1) {
								match[0].replace(separator2, function () {
									for (var i = 1; i < arguments.length - 2; i++) {
										if (arguments[i] === undef) {
											match[i] = undef;
										}
									}
								});
							}
							if (match.length > 1 && match.index < str.length) {
								Array.prototype.push.apply(output, match.slice(1));
							}
							lastLength = match[0].length;
							lastLastIndex = lastIndex;
							if (output.length >= limit) {
								break;
							}
						}
						if (separator.lastIndex === match.index) {
							separator.lastIndex++; 
						}
					}
					if (lastLastIndex === str.length) {
						if (lastLength || !separator.test("")) {
							output.push("");
						}
					} else {
						output.push(str.slice(lastLastIndex));
					}
					return output.length > limit ? output.slice(0, limit) : output;
	};

	String.prototype.split = function (separator, limit) {
		return self(this, separator, limit);
	};

	return self;

}();
