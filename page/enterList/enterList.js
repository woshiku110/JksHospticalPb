var imgArray="";
var enterTable="";
var drugArr=[];
window.onload = function(){
	var enterBtn=document.getElementById("enterBtn");
	enterBtn.style.height="22px";
	enterBtn.style.width="30px";
	enterBtn.style.fontSize="14px";
	enterBtn.style.lineHeight="22px";
	var commitBtn=document.getElementById("commitBtn");
	commitBtn.style.height="22px";
	commitBtn.style.width="30px";
	commitBtn.style.fontSize="14px";
	commitBtn.style.lineHeight="22px";
	
	var rowNum = parseInt((getWindowSize().y-360)/42);
    enterTable = new Table("content_right_table",rowNum,6);
    document.getElementById("content_right_table").tableObject = enterTable;
    enterTable.setColWidth(["6%","21%","21%","21%","21%","10%"]);
    enterTable.setHead(["序号","订单编号","药品名称/编号","药品规格","药品数量","操作"]);
    var m=0;
    var qingchu = function(data){
		var a = document.createElement("a");
		a.className = "button";
		a.innerHTML = "删除";
		a.style.height="22px";
		a.style.width="30px";
		a.style.fontSize="14px";
		a.style.lineHeight="22px";
		a.onclick = function(){
			var index=data[4];
			var newData = drugArr.filter(function(item) {
				return item[4]!= index;
				});
			drugArr = newData;
			enterTable.clean();
			for ( var i = 0; i < drugArr.length; i++) {
				drugArr[i].splice(4,1,i+1);//重新计算序号
				enterTable.add(drugArr[i], true);
				document.getElementById("sum").innerHTML=i+1;
			}
		};
		return a;
	};
    enterTable.setTemplate(["[4]","[0]","[1]","[2]","[3]",qingchu]);
};
/*
 获取药单
 */
function startEnterInfo(){
	var a = document.getElementById("startEnterInfo");
	if(a.innerText=="开始录入"){
		a.innerHTML = "暂停录入";
		loadButtonIcon(a);
		var span = a.getElementsByTagName("span")[0];
		span.style.backgroundImage="url('img/ico_stop.png')";
		startEnterInfomation();//开始录入
	}else{
		endEnterInfomation();//停止录入
	}
}
function startEnterInfomation(){
	var doajax={
   			type : "post",
   			url :_serverHome + "yuyue/MedicinalProcess_outOfQueue",
   			async: true,
   			data : {},
   			dataType : 'json',
   			success : function(data){
   				var arr = eval("(" + data.msg + ")");
   				imgArray = eval("(" + arr[1] + ")");
   				if(imgArray.length>0){
	   				var picLength=imgArray.length;
   					document.getElementById("page_current").innerHTML=1;
   	   				document.getElementById("page_length").innerHTML=picLength;
   	   				document.getElementById("enter_no").innerHTML=arr[0];
   	   				$("img[id='uploadImage']").attr("src", _filePath+imgArray[0]);
   	   				$('#showImage').show();
   				}else{
   					document.getElementById("page_current").innerHTML=0;
   	   				document.getElementById("page_length").innerHTML=0;
   				}
   			}
   		};
   	$.ajax(doajax);
}
function endEnterInfomation(){
	var orderId=document.getElementById("enter_no").innerHTML;
	var doajax={
   			type : "post",
   			url :_serverHome + "yuyue/MedicinalProcess_pauseImport",
   			async: true,
   			data : {
   				"orderId":orderId
   			},
   			dataType : 'json',
   			success : function(data){
   				console.log(data);
   				if(data.success==true){
   					$("img[id='uploadImage']").attr("src", "");
   					document.getElementById("enter_no").innerHTML="";
   					document.getElementById("drug_number").value="";
   				}
   			}
   		};
   	$.ajax(doajax);
}
/*
 * 通过药品名称或编号返回药品名称或编号,选完药品名称或编号后将药品规格选出来
 */
function setInfos(){
	var drug_standard=document.getElementById("drug_standard");
	changeDropDownInput("drug_standard");
	document.getElementById("drug_standard").value="";
	txt=$("input[name='drug_nameOrNumber']").val();
	if(txt=="")
		return false;
	var doajax=
	{
		type : "post",
		url : _serverHome + "yuyue/MedicinalSupport_yuyue/MedicinalSupport_searchDrugs",
		data:{
			"mcorbh":txt
		},
		async:true,
		dataType : 'json',
		success : function(data) {
			var arr = eval("(" + data.msg + ")");
			var array=eval("(" + arr[0][1] + ")");
			var context="";
			if(array.length>0){
				context="[";
				for ( var i = 0; i < array.length; i++) {
		  				context+="{'id':'"+array[i][0];
		  				context+="'";
		  				context+=",";
		  				context+="\"name\":\""+array[i][2];
		  				context+="\"}";
		  				if(i<array.length-1)
		  					context+=",";
	   			}
				context+="]";
			}
			var context = eval("(" + context + ")");
			drug_standard.dataSource=context;
			drug_standard.visible = function(arr){
				return arr.name;
			};
			drug_standard.autoMatch = true;
			drug_standard.flush();
			drug_standard.visible = function(arr){
				return null;
			};
		}
	};
	$.ajax(doajax);
}
/*
 录入信息
 */
var i=0;
function enterInfo(){
	i++;
	var enter_no=document.getElementById("enter_no").innerHTML;
	var drug_nameOrNumber=document.getElementById("drug_nameOrNumber").value;
	var drug_standard=document.getElementById("drug_standard").value;
	var drug_number=document.getElementById("drug_number").value;
	var m = drug_standard.split(",");
	if(enter_no==null||enter_no==""){
		document.getElementById("result").innerHTML="<font color='red'>订单编号不能为空</font>";
		return false;
	}
	if(drug_nameOrNumber==null||drug_nameOrNumber==""){
		document.getElementById("result").innerHTML="<font color='red'>药品名称/编号不能为空</font>";
		return false;
	}
	if(drug_number==null||drug_number==""){
		document.getElementById("result").innerHTML="<font color='red'>药品数量不能为空</font>";
		return false;
	}
	var newArr = new Array;
	newArr[0]=enter_no;//订单编号
	newArr[1]=drug_nameOrNumber;//药品数量
	newArr[2]=drug_standard;//药品规格
	newArr[3]=drug_number;//药品编号
	newArr[4]=i;//序号
	newArr[5]=m[0];//所选择的药品规格放入数组中
	/*
	 将录入的信息放入一个二维数组中，二维数组作为一个全局变量，提交时用
	 */
	drugArr.push(newArr);
	enterTable.add(newArr, true);
	document.getElementById("sum").innerHTML=i;
	document.getElementById("drug_nameOrNumber").value="";
	document.getElementById("drug_standard").value="";
	document.getElementById("drug_number").value="";
}
/*
 提交所有药品详细信息
 */
var submitArr=[];
function commitInfo(){
	for ( var i = 0; i < drugArr.length; i++) {
		var detailArr = new Array;
		detailArr[0]=drugArr[i][5];
		detailArr[1]=drugArr[i][3];
		submitArr.push(detailArr);
	}
	var orderId=document.getElementById("enter_no").innerHTML;
	if(submitArr.length==0){
		document.getElementById("result").innerHTML="<font color='red'>请先录入信息，再进行提交</font>";
		return false;
	}
	var doajax={
   			type : "post",
   			url :_serverHome + "yuyue/MedicinalProcess_importFinish",
   			async: true,
   			data : {
   				"orderId":orderId,
   				"ydlr":submitArr
   			},
   			dataType : 'json',
   			success : function(data){
   				if(data.success==true){
   					document.getElementById("drug_nameOrNumber").value="";
   					document.getElementById("drug_standard").value="";
   					document.getElementById("drug_number").value="";
   					document.getElementById("sum").innerHTML="";
   					enterTable.clean();
   					startEnterInfomation();
   				}
   			}
   		};
   $.ajax(doajax);
}
/*
 输入框只能输入数字
 */
function keyup(input_val) {
	  if(input_val.value.length==1){
		  input_val.value=input_val.value.replace(/[^1-9]/g,'');
	  	}else{
	  		input_val.value=input_val.value.replace(/\D/g,'');
	  	}
	}
function paste(input_val) {
	if(input_val.value.length==1){
		input_val.value=input_val.value.replace(/[^1-9]/g,'');
	}else{
		input_val.value=input_val.value.replace(/\D/g,'');
	}
}  
