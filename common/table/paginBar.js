
function PaginBar(container){
	var currentPath = tableHome;
	var div = typeof(container)=="string"?document.getElementById(container):container;
	var e_d = document.createElement("div");
	var e_d_a1 = document.createElement("a");
	var e_d_a2 = document.createElement("a");
	var e_d_s1 = document.createElement("span");
	var e_d_s2 = document.createElement("span");
	var e_d_s2_s1 = document.createElement("span");
	var e_d_s2_i1 = document.createElement("input");
	var e_d_s2_s2 = document.createElement("span");
	var e_d_s2_s3 = document.createElement("span");
	var e_d_s2_s4 = document.createElement("span");
	var e_d_s3 = document.createElement("span");
	var e_d_a3 = document.createElement("a");
	var e_d_a4 = document.createElement("a");
	var e_d_s4 = document.createElement("span");
	var e_d_a5 = document.createElement("a");
	
	var _ajaxObj = {};
	var _currentPage = 1;
	var _totalPage = 1;
		
	this.setQueryObj = function(options){
		_ajaxObj = options;
	};
	this.setCurrentPage = function(pageNum){
		e_d_s2_i1.value = pageNum;
		_currentPage = pageNum;
		updateIcon(pageNum,this.getTotalPage());
	};
	this.setTotalPage = function(pageNum){
		e_d_s2_s3.innerHTML = pageNum;
		_totalPage = pageNum;
		updateIcon(this.getCurrentPage(),pageNum);
	};
	this.refresh = function(){
		e_d_a5.onclick();
	};
	this.getCurrentPage = function(){
		return _currentPage;
	};
	this.getTotalPage = function(){
		return _totalPage;
	};
	
	var updateIcon = function(currentPage,totalPage){
		if(currentPage<=1){
			e_d_a1.style.backgroundImage = "url('"+currentPath+"icon/laststop02.png')";
			e_d_a2.style.backgroundImage = "url('"+currentPath+"icon/last02.png')";
		}
		else{
			e_d_a1.style.backgroundImage = "url('"+currentPath+"icon/laststop.png')";
			e_d_a2.style.backgroundImage = "url('"+currentPath+"icon/last.png')";
		}
		if(currentPage>=totalPage){
			e_d_a3.style.backgroundImage = "url('"+currentPath+"icon/next02.png')";
			e_d_a4.style.backgroundImage = "url('"+currentPath+"icon/nextstop02.png')";
		}
		else{
			e_d_a3.style.backgroundImage = "url('"+currentPath+"icon/next.png')";
			e_d_a4.style.backgroundImage = "url('"+currentPath+"icon/nextstop.png')";
		}
	};
	
	var self = this;
	(function(){

		e_d.className = "paginBarCell";
		e_d_s1.className = "line";
		e_d_s2.className = "showPageNum";
		e_d_s3.className = "line";
		e_d_s4.className = "line";

		div.appendChild(e_d);
		e_d.appendChild(e_d_a1);
		e_d.appendChild(e_d_a2);
		e_d.appendChild(e_d_s1);
		e_d.appendChild(e_d_s2);
		e_d_s2.appendChild(e_d_s2_s1);
		e_d_s2.appendChild(e_d_s2_i1);
		e_d_s2.appendChild(e_d_s2_s2);
		e_d_s2.appendChild(e_d_s2_s3);
		e_d_s2.appendChild(e_d_s2_s4);
		e_d.appendChild(e_d_s3);
		e_d.appendChild(e_d_a3);
		e_d.appendChild(e_d_a4);
		e_d.appendChild(e_d_s4);
		e_d.appendChild(e_d_a5);
		
		e_d_s2_s1.innerHTML = "第";
		e_d_s2_i1.value = 1;
		e_d_s2_s2.innerHTML = "页，共";
		e_d_s2_s3.innerHTML = "1";
		e_d_s2_s4.innerHTML = "页";
		
		e_d_a1.style.backgroundImage = "url('"+currentPath+"icon/laststop02.png')";
		e_d_a2.style.backgroundImage = "url('"+currentPath+"icon/last02.png')";
		e_d_a3.style.backgroundImage = "url('"+currentPath+"icon/next02.png')";
		e_d_a4.style.backgroundImage = "url('"+currentPath+"icon/nextstop02.png')";
		e_d_a5.style.backgroundImage = "url('"+currentPath+"icon/shuaxin.png')";
				
		e_d_a1.onclick = function(){
			if(self.getCurrentPage()<=1)
				return;
			_ajaxObj.data.currentPage = 1;
			$.ajax(_ajaxObj);
		};
		e_d_a2.onclick = function(){
			if(self.getCurrentPage()<=1)
				return;
			_ajaxObj.data.currentPage = self.getCurrentPage() - 1;
			$.ajax(_ajaxObj);
		};
		e_d_a3.onclick = function(){
			if(self.getCurrentPage() >= self.getTotalPage())
				return;
			_ajaxObj.data.currentPage = self.getCurrentPage() + 1;
			console.log(_ajaxObj);
			$.ajax(_ajaxObj);
		};
		e_d_a4.onclick = function(){
			if(self.getCurrentPage() >= self.getTotalPage())
				return;
			_ajaxObj.data.currentPage = self.getTotalPage();
			$.ajax(_ajaxObj);
		};
		e_d_a5.onclick = function(){
			_ajaxObj.data.currentPage = self.getCurrentPage();
			$.ajax(_ajaxObj);
		};
		e_d_s2_i1.onkeyup = function(e){
			if(e.keyCode != 13){
				return;
			}
			_ajaxObj.data.currentPage = this.value;
			$.ajax(_ajaxObj);
		};
		e_d_s2_i1.onpropertychange=function(){
			/*if(this.value.length==1){
				this.value=this.value.replace(/[^1-9]/g,'');
			}else{
				this.value=this.value.replace(/\D/g,'');
			}*/
	    };
	    e_d_s2_i1.oninput = e_d_s2_i1.onpropertychange;
	})();
}


