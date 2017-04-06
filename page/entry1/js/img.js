
var photo_arr = [0];   				//图片索引数组

var photo_index = 0;						//默认第一张图片索引
var photo_length;							//所有图片长度
var img = document.getElementById('img');	//图片




var oldPosX;								//图片拖动后的X
var oldPosY;								//图片拖动后的Y	

//设置图片拖动
img.onmousedown = function(event){
	var disX = event.clientX;
	var disY = event.clientY;
	document.onmousemove = function(event){
		img.style.marginLeft = oldPosX+event.clientX-disX+'px';
		img.style.marginTop = oldPosY+event.clientY-disY+'px';
	}

	//鼠标抬起后触发
	document.onmouseup = function(){
		oldPosX = parseInt(img.style.marginLeft);
		oldPosY = parseInt(img.style.marginTop);
		document.onmousemove = null;
		document.onmouseup = null;
	}
	return false;
}



// 设置图片在框框内的位置
function setPosition(img){
	img.style.marginLeft = -img.offsetWidth/2+'px';
	img.style.marginTop = -img.offsetHeight/2+'px';
	oldPosX = parseInt(img.style.marginLeft);
	oldPosY = parseInt(img.style.marginTop);
}


//设置图片的src  width  index索引
function img_src_width_index(photo_index){
	img.src = _filePath+photoArr[photo_index];
	img.style.width = '100%';
	page_current.innerText = photo_index+1;
}



//设置图片旋转效果
var rotate=0;
roateLeft.onclick=function(){rotate--;$('#img').css('transform','rotate('+rotate*90+'deg)');}
roateRight.onclick=function(){rotate++;$('#img').css('transform','rotate('+rotate*90+'deg)');}



//图片放大效果
large.onclick = function(){
	img.style.width = img.offsetWidth*times+'px';
	setPosition(img);
}

//图片缩小效果
small.onclick = function(){
	if(img.offsetWidth<img.parentNode.offsetWidth){
		return false;
	}
	img.style.width = img.offsetWidth/times+'px';
	setPosition(img);
}



//切换上一张图片
left.onclick = function(){
	if(photo_length == null){return null}
	if(photo_index==0){
		photo_index += photo_length;
	}
	img_src_width_index(--photo_index);
	if(photo_arr.indexOf(photo_index) == -1){
		photo_arr.push(photo_index);
	}
	setPosition(img);
	console.log('图片上一张 ，当前图片索引值为：'+photo_index);
}



//切换下一张图片
right.onclick = function(){
	if(photo_length == null){return null}
	if(photo_index==photo_length-1){
		photo_index -= photo_length;
	}
	img_src_width_index(++photo_index);
	if(photo_arr.indexOf(photo_index) == -1){
		photo_arr.push(photo_index);
	}
	setPosition(img);
	console.log('图片下一张 ，当前图片索引值为：'+photo_index);
}