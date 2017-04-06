function toggler(o,min,max){
	if(!o.action){
	    o.action=-1;//一开始收起来的
	}
	o.action *= -1;
	o.style.overflow = "hidden";
	if(o.timer == null){
	    o.timer = setInterval(function () {
	        if(o.action==1){
	            o.style.height= (o.offsetHeight+2)+"px";
	            if(o.offsetHeight>=max){
	                o.style.height = max+"px";
	                clearInterval(o.timer);
	                o.timer = null;
	            }
	        }
	        else{
	            o.style.height= (o.offsetHeight-2)+"px";
	            if(o.offsetHeight<=min){
	                o.style.height = min+"px";
	                    clearInterval(o.timer);
	                    o.timer = null;
	                }
	            }
	        },5);
	    }
}