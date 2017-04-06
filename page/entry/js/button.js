
/**
 * 将页面中的一个DOM对象解析为一个特定UI的按钮
 * @param dom DOM对象或者DOM对象的ID
 * @param text 按钮中需要显示的文本
 * @param icon1 可选参数，按钮未激活的图标路径，相对于WebRoot绝对定位，为null则表示按钮没有图标
 * @param icon2 可选参数，按钮激活时的图标路径，相对于WebRoot绝对定位，为null则表示使用icon1
 * @returns {Button}
 */
function Button(dom,text,icon1,icon2){

	var self = this;

	var dom = (typeof dom == 'string')?document.getElementById(dom):dom;
	

	if(icon1 && typeof icon1 == 'string'){
		dom.style.paddingLeft = '30px';
		dom.style.background = 'url('+icon1+') 5px center  no-repeat';
	}
	dom.textContent = text;
	dom.style.borderRadius = '5px';
	dom.style.textAlign = 'center';
	dom.style.backgroundColor = '#2872B7';
	dom.style.backgroundRepeat = 'no-repeat';
	dom.style.display = 'inline-block';
	dom.style.color = 'white';

	
	/**
	 * 默认情况下，按钮display属性为inline-block
	 * 具有默认的宽度（text.length()+1+icon.width em）和高度（line-height），
	 * 在实际情况中，可能需要重新设置按钮的尺寸
	 * @param width 按钮的宽度
	 * @param height 按钮的高度
	 */
	this.setSize = function(width, height){
		dom.style.width = width + 'px';
		dom.style.lineHeight = height + 'px';
	};
	
	/**
	 * 在构造器中，已经设置了按钮的文本，但是在某些事件下，可能会重置文本
	 * @param text 按钮中的文字替换后的文本
	 */
	this.setText = function(text){
		dom.textContent = text;
	};
	
	/**
	 * 重新设置按钮的背景颜色，一般与鼠标事件一起使用
	 * @para color 设置后的背景颜色
	 */
	this.setBackground = function(color){
		dom.style.backgroundColor = color;
	};
	
	/**
	 * 重新设置按钮的图标，一般与鼠标事件一起使用
	 * @para icon 设置后的图标路径
	 */
	this.setIcon = function(icon){
		dom.style.paddingLeft = '30px';
		dom.style.backgroundImage = 'url('+icon+')';
		dom.style.backgroundPosition = '5px center';
	};
	
	/**
	 * 当鼠标移入按钮事件，提供一组默认实现
	 * 调用者可以重写该方法，完成复杂的按钮
	 */
	this.onmouseover = function(){};
	dom.onmouseover = function(){
		self.onmouseover();
	};


	/**
	 * 当鼠标移出按钮事件，提供一组默认实现
	 * 调用者可以重写该方法，完成复杂的按钮
	 */
	this.onmouseout = function(){};
	dom.onmouseout =  function(){
		self.onmouseout();
	};


	/**
	 * 当鼠标按下按钮事件，提供一组默认实现
	 * 调用者可以重写该方法，完成复杂的按钮
	 */
	this.onmousedown = function(){};
	dom.onmousedown = function(){
		self.onmousedown();
	};

	
	/**
	 * 鼠标点击按钮事件，由调用者实现
	 */
	this.onclick = function(){};
	dom.onclick = function() {
		self.onclick();
	}
	
}

