/*
 设置表格
 */
var tj="";
var hospitalTable="";
var xuhao=1;
var ck="";
var update="";
var j=0;
window.onload = function(){
    var add_hospital = document.getElementById('add_hospital');
    add_hospital.onclick = function(){
    	var context="";
    	tj = new Dialog(950,500);
    	tj.setTitle("添加");
    	context+="<div>"+
        "<table cellspacing=\"5\" style=\"margin-top:10px;margin-left:25px;\">"+
			"<tr class=\"setWidth\">"+
                "<td class=\"td_title\">医院名称:</td>"+
                "<td class=\"col\">"+
                    "<input id=\"hospitalName\" name=\"hospitalName\" style=\"width:156px;\"/>"+
                "</td>"+
                "<td class=\"td_title\">医院分类:</td>"+
                "<td class=\"col\">"+
                    "<input id=\"hospitalClassify\" name=\"hospitalClassify\" style=\"width:85px;\"/>"+
                "</td>"+
				"<td class=\"td_title\">医院地址:</td>"+
	            "<td class=\"col\">"+
	                "<input id=\"hospitalPlace\" name=\"hospitalPlace\" style=\"width:90px;\"/>"+
	            "</td>"+
	            "<td class=\"td_title\">联系方式:</td>"+
	            "<td class=\"col\">"+
	                "<input id=\"tel\" name=\"tel\" style=\"width:156px;\"/>"+
	            "</td>"+
			"</tr>"+
			"<tr class=\"setWidth\">"+
                "<td class=\"td_title\">科室种类:</td>"+
                "<td colspan=\"8\">"+
	               "<textarea id=\"classify\" name=\"classify\" class=\"setWh\"></textarea>"+
                "</td>"+
			"</tr>"+
			"<tr class=\"setWidth\">"+
	            "<td class=\"td_title\">打印地点:</td>"+
	            "<td class=\"col\">"+
	               "<input id=\"place\" name=\"place\"/>"+
	            "</td>"+
			"</tr>"+
			"<tr class=\"setWidth\">"+
	            "<td class=\"td_title\">医院简介:</td>"+
	            "<td colspan=\"8\">"+
	               "<textarea id=\"introduce\" name=\"introduce\" class=\"setWh\"></textarea>"+
	            "</td>"+
			"</tr>"+
			"<tr class=\"setImageWidth\">"+
				"<td colspan=\"8\">"+
					"<form id= \"uploadForm\">"+
						"<div>"+
							"<input type=\"file\" id=\"file\" name=\"upload\" onchange=\"fileUpload();\" style=\"display:none;\"/>"+
						"</div>"+
						"<div style=\"float:left\">"+
							"<img id=\"upload\" height=\"100\" width=\"170\" src=\"\" style=\"display:none;margin-right:15px\">"+
						"</div>"+
						"<div style=\"float:left\">"+
							"<img height=\"100\" width=\"170\" src=\"img/img_add.png\"  onclick=\"fileSelect();\">"+
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
           "<a href=\"javascript:void(0)\" class=\"button\" id=\"commitBtn\" onclick=\"addHospitalInfo()\">添加</a>&nbsp&nbsp&nbsp&nbsp&nbsp"+
           "<a href=\"javascript:void(0)\" class=\"button\" id=\"calcelBtn\" onclick=\"closeAddDialog()\">取消</a>"+
        "</div>"+
     "</div>";
    	tj.setBody(context);
    	tj.show();
    	var commitBtn=document.getElementById("commitBtn");
		commitBtn.style.height="22px";
		commitBtn.style.width="30px";
		commitBtn.style.fontSize="14px";
		commitBtn.style.lineHeight="22px";
		var calcelBtn=document.getElementById("calcelBtn");
		calcelBtn.style.height="22px";
		calcelBtn.style.width="30px";
		calcelBtn.style.fontSize="14px";
		calcelBtn.style.lineHeight="22px";
		calcelBtn.style.background="#fff";
		calcelBtn.style.color="#3268AF";
		calcelBtn.style.border="1px solid #3268AF";
	};
    var rowNum = parseInt((getWindowSize().y-360)/42);
    hospitalTable = new Table("content_table",rowNum,7);
    document.getElementById("content_table").tableObject = hospitalTable;
    hospitalTable.setColWidth(["10%","20%","17%","16%","17%","10%","10%"]);
    hospitalTable.setHead(["序号","医院名称","医院分类","医生数量","联系方式","操作","操作"]);
	
    var chakan = function(data){
		var a = document.createElement("a");
		a.className = "button";
		a.innerHTML = "查看";
		a.style.height="22px";
		a.style.width="30px";
		a.style.fontSize="14px";
		a.style.lineHeight="22px";
		a.style.background="#fff";
		a.style.color="#3268AF";
		a.style.border="1px solid #3268AF";
		a.onclick = function(){
			detail(data);
		};
		return a;
	};
	 var qingchu = function(data){
			var a = document.createElement("a");
			a.className = "button";
			a.innerHTML = "删除";
			a.style.height="22px";
			a.style.width="30px";
			a.style.fontSize="14px";
			a.style.lineHeight="22px";
			a.onclick = function(){
				deleteHospital(data);
			};
			return a;
		};
    hospitalTable.setTemplate(["[5]","[1]","[2]","[3]","[4]",chakan,qingchu]);
    var doajax={
   			type : "post",
   			url :_serverHome + "manage/HospitalManage_getHospitalList",
   			async: true,
   			data : {},
   			dataType : 'json',
   			success : function(data){
   				var msg=eval("(" + data.msg + ")");
   				hospitalTable.clean();
				for ( var i = 0; i <msg.length; i++) {
					if(msg[i][0]!=null){
						msg[i].splice(5, 0, xuhao);
						xuhao++;
						hospitalTable.add(msg[i], true);
				    }
			    }
   			}
   		};
    $.ajax(doajax);
    xuhao=1;
};
/*
 关闭窗口
 */
function closeAddDialog(){
	tj.close();
}
/*
 图片上传
 */
function fileUpload(){
	j++;
	if(j>4){
		document.getElementById("result").innerHTML="<font color='red'>您最多只能上传四张图片</font>";
		return false;
	}
    var formData = new FormData($( "#uploadForm" )[0]);
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
        		 $("#upload").attr("src", _filePath+data.msg);
                 $('#upload').show();
        	 }else if(j==2){
        		 var imagePath=_filePath+data.msg;
        		 $("#upload").after("<img id=\"image"+j+"\" src=\"\" height=\"100\" width=\"170\" style=\"margin-right:15px\"/>");
        		 $("#"+"image"+j).attr("src", imagePath);
                 $("#"+"image"+j).show();
        	 }else{
        		 var imagePath=_filePath+data.msg;
        		 $("#"+"image"+(j-1)).after("<img id=\"image"+j+"\" src=\"\" height=\"100\" width=\"170\" style=\"margin-right:15px\"/>");
        		 $("#"+"image"+j).attr("src", imagePath);
                 $("#"+"image"+j).show();
        	 }
         }, 
         error: function (data) { 
         	console.log(data);
         } 
    });  
  }
function fileSelect() {
    document.getElementById("file").click();
}
/*
添加医院信息
*/
var k=0;
function addHospitalInfo(){
	k++;
	var name=$("input[name='hospitalName']").val();//医院名称
	var yyfl=$("input[name='hospitalClassify']").val();//医院分类
	var yydz=$("input[name='hospitalPlace']").val();//医院地址
	var lxfs=$("input[name='tel']").val();//联系方式
	var kszl=$("textarea[name='classify']").val();//科室种类
	var dydd=$("input[name='place']").val();//打印地点
	var yyjj=$("textarea[name='introduce']").val();//医院简介
	var s=document.getElementById("upload").src;
	imag1=s.substring(s.lastIndexOf("/")+1);
	var imgName =imag1;
	var imgNamePath="";
	/*j的值为调用图片上传函数的次数,当图片的个数大于4个时，不允许再上传图片，但是j的值已经变为5，所以进行判断，
	当大于5时，图片的个数还是4个，即j-1个，当j的值小于4个时，长度是j
	*/
	if(j<=4){
		for ( var i = 2; i < j+1; i++) {
			var imgId= document.getElementById("image"+i).src;
			imgNamePath+=","+imgId.substring(s.lastIndexOf("/")+1);
		}
	}else{
		for ( var i = 2; i < j; i++) {
			var imgId= document.getElementById("image"+i).src;
			imgNamePath+=","+imgId.substring(s.lastIndexOf("/")+1);
		}
	}
	//console.log(imgName);
	//console.log(imgNamePath);
	imgName=imgName+imgNamePath;
	//console.log(imgName);
	if(name==""){
		document.getElementById("result").innerHTML="<font color='red'>医院名称不能为空</font>";
		return false;
	}
	if(yyfl==""){
		document.getElementById("result").innerHTML="<font color='red'>医院分类不能为空</font>";
		return false;
	}
	if(yydz==""){
		document.getElementById("result").innerHTML="<font color='red'>医院地址不能为空</font>";
		return false;
	}
	if(lxfs==""){
		document.getElementById("result").innerHTML="<font color='red'>联系方式不能为空</font>";
		return false;
	}
	if(kszl==""){
		document.getElementById("result").innerHTML="<font color='red'>科室种类不能为空</font>";
		return false;
	}
	if(dydd==""){
		document.getElementById("result").innerHTML="<font color='red'>打印地点不能为空</font>";
		return false;
	}
	if(yyjj==""){
		document.getElementById("result").innerHTML="<font color='red'>医院简介不能为空</font>";
		return false;
	}
	/*if(imag1.indexOf("hospitalManage")!=-1){
		document.getElementById("result").innerHTML="<font color='red'>医院图片不能为空</font>";
		return false;
	}*/
	$.ajax({ 
        url:_serverHome + "manage/HospitalManage_addHospital",
        type: 'POST', 
        async: true,
		data : {
			"name":name,
			"yyfl":yyfl,
			"lxfs":lxfs,
			"kszl":kszl,
			"dydd":dydd,
			"yyjj":yyjj,
			"yytp":imgName,
			"state":1,
			"yydz":yydz
		},
		dataType : 'json',
        success: function (data) {
        	if(data.success){
        		tj.close();
				Dialog.SUCCESS("添加成功");
				window.onload();
			}else{
				Dialog.FAIL("添加失败");
			}
        }, 
        error: function (data) { 
        	console.log(data);
        } 
   }); 
	j=0;
}
/*
删除医院
 */
function deleteHospital(data){
	$.ajax({ 
        url:_serverHome + "manage/HospitalManage_deleteHospital",
        type: 'POST', 
        async: true,
		data : {
			"id":data[0]
		},
		dataType : 'json',
        success: function (data) {
        	if(data.success){
				Dialog.SUCCESS("删除成功");
				window.onload();
			}else{
				Dialog.FAIL("删除失败");
			}
        }
   }); 
}
