/*
 设置表格
 */
 var drugTable="";
window.onload = function(){
    var add_search = document.getElementById('add_search');
    add_search.style.height="25px";
    add_search.style.width="45px";
    add_search.style.fontSize="14px";
    add_search.style.lineHeight="25px"; 
    var addDrugButton = document.getElementById('addDrugButton');
    addDrugButton.style.height="22px";
    addDrugButton.style.width="45px";
    addDrugButton.style.fontSize="14px";
    addDrugButton.style.lineHeight="22px"; 
    addDrugButton.style.marginTop="10px";
    var add_drug = document.getElementById('add_drug');
    var head = document.getElementById('head');
    var maxH = head.offsetHeight;
    head.style.overflow="hidden";
    head.style.height="40px";
    add_drug.onclick= function(){
        toggler(head,40,maxH);
    };
    var rowNum = parseInt((getWindowSize().y-360)/42);
    drugTable = new Table("content_table",rowNum,7);
    document.getElementById("content_table").tableObject = drugTable;
    drugTable.setColWidth(["10%","16%","16%","16%","16%","16%","10%"]);
    drugTable.setHead(["序号","药品编号","药品名称","药品规格","药品单位","药品售价","操作"]);
    var qingchu = function(data){
		var a = document.createElement("a");
		a.className = "button";
		a.innerHTML = "删除";
		a.style.height="22px";
		a.style.width="30px";
		a.style.fontSize="14px";
		a.style.lineHeight="22px";
		a.onclick = function(){
			deleteDrug(data);
		};
		return a;
	};
    drugTable.setTemplate(["[6]","[1]","[2]","[3]","[4]","[5]",qingchu]);
       	var doajax={
       			type : "post",
       			url :_serverHome + "manage/ResourceManage_searchDrugs",
       			async: true,
       			data : {
       				
       			},
       			dataType : 'json',
       			success : function(data){
       				var msg=data.msg;
       				var arr = eval("(" + msg + ")");
       				drugTable.clean();
       				var m=0;
       				for ( var i = 0; i <arr.length; i++) {
	       				 m++;
	     			    var newArr = new Array;
	     				newArr[0]=arr[i][0];
	     				newArr[1]=arr[i][1];
	     				newArr[2]=arr[i][2];
	     				newArr[3]=arr[i][3];
	     				newArr[4]=arr[i][4];
	     				newArr[5]=arr[i][5];
	     				newArr[6]=m;
	     				drugTable.add(newArr, true);
	     			}
	     			document.getElementById("sum").innerHTML=m;
       			}
       		};
     $.ajax(doajax);
};
/*
录入药品
*/
function addDrugSummit(){
	var bh=$("input[name='drug_number']").val();//药品编号
	var mc=$("input[name='drug_name']").val();//药品名称
	var gg=$("input[name='drug_standard']").val();//药品规格
	var dw=$("input[name='drug_unit']").val();//药品单位
	var dj=$("input[name='drug_price']").val();//药品售价
	if(bh==""){
		document.getElementById("result").innerHTML="<font color='red'>药品编号为必填项</font>";
		return false;
	}
	if(mc==""){
		document.getElementById("result").innerHTML="<font color='red'>药品名称为必填项</font>";
		return false;
	}
	if(gg==""){
		document.getElementById("result").innerHTML="<font color='red'>药品规格为必填项</font>";
		return false;
	}
	if(dw==""){
		document.getElementById("result").innerHTML="<font color='red'>药品单位为必填项</font>";
		return false;
	}
	if(dj==""){
		document.getElementById("result").innerHTML="<font color='red'>药品售价为必填项</font>";
		return false;
	}
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/ResourceManage_addMedicinal",
		data : {
			"bh":bh,
			"mc":mc,
			"gg":gg,
			"dw":dw,
			"dj":dj
		},
		dataType : 'json',
		success : function(data){
			if(data.success==true){
				Dialog.SUCCESS("添加成功");
				searchDrug();
				addDrug_down();
			}else{
				Dialog.FAIL("添加失败");
			}
		}
	};
	$.ajax(doajax);
}
function addDrug_down(){
	var head = document.getElementById('head');
    head.style.height="40px";
    head.action=-1;
    //将之前的输入清空
    document.getElementById("drug_number").value="";
    document.getElementById("drug_name").value="";
    document.getElementById("drug_standard").value="";
    document.getElementById("drug_unit").value="";
    document.getElementById("drug_price").value="";
}
/*
查询药品
*/
function searchDrug(){
	var mcorbh=$("input[name='nameOrNumber']").val();//药品编号/药品名称
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/ResourceManage_searchDrugs",
		data : {
			"mcorbh": mcorbh
		},
		dataType : 'json',
		success : function(data){
			var msg=data.msg;
			var arr = eval("(" + msg + ")");
			drugTable.clean();
			var m=0;
			for ( var i = 0; i <arr.length; i++) {
			    m++;
			    var newArr = new Array;
				newArr[0]=arr[i][0];
				newArr[1]=arr[i][1];
				newArr[2]=arr[i][2];
				newArr[3]=arr[i][3];
				newArr[4]=arr[i][4];
				newArr[5]=arr[i][5];
				newArr[6]=m;
				drugTable.add(newArr, true);
			}
			document.getElementById("sum").innerHTML=m;
		}
	};
	$.ajax(doajax);
}
/*
删除药品
*/
function deleteDrug(data){
	var id=data[0];//id
	var bh=data[1];//药品编号
	var mc=data[2];//药品名称
	var gg=data[3];//药品规格
	var dw=data[4];//药品单位
	var dj=data[5];//药品售价 
	var doajax=
	{
		type : "post",
		url : _serverHome + "manage/ResourceManage_updateMedicinal",
		data : {
			"bh":bh,
			"mc":mc,
			"gg":gg,
			"dw":dw,
			"dj":dj,
			"state":2,
			"id":id
		},
		dataType : 'json',
		success : function(data){
			if(data.success==true){
				Dialog.SUCCESS("删除成功");
				searchDrug();
			}else{
				Dialog.FAIL("删除失败");
			}
		}
	};
	$.ajax(doajax);
}