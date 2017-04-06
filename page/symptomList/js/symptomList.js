
function loadzzbwInput(){
	var zzbw = document.getElementById("zzbw");
	changeDropDownInput(zzbw);
	zzbw.autoMatch = false;
	zzbw.visibleTemplate = function(option){
		return option[1];
	}
	zzbw.oninput = function(){
		$.ajax({
		 		//请求地址
		        url: dz+"PartManage_symptomAllList",
		        //请求类型
		        type: 'post',
		        //返回数据类型
		        dataType:'json',
		        //异步:true  同步:false
		        async:true,
		        //发送到服务器的数据。必须为 Key/Value 格式。
		        data: {
		        	'name':zzbw.value.trim(),
		        },
		        //请求成功后回调函数
		        success: function(res) {
		        	if(res.success){
		        		zzbw.dataSource = JSON.parse(res.msg);
		        		console.log(JSON.toObject(res.msg));
		        		zzbw.flush();
		        	}
		        	else{
		        		zzbw.dataSource = [];
		        		zzbw.flush();
		        	}
		        }
		    });
	}
}
