var detailData="";
function detail(data){
	var doajax={
   			type : "post",
   			url :_serverHome + "manage/HospitalManage_getHospitalInfo",
   			async: true,
   			data : {
   				"id":data[0]
   			},
   			dataType : 'json',
   			success : function(data){
   				var msg=eval("(" + data.msg + ")");
   				detailData=msg;
   				document.getElementById("hospitalName").innerHTML=msg[1];
   				document.getElementById("hospitalClassify").innerHTML=msg[5];
   				document.getElementById("tel").innerHTML=msg[6];
   				document.getElementById("classify").innerHTML=msg[7];
   				document.getElementById("hospitalPlace").innerHTML=msg[13];
   				document.getElementById("place").innerHTML=msg[8];
   				document.getElementById("introduce").innerHTML=msg[9];
   				var arrImgName= msg[10].split(","); 
   				var imageDiv=document.getElementById("imageDiv");
   				var img="";
   				for ( var i = 0; i < arrImgName.length; i++) {
   				    img+="<img id=\"image"+i+"\" src=\""+_filePath+arrImgName[i]+"\" height=\"100\" width=\"170\" style=\"margin-right:15px\"/>";
				}
   				$(imageDiv).append(img);
   			}
   		};
    $.ajax(doajax);
	var context="";
	ck = new Dialog(960,500);
	ck.setTitle("查看医院信息");
	context+="<div>"+
    "<table cellspacing=\"5\" style=\"margin-top:10px;margin-left:25px\">"+
		"<tr class=\"setWidth\">"+
            "<td class=\"td_title\">医院名称:</td>"+
            "<td class=\"detail_col\">"+
                "<div id=\"hospitalName\" name=\"hospitalName\"></div>"+
            "</td>"+
            "<td class=\"td_title\">医院分类:</td>"+
            "<td class=\"detail_col\">"+
                "<div id=\"hospitalClassify\" name=\"hospitalClassify\" style=\"width:85px;\"></div>"+
            "</td>"+
			"<td class=\"td_title\">医生数量:</td>"+
            "<td class=\"detail_col\">"+
                "<div id=\"hospitalNumber\" name=\"hospitalNumber\" style=\"width:43px;\"></div>"+
            "</td>"+
            "<td class=\"td_title\">联系方式:</td>"+
            "<td class=\"detail_col\">"+
                "<div id=\"tel\" name=\"tel\" style=\"width:156px;\"></div>"+
            "</td>"+
		"</tr>"+
		"<tr class=\"setWidth\">"+
            "<td class=\"td_title\">科室种类:</td>"+
            "<td colspan=\"8\">"+
               "<div id=\"classify\" name=\"classify\" class=\"setWh\"></div>"+
            "</td>"+
		"</tr>"+
		"<tr class=\"setWidth\">"+
		 	"<td class=\"td_title\">医院地址:</td>"+
            "<td class=\"detail_col\">"+
               "<div id=\"hospitalPlace\" name=\"hospitalPlace\"></div>"+
            "</td>"+
            "<td class=\"td_title\">打印地点:</td>"+
            "<td class=\"detail_col\">"+
               "<div id=\"place\" name=\"place\"></div>"+
            "</td>"+
		"</tr>"+
		"<tr class=\"setWidth\">"+
            "<td class=\"td_title\">医院简介:</td>"+
            "<td colspan=\"8\">"+
               "<div id=\"introduce\" name=\"introduce\" class=\"setWh\" style=\"height:80px\"></div>"+
            "</td>"+
		"</tr>"+
		"<tr class=\"setImageWidth\">"+
			"<td colspan=\"8\">"+
				"<div id= \"imageDiv\" class=\"setImageHeight\">"+
				"</div>"+
			"</td>"+
	 	"</tr>"+
	"</table>"+
	"<div style=\"text-align:center;margin-top:25px\">"+
       "<a href=\"javascript:void(0)\" class=\"button\" id=\"updateBtn\" onclick=\"updateHospitalInfo(detailData)\">修改</a>&nbsp&nbsp&nbsp&nbsp"+
      " <a href=\"javascript:void(0)\" class=\"button\" id=\"calcelBtn\" onclick=\"closeckDialog()\">取消</a>"+
 	"</div>"+
 "</div>";
	ck.setBody(context);
	ck.show();
	var updateBtn=document.getElementById("updateBtn");
	updateBtn.style.height="22px";
	updateBtn.style.width="30px";
	updateBtn.style.fontSize="14px";
	updateBtn.style.lineHeight="22px";
	var calcelBtn=document.getElementById("calcelBtn");
	calcelBtn.style.height="22px";
	calcelBtn.style.width="30px";
	calcelBtn.style.fontSize="14px";
	calcelBtn.style.lineHeight="22px";
	calcelBtn.style.background="#fff";
	calcelBtn.style.color="#3268AF";
	calcelBtn.style.border="1px solid #3268AF";
}
function closeckDialog(){
	ck.close();
}
