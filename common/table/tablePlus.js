
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
	return path.split("tablePlus.js")[0];
})();
var tableHome=currentAbsPath;
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+currentAbsPath+"table.css\"></link>");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+currentAbsPath+"paginBar.css\"></link>");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+currentAbsPath+"tablePlus.css\"></link>");
document.write("<script type=\"text/javascript\" src=\""+currentAbsPath+"table.js\"></script>");
document.write("<script type=\"text/javascript\" src=\""+currentAbsPath+"paginBar.js\"></script>");


function TablePlus(container,rowSize,colSize){
	var div = typeof(container)=="string"?document.getElementById(container):container;
	var dataIdCol = 0;
	
	div.className = div.className+" "+"tableContiner";
	
	var tableDiv = document.createElement("div");
	var paginDiv = document.createElement("div");

	div.appendChild(tableDiv);
	div.appendChild(paginDiv);

	tableDiv.id = div.id+"_t";
	paginDiv.id = div.id+"_p";
	tableDiv.className="tableDiv";
	paginDiv.className="paginDiv";
	
	this.table = new Table(tableDiv,rowSize,colSize);
	this.pagin = new PaginBar(paginDiv);
	
	this.query = function(options){
		this.pagin.setCurrentPage(1);
		this.pagin.setQueryObj(options);
		this.pagin.refresh();
	};
	this.refresh = function(){
		this.pagin.refresh();
	};
	this.setIdCol = function(rowDateIdCol){
		dataIdCol = rowDateIdCol;
	};
	this.reload = function(page,cache){
		this.pagin.setCurrentPage(page.currentPage==null?1:page.currentPage);
		this.pagin.setTotalPage(page.allPage==null?1:page.allPage);
		var oldTable = cache?this.table.getRows():[];
		cache = new Object();
		for ( var i = 0; i < oldTable.length; i++) {
			cache[oldTable[i].id] = oldTable[i];
		}
		this.table.clean();
		var content = page.context;
		for ( var i = 0; i < content.length; i++) {
			var id = div.id+"_"+content[i][dataIdCol];
			if(cache[id]==null){
				this.table.add(content[i], true);
			}
			else{
				this.table.add(cache[id], true);
			}
		}
	};
	
}







