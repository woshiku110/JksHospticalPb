var j=0;
var arrImgName="";
var imgArr=[];
var bigImgArr=[];
var clickNumber=0;
var flat=0;
var deleteImgArr=[];
var cishu=0;
function updateHospitalInfo(detailData){
	closeckDialog();
	var context="";
	update = new Dialog(960,500);
	update.setTitle("修改医院信息");
	context+="<div>"+
	 "<table cellspacing=\"5\" style=\"margin-top:10px;margin-left:25px;\">"+
		"<tr class=\"setWidth\">"+
         "<td class=\"td_title\">医院名称:</td>"+
         "<td class=\"col\">"+
             "<input id=\"e_hospitalName\" name=\"e_hospitalName\" style=\"width:156px;\"/>"+
         "</td>"+
         "<td class=\"td_title\">医院分类:</td>"+
         "<td class=\"col\">"+
             "<input id=\"e_hospitalClassify\" name=\"e_hospitalClassify\" style=\"width:85px;\"/>"+
         "</td>"+
			"<td class=\"td_title\">医院地址:</td>"+
         "<td class=\"col\">"+
             "<input id=\"e_hospitalPlace\" name=\"e_hospitalPlace\" style=\"width:90px;\"/>"+
         "</td>"+
         "<td class=\"td_title\">联系方式:</td>"+
         "<td class=\"col\">"+
             "<input id=\"e_tel\" name=\"e_tel\" style=\"width:156px;\"/>"+
         "</td>"+
		"</tr>"+
		"<tr class=\"setWidth\">"+
         "<td class=\"td_title\">科室种类:</td>"+
         "<td colspan=\"8\">"+
            "<textarea id=\"e_classify\" name=\"e_classify\" class=\"setWh\"></textarea>"+
         "</td>"+
		"</tr>"+
		"<tr class=\"setWidth\">"+
         "<td class=\"td_title\">打印地点:</td>"+
         "<td class=\"col\">"+
            "<input id=\"e_place\" name=\"e_place\"/>"+
         "</td>"+
		"</tr>"+
		"<tr class=\"setWidth\">"+
         "<td class=\"td_title\">医院简介:</td>"+
         "<td colspan=\"8\">"+
            "<textarea id=\"e_introduce\" name=\"e_introduce\" class=\"setWh\"></textarea>"+
         "</td>"+
		"</tr>"+
		"<tr class=\"setImageWidth\">"+
		"<td colspan=\"8\">"+
			"<div id= \"updateImageDiv\" class=\"setImageHeight\" style=\"display:inline\">"+
			"</div>"+
			"<form id= \"updateUploadForm\" style=\"display:inline\">"+
				"<div>"+
					"<input type=\"file\" id=\"filed\" name=\"upload\" onchange=\"updateFileUpload();\" style=\"display:none;\"/>"+
				"</div>"+
				"<div style=\"float:left\">"+
					"<img id=\"uploads\" height=\"100\" width=\"170\" src=\"\" style=\"display:none;margin-right:15px\">"+
				"</div>"+
				"<div>"+
					"<img height=\"100\" width=\"170\" src=\"img/img_add.png\"  onclick=\"updateFileSelect();\">"+
				"</div>"+
			"</form>"+
		"</td>"+
		"</tr>"+
		"<tr>"+
		 	"<td>"+
		 		"<div id=\"result\"></div>"+
		 	"</td>"+
	 	"</tr>"+
	"</table>"+
	"<div style=\"text-align:center;margin-top:25px;\">"+
	    "<a href=\"javascript:void(0)\" class=\"button\" id=\"commitBtn\" onclick=\"commitHospitalInfo(detailData)\">确定</a>&nbsp&nbsp&nbsp&nbsp&nbsp"+
	    "<a href=\"javascript:void(0)\" class=\"button\" id=\"calcelBtn\" onclick=\"closeUpdateDialog()\">取消</a>"+
	 "</div>"+
  "</div>";
	update.setBody(context);
	update.show();
	var commitBtn=document.getElementById("commitBtn");
	commitBtn.style.height="20px";
	commitBtn.style.width="30px";
	commitBtn.style.fontSize="14px";
	commitBtn.style.lineHeight="20px";
	var calcelBtn=document.getElementById("calcelBtn");
	calcelBtn.style.height="20px";
	calcelBtn.style.width="30px";
	calcelBtn.style.fontSize="14px";
	calcelBtn.style.lineHeight="20px";
	calcelBtn.style.background="#fff";
	calcelBtn.style.color="#3268AF";
	calcelBtn.style.border="1px solid #3268AF";
	document.getElementById("e_hospitalName").value=detailData[1];
	document.getElementById("e_hospitalClassify").value=detailData[5];
	document.getElementById("e_tel").value=detailData[6];
	document.getElementById("e_classify").value=detailData[7];
	document.getElementById("e_hospitalPlace").value=detailData[13];
	document.getElementById("e_place").value=detailData[8];
	document.getElementById("e_introduce").value=detailData[9];
	arrImgName= detailData[10].split(","); 
	var imageDiv=document.getElementById("updateImageDiv");
	var bottomImg="";
	var topImg="";
	for ( var i = 0; i < arrImgName.length; i++) {
		topImg+="<img id=\"img"+i+"\" class=\"img_top\" src=\"img/img_jian.png\">";
		bottomImg+="<img id=\"image"+i+"\" src=\""+_filePath+arrImgName[i]+"\" height=\"100\" width=\"170\" style=\"margin-right:15px\"/ onclick=\"deleteImage(this,"+i+")\">";
	      var imgId='img'+i;//上面图片的id
	      var bigImgId='image'+i;//大图片的id
	      //把两个图片的id放在数组中
	      imgArr.push(imgId);
	      bigImgArr.push(bigImgId);
	}
	cishu++;
	$(imageDiv).append(topImg);
	$(imageDiv).append(bottomImg);
    Array.prototype.duplicate=function() {  
        var tmp = [];  
        this.concat().sort().sort(function(a,b){  
            if(a==b && tmp.indexOf(a) === -1) tmp.push(a);  
        });  
        return tmp;  
    };
	if(cishu==1){
		imgArr=imgArr;
	}else{
		imgArr=imgArr.duplicate();//第二次进入时，图片数组的元素 会把之前的图片全都放进去 去除相同的元素即是 删除后的元素
	}
    for ( var changdu = 0; changdu < imgArr.length+j; changdu++) {
    	 var marginLeft=137+185*changdu+"px";//计算每个小图片距离左边的位置
    	 $("#"+imgArr[changdu]).css("margin-left",marginLeft);
	}		
}
/*
关闭更新页面
*/
function closeUpdateDialog(){
	update.close();
}
/*
 删除图片
 */
function deleteImage(msg,i){
	imgArrIndex=imgArr.length-clickNumber-1;
	$("#"+imgArr[imgArrIndex]).remove();
	msg.remove();
	clickNumber++;
	deleteImgArr.push(i);
}

/*
图片上传
*/
function updateFileUpload(){
	j++;
	/*当clickNumber等于0时，说明在修改医院信息时，没有删除之前的照片，
	 只是上传照片，所以只要拿到之前数组的长度和上传图片的次数，只要不超过4就可以了
	 当clickNumber不等于0时，说明此时调用了删除函数deleteImage，此时要计算现有图片的张数，
	 就要拿到删除图片后，图片的张数，上传图片的张数和删除后图片的张数不能超过4
	 */
	if(clickNumber==0&&bigImgArr.length+j>4){
		document.getElementById("result").innerHTML="<font color='red'>您最多只能上传四张图片</font>";
		return false;
	}
	if(clickNumber!=0&&j+imgArrIndex>4){
		document.getElementById("result").innerHTML="<font color='red'>您最多只能上传四张图片</font>";
		return false;
	}
   var formData = new FormData($( "#updateUploadForm" )[0]);
   $.ajax({ 
        url:_fileUpPath, 
        type: 'POST', 
        data: formData, 
        async: false, 
        cache: false, 
        contentType: false, 
        processData: false, 
        success: function (data) {
       	 if(j==1){
       		 $("#uploads").attr("src", _filePath+data.msg);
             $('#uploads').show();
       	 }else if(j==2){
       		 var imagePath=_filePath+data.msg;
       		 $("#uploads").after("<img id=\"images"+j+"\" src=\"\" height=\"100\" width=\"170\" style=\"margin-right:15px\"/>");
       		 $("#"+"images"+j).attr("src", imagePath);
             $("#"+"images"+j).show();
       	 }else{
       		 var imagePath=_filePath+data.msg;
       		 $("#"+"images"+(j-1)).after("<img id=\"images"+j+"\" src=\"\" height=\"100\" width=\"170\" style=\"margin-right:15px\"/>");
       		 $("#"+"images"+j).attr("src", imagePath);
             $("#"+"images"+j).show();
       	 }
        }, 
        error: function (data) { 
        	console.log(data);
        } 
   });  
   flat++;
 }
function updateFileSelect() {
   document.getElementById("filed").click();
}
/*
提交修改内容
*/
function commitHospitalInfo(data){
	var e_name=$("input[name='e_hospitalName']").val();//医院名称
	var e_yyfl=$("input[name='e_hospitalClassify']").val();//医院分类
	var e_yydz=$("input[name='e_hospitalPlace']").val();//医院地址
	var e_lxfs=$("input[name='e_tel']").val();//联系方式
	var e_kszl=$("textarea[name='e_classify']").val();//科室种类
	var e_dydd=$("input[name='e_place']").val();//打印地点
	var e_yyjj=$("textarea[name='e_introduce']").val();//医院简介
	
	var imgNamePaths="";
	var updateImgId="";
	for ( var m = 0; m < deleteImgArr.length; m++) {
		   var imageId="image"+deleteImgArr[m];
		   removeByValue(bigImgArr,imageId);
   }
	function removeByValue(arr, val) {
	  for(var i=0; i<arr.length; i++) {
	    if(arr[i] == val) {
	      arr.splice(i, 1);
	      break;
	    }
	  }
	}
	for ( var i = 0; i < bigImgArr.length; i++) {
		updateImgId= document.getElementById(bigImgArr[i]).src;
		imgNamePaths+=updateImgId.substring(updateImgId.lastIndexOf("/")+1);
		if(i!=arrImgName.length-clickNumber-1){
			imgNamePaths+=",";
		}
	}
	/*
	 imgNames为后上传的图片，imag1为上传后的第一张图片，images2...imagesN为上传的第二张照片到第N张照片
	  只有上传图片的个数大于两个时，才执行if(j>1)后面的for循环，否则images2...imagesN是不存在的
	 imgNamePaths为删除后的照片
	 imgName为上传后的照片和删除后的照片
	 */
    var imag1="";
    var imgNames ="";
    /*flat作为标志位，当有图片上传时，flat的值增加1，但是当修改图片时，
            当原有图片变为4个图时，不能上传成功，所以flat有原来进入函数自增1，改为调用完成自增1
            程序中好几处都是调用函数后直接自增的，都可以改为成功后再自增的，在用到这些变量时，可以省去一些判断条件
     */
	if(flat!=0){
		var s=document.getElementById("uploads").src;
		imag1=s.substring(s.lastIndexOf("/")+1);
	}
	if(j==1){
		imgNames =imag1;
	}else if(j>1&&((clickNumber==0&&bigImgArr.length+j<5)||(clickNumber!=0&&j+imgArrIndex<5))){
		imgNames =imag1+",";
		for ( var m = 2; m < j+1; m++) {
			var imgId= document.getElementById("images"+m).src;
			imgNames+=imgId.substring(imgId.lastIndexOf("/")+1);
			if(m<j){
				imgNames+=",";
			}
		}
	}else{
		imgNames =imag1+",";
		for ( var m = 2; m < j; m++) {
			var imgId= document.getElementById("images"+m).src;
			imgNames+=imgId.substring(imgId.lastIndexOf("/")+1);
			if(m<j-1){
				imgNames+=",";
			}
		}
	}
	if(imgNames==""||imgNames==","){
		imgName=imgNamePaths;
	}else if(imgNamePaths==""){
		imgName=imgNames;
	}else{
		imgName=imgNames+","+imgNamePaths;
	}
	//console.log(imgNames);
	//console.log(imgNamePaths);
	//console.log(imgName);
	$.ajax({ 
        url:_serverHome + "manage/HospitalManage_updateHospital",
        type: 'POST', 
        async: true,
		data : {
			"name":e_name,
			"yyfl":e_yyfl,
			"lxfs":e_lxfs,
			"kszl":e_kszl,
			"dydd":e_dydd,
			"yyjj":e_yyjj,
			"yytp":imgName,
			"state":1,
			"id":data[0],
			"yydz":e_yydz
		},
		dataType : 'json',
        success: function (data) {
        	if(data.success){
        		update.close();
				Dialog.SUCCESS("修改成功");
				window.onload();
			}else{
				Dialog.FAIL("修改失败");
			}
        }
   }); 
	/*提交后将所有全局变量都设为初始值，以防在进行修改时，数组中的元素之前操作的数据仍然会保留在数组中*/
	j=0;
	arrImgName="";
	imgArr=[];
	bigImgArr=[];
	clickNumber=0;
	flat=0;
	deleteImgArr=[];
	cishu=0;
}