window.onload = function(){
    var rowNum = parseInt((getWindowSize().y-360)/42);
    var t = new Table("content_table",rowNum,5);
    document.getElementById("content_table").tableObject = t;
    t.setColWidth(["1%","35%","35%","14%","15%"]);
    t.setHead(["","项目编号","检查名称","价格","操作"]);
    t.setTemplate(["","[1]","[2]","[3]",function(data){
        var a= document.createElement('a');
        a.index = data[5];
        if( a.index==1){
            a.setAttribute("class","button");
            a.innerText="删除";
            a.onclick = function(){
                t.remove("rowId_"+data[0]);
            }
        }
        return a;
    }]);
    //所属医院列表
    var ssyy = document.getElementById('ssyy');
    ssyy.onclick=function(){
        getHospitalList();
    }
    changeDropDownInput("ssyy");
//检查项列表
    var hospital_head = document.getElementById('hospital_head');
    changeDropDownInput("hospital_head");
    //正则表达式价格的判断
    var add_check_middle = document.getElementsByClassName('add_check_middle')[0];
    var price = add_check_middle.getElementsByTagName('input')[3];
    price.onblur = function(){
        var priceValue = price.value;
        var res =/^\d+(\.\d+)?$/.test(priceValue);
        if(res){
            priceValue=priceValue;
        }else{
            alert('请输入数字哦！');
            price.value="";
        }
    }
}