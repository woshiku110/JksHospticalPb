var photoArr;				//照片名字的数组  text.jpg


function pauseImport(){
	$.ajax({
		url:_serverHome+"yuyue/MedicinalProcess_pauseImport",
		async:false,
		type:'POST',
		dataType:'json',
		data:{token:_token,orderId:num.textContent},
		success:function(data,status){
			// alert('MedicinalProcess_pauseImport');
		},
	});
}



function outOfQueue(){
	$.ajax({
		url:_serverHome+"yuyue/MedicinalProcess_outOfQueue",
		async:false,
		type:'POST',
		dataType:'json',
		data:{token:_token},
		success:function(data,status){
			console.log(data.msg);
			var dataJSON = JSON.parse(data.msg);
	    	photoArr = JSON.parse(dataJSON[1]);
	    	photo_length = photoArr.length;

	    	num.textContent = dataJSON[0];
	    	img_src_width_index(photo_index);

			page_length.innerText = photo_length;
			setPosition(img);
		},
	});
}