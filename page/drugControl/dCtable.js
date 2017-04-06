///<reference path="jquery.d.ts" />

var t = new Table("drug_table", 5, 7);
t.setColWidth(["2%", "29%", "16%", "13%", "13%", "17%", "10%"]);
t.setHead(["", "药品编号", "药品名称", "药品规格", "药品单位", "药品售价", "操作"]);


var t4 = function (drugdata) {
    return "<a class='drugclear' onclick='removeRow(this)'>删除</a>";
};

var template = ["", "[0]", "[1]", "[2]", "[3]", "[4]", t4];
t.setTemplate(template);

var a = 0;
var p = 0;
var r = 0;

// a++;
function drugAdd() {
    if ($("#drugnumber").length==0||$("#drugname").val()==0||$("#drugsize").val()==0|| $("#drugbox").val()==0||$("#drugprice").val()==0){
        alert("添加药品缺少必要值");
    }
    else{
        var drugdata = [$("#drugnumber").val(), $("#drugname").val(), $("#drugsize").val(), $("#drugbox").val(), $("#drugprice").val()];
        var ra = t.add(drugdata, true);
        ra.id = $("#drugnumber").val();
    }
}
function removeRow(nowRow){
				var rt = $(nowRow).parent().parent().attr("id");
				var ra = t.remove(rt);
			}
// $(document).ready(function () {


//     $("#idadd").click(function () {

//         $.ajax({
//             type: "POST",
//             url: "#",///////////////////////////////////////
//             data: {   //名称之后照后端改动
//                 number: $("#drugnumber").val(),
//                 name: $("#drugname").val(),
//                 size: $("#drugsize").val(),
//                 box: $("#drugbox").val(),
//                 price: $("#drugprice").val()
//             },
//             dataType: "json",
//             success: callback,
//             // error:,




//             // success: function(data){
//             // 	if (data.success) { 
//             // 		$("#createResult").html(data.msg);
//             // 	} else {
//             // 		$("#createResult").html("出现错误：" + data.msg);
//             // 	}  
//             // },
//             // error: function(jqXHR){     
//             //    alert("发生错误：" + jqXHR.status);  
//             // },     
//         });
//     });


//     $("#idfind").click(function () {
//         $.ajax({
//             type: "GET",
//             url: "#?number=" + $("#keyword").val(),/////////////////////////////
//             dataType: "json",
//             // success: ,///////////////////////////



//             // success: function(data) {
//             // 	if (data.success) { 
//             // 		$("#searchResult").html(data.msg);
//             // 	} else {
//             // 		$("#searchResult").html("出现错误：" + data.msg);
//             // 	}  
//             // },
//             // error: function(jqXHR){     
//             //    alert("发生错误：" + jqXHR.status);  
//             // },     
//         });
//     });




// });