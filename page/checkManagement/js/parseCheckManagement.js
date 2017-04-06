/**
 * 检查项列表下面的所属医院
 * **/
function parseGetHospitalList(msg){
    var hospital_head = document.getElementById('hospital_head');
    hospital_head.dataSource = msg;
    hospital_head.howVisible=function(arr1){
        return arr1[1];
    };
    hospital_head.onMatch = function(option){
        document.getElementById("show");
        console.log(option[0]);
        CheckManage_checkList(option[0])
    }
    hospital_head.flush();
}
function showMatch(){
    var hospital_head = document.getElementById('hospital_head');
    hospital_head.flush();
    var option = hospital_head.hitOption;
    var yyid = option[0];
    return yyid;
}
/**
 * 添加检查项下面的所属医院
 * **/
function parseGetHospitalList1(msg){
    var ssyy = document.getElementById('ssyy');
    ssyy.dataSource = msg;
    ssyy.howVisible=function(arr1){
        return arr1[1];
    };

    ssyy.flush();
}
function showMatch1(){
 var ssyy = document.getElementById('ssyy');
 var option = ssyy.hitOption;
 var yyid = option[1];
 }
//添加检查项的上来下去
function upDown(){
    var head = document.getElementById('head');
    var firstBtn = document.getElementById('firstBtn');
    $(head).slideDown();
    $( firstBtn).slideUp(1);
}
//添加检查项的取消
function cancel(){
    var head = document.getElementById('head');
    var firstBtn = document.getElementById('firstBtn');
    $(head).slideUp();
    $( firstBtn).slideDown(0.000000001);
}
