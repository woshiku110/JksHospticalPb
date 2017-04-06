/*
//加载表格
var rowNum = parseInt((getWindowSize().y-360)/42);
var t = new Table("middle_table_bottom",rowNum,7);
document.getElementById("middle_table_bottom").tableObject = t;
t.setColWidth(["1%","29%","30%","10%","10%","10%","10%"]);
t.setHead(["","药品编号","药品名称","药品规格","药品单位","药品数量","是否缺少药品"]);
t.setTemplate(["","[0]","[1]","[2]","[3]","[4]",function(data){
    var a= document.createElement('a');
    a.index = data[5];
    a.id = data[6]
    if( a.index==0){
        a.setAttribute("class","lose");
        a.innerText="已有";
    }else{
        a.setAttribute("class","lose");
        a.innerText="缺失";
        a.style.background = "#ffffff";
        a.innerText  = "缺失";
        a.style.color = "#2872b7";
    }
    a.onclick = submit;
    return a;
}]);
*/
window.onload = function(){
    var rowNum = parseInt((getWindowSize().y-360)/42);
    var t = new Table("middle_table_bottom",0,7);
    document.getElementById("middle_table_bottom").tableObject = t;
    t.setColWidth(["1%","29%","30%","15%","15%","10%"]);
    t.setHead(["","药品编号","药品名称","药品规格","药品单位","药品数量"]);
    t.setTemplate(["","[0]","[1]","[2]","[3]","[4]"]);
}
//取出药单
function bringOrderBtn(){
    var BO = document.getElementById('bringOrder');
    var c = document.getElementById('finish');
    var d = document.getElementById('printTicket');
        if (BO.times) {
            BO.innerHTML = "取出药单 ";
            pauseSorting();
            BO.times = false;
            c.disabled = "disabled";
            c.setAttribute("disabled","disabled");
            d.disabled = "disabled";
            d.setAttribute("disabled","disabled");

        }else{
            BO.innerHTML = "暂停检药";
            bringOrder();
            c.disabled = "";
            c.setAttribute("disabled","false");
            BO.times=true;
            d.disabled = "";
            d.setAttribute("disabled","false");


        }
}
//打印小票
function printTicket(){
    alert("打印成功！");
}

//提交完成
/*function finish(){
    var c = document.getElementById('finish');
        if(c.getText() =="提交完成"){
            sortingEnd();
           // alert(1)
        }
       *//* if(c.getText() =="提交问题"){
            problemOrder();
            alert(2);
        }*//*
}*/
