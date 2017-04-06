window.onload = function() {
    //账户列表

    var rowNum = parseInt((getWindowSize().y - 360) / 42);
    var t = new Table("countList", rowNum, 9);
    var arr =['18865478975','周明','6','10','','',''];
    document.getElementById("countList").tableObject = t;
    console.log(document.getElementById("countList"));
    t.setColWidth(["1%", "20%", "15%", "13%", "13%", "13%", "6%","4%","15%"]);
    t.setHead(["", "注册手机", "用户姓名", "账户余额", "冻结金额", "当前状态", "","操作",""]);
    t.setTemplate(["", "[0]", "[1]", "[2]","[3]",function(){
         var freeze = document.createElement('a');
         freeze.setAttribute("class", "button");
         freeze.innerText = "冻结";
         freeze.style.fontSize = 14+"px";
         freeze.onclick = function(){
             alert('已冻结')
         }
        return freeze;
     }, function (){
         var look = document.createElement('a');
         look.setAttribute("class", "button");
         look.innerText = "查看";
        look.style.fontSize = 14+"px";
         look.onclick = function (){
             btn(1);
         };
         return look;
     },"",function(){
        var pay = document.createElement('a');
        pay.setAttribute("class", "button");
        pay.innerText = "充值";
        pay.style.fontSize = 14+"px";
        pay.onclick = function (){
            btn(2);
        };
        return pay;
    }]);
    t.add(arr,true);
/*//账户详情
     var rowNumT = parseInt((getWindowSize().y - 360) / 42);
     var t2 = new Table("countMessageList", 6, 8);
     document.getElementById("countMessageList").tableObject = t2;
     t2.setColWidth(["1%", "5%", "8%", "20%", "9%","22%","20%","10%"]);
     t2.setHead(["", "序号", "预约用户", "变更时间", "变更金额","就诊医院","消费流水号","消费种类"]);*/
}