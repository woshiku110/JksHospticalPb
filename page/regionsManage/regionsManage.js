/*
 设置表格
 */
var bj="";
var pid="";
var id="";
window.onload = function(){
	var addPartButton = document.getElementById('addPartButton');
	addPartButton.style.height="22px";
	addPartButton.style.width="45px";
	addPartButton.style.fontSize="14px";
	addPartButton.style.lineHeight="22px"; 
	addPartButton.style.marginTop="15px";
    var rowNum = parseInt((getWindowSize().y-360)/42);
    var regionsTable = new Table("content_table",rowNum,6);
    document.getElementById("content_table").tableObject = regionsTable;
    regionsTable.setColWidth(["6%","24%","24%","24%","11%","11%"]);
    regionsTable.setHead(["序号","一级分类","二级分类","三级分类","操作","操作"]);
    var chakan = function(data){
		var a = document.createElement("a");
		a.className = "button";
		a.innerHTML = "编辑";
		a.style.height="22px";
		a.style.width="30px";
		a.style.fontSize="14px";
		a.style.lineHeight="22px";
		a.onclick = function(){
			var context="";
			pid=data[2];
			bj = new Dialog(300,200);
			bj.setTitle("编辑");
			context+="<div class=\"updateDiv\">"+
		        "<table cellspacing=\"10\" style=\"margin-top:10px;margin-left:25px\">"+
					"<tr>"+
		                "<td class=\"update_td_title\">一级分类:</td>"+
		                "<td class=\"update_col\">"+
		                    "<div id=\"update_one_classify\" name=\"update_one_classify\"></div>"+
		                "</td>"+
					"</tr>"+
					"<tr>"+
		                "<td class=\"update_td_title\">二级分类:</td>"+
		                "<td class=\"update_col\">"+
		                   "<div id=\"update_second_classify\" name=\"update_second_classify\"></div>"+
		                "</td>"+
					"</tr>"+
					"<tr>"+
		                "<td class=\"update_td_title\">三级分类:</td>"+
		                "<td class=\"update_col\">"+
			               "<input id=\"update_third_classify\" name=\"update_third_classify\" />"+
		                "</td>"+
					"</tr>"+
				"</table>"+
				"<div style=\"text-align:center;margin-top:25px\">"+
		           "<a href=\"javascript:void(0)\" class=\"button\" id=\"commitBtn\" onclick=\"updataPartInfo()\">提交</a>"+
		          " <a href=\"javascript:void(0)\" class=\"button\" id=\"calcelBtn\" onclick=\"closeUpdateDialog()\">取消</a>"+
		     	"</div>"+
		    "</div>";
		    bj.setBody(context);
			bj.show();
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
			document.getElementById("update_one_classify").innerHTML="全体";
			document.getElementById("update_second_classify").innerHTML=data[1];
			document.getElementById("update_third_classify").value=data[3];
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
			var id=data[2];
			deletePart(id);
		};
		return a;
	};
    regionsTable.setTemplate(["[4]","全体","[1]","[3]",chakan,qingchu]);
       	var doajax={
       			type : "post",
       			url :_serverHome + "manage/PartManage_partAllList",
       			async: true,
       			data : {},
       			dataType : 'json',
       			success : function(data){
       				var msg=data.msg;
       				var arr = eval("(" + msg + ")");
       				regionsTable.clean();
       				//var sum=0;
       				var m=0;
       				for ( var i = 0; i <arr.length; i++) {
       					var detailMsg = eval("(" + arr[i][2] + ")");
       					//sum=sum+parseInt(arr[i][3]);
       					//document.getElementById("sum").innerHTML=sum;
       					if(arr[i][3]!=0){
       						for ( var j =detailMsg.length-1; j >=0 ; j--) {
       							m++;
       							var newArr = new Array;
       							newArr[0]=arr[i][0];
       							newArr[1]=arr[i][1];
       							newArr.splice(2, 0, detailMsg[j][0]);
       							newArr.splice(3, 0, detailMsg[j][1]);
       							newArr[4]=m;//序号 
       							regionsTable.add(newArr, true);
							}
       					}
       					document.getElementById("sum").innerHTML=m;
       				}
       			}
       		};
     $.ajax(doajax);
};

/*
选择框联动
*/
function getRegions(){
	var one_classify=document.getElementById("one_classify").value;
	if(one_classify=="")
		return false;
	var second_classify=document.getElementById("second_classify");
	changeDropDownInput("second_classify");
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/PartManage_partAllList",
		data : {},
		dataType : 'json',
		async:true,
		success : function(data){
			var msg=data.msg;
			var arr = eval("(" + msg + ")");
			var context="";
			if(arr.length>0){
				context="[";
				for ( var i = 0; i < arr.length; i++) {
		  				context+="{'id':'"+arr[i][0];
		  				context+="'";
		  				context+=",";
		  				context+="\"name\":\""+arr[i][1];
		  				context+="\"}";
		  				if(i<arr.length-1)
		  					context+=",";
	   			}
				context+="]";
			}
			var context = eval("(" + context + ")");
			second_classify.dataSource=context;
			second_classify.howVisible = function(arr){
				return arr.name;
			};
			second_classify.autoMatch = true;
			second_classify.flush();
			second_classify.visible = function(arr){
				return null;
			};
		}
	};
	$.ajax(doajax);
}
/*
录入部位
*/
//得到二级分类所选中的id 
function showMatch(){
	var option = second_classify.hitOption;
	return option.id;
}
function addPartSummit(){
	var second_seclectId=showMatch();//将返回值放在second_seclectId中
	var inputValue=document.getElementById("third_classify").value;
	var one_seclectValue=document.getElementById("one_classify").value;
	var second_seclectValue=document.getElementById("second_classify").value;
	if(one_seclectValue==""){
		document.getElementById("result").innerHTML="<font color='red'>请您先选择一级分类，再进行提交</font>";
		return false;
	}
	if(second_seclectValue==""){
		document.getElementById("result").innerHTML="<font color='red'>请您先选择二级分类，再进行提交</font>";
		return false;
	}
	if(inputValue==""){
		document.getElementById("result").innerHTML="<font color='red'>请您先添加三级分类，再进行提交</font>";
		return false;
	}
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/PartManage_addPart",
		data : {
			"pid": second_seclectId,
			"name":inputValue
		},
		dataType : 'json',
		success : function(data){
			if(data.success==true){
				Dialog.SUCCESS("添加成功");
				window.onload();
				add_down();//提交成功后，将录入部位收回去
			}else{
				Dialog.FAIL("添加失败");
			}
		}
	};
	$.ajax(doajax);
}
function add_down(){
	var add_regions_div = document.getElementById('add_regions_div');
	var head = document.getElementById('head');
	head.style.height="40px";
	head.action=-1;
    //将之前的输入清空
    document.getElementById("one_classify").value="";
    document.getElementById("second_classify").value="";
    document.getElementById("third_classify").value="";
}
/*
删除部位
*/
function deletePart(id){
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/PartManage_datelePart",
		data : {
			"pid":id,
		},
		dataType : 'json',
		success : function(data){
			if(data.success==true){
				Dialog.SUCCESS("删除成功");
				window.onload();
			}else{
				Dialog.FAIL("删除失败");
			}
		}
	};
	$.ajax(doajax);
}
/*
编辑部位
*/
function updataPartInfo(){
	var update_third_classify=document.getElementById("update_third_classify").value;
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/PartManage_updatePartInfo",
		data : {
			"pid":pid,
			"name":update_third_classify
		},
		dataType : 'json',
		success : function(data){
			if(data.success==true){
				closeUpdateDialog();
				Dialog.SUCCESS("修改成功");
				window.onload();
			}else{
				Dialog.FAIL("修改失败");
			}
		}
	};
	$.ajax(doajax);
}
/*
关闭窗口
*/
function closeUpdateDialog(){
	bj.close();
}