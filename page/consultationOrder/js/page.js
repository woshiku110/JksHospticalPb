//滑轮
(function($){
    $(window).load(function(){
        $(".consultation_message1").mCustomScrollbar();
    });
})(jQuery);

window.onload = function(){
    var rowNum = parseInt((getWindowSize().y - 360) / 42);
    var t = new Table("consultationList", rowNum, 8);
    document.getElementById("consultationList").tableObject = t;
    var arr=['1333',"王梁安", "田建市一种新","25416351","周明",'1326859', "查看"]
    t.setColWidth(["1%", "25%", "15%", "15%", "9%", "10%", "10%","15%"]);
    t.setHead(["", "会诊单号", "主治医生", "所在医院", "医生电话", "患者姓名", "患者电话","操作"]);
    t.setTemplate(["", "[0]", "[1]", "[2]","[3]","[4]","[5]",function(){
        var a = document.createElement('a');
        a.setAttribute("class", "button");
        a.innerText = "查看";
        a.style.fontSize = 14+'px';
        a.onclick = function(){
            btn(1);
        }
        return a;

    }]);
    t.add(arr,true);
}