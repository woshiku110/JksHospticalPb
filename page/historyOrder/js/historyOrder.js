//历史订单
function waitList(){
    $.ajax({
        url: _serverHome + "yuyue/PatientPersonalCenter_waitList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            token:'HaVIAJrATnV1mM5ICMUa5M.tbJmkx4egEo9JjXnV8Diq2phNiREMCQ__',
            state:'7'
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            console.log(msg );
            parseWaitList(msg)
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//解析历史订单
function parseWaitList(msg){
    var list = document.getElementById('list');
    var code ='';
    for(var i=0;i<msg.length;i++){
        code +='\<div class="base">';
        code +='\<div class="border">';
        code +='\<div class="tab">';
        code +='\</div>';
        code +=' \<a class="h1">';
        code +=msg[i][9];
        code +='\</a>';
        code +='\<span>';
        if(msg[i][6]=='7'||msg[i][6]=='8'){
            code +='交易成功';
        }else{
            code +='交易关闭';
        }
        code +='\</span>';
        code +='\</div>';
        code +='\<div class="appointment">';
        code +='\<div class="message "';
        code +='onclick= window.location.href="historyMessage.html'+'?id='+msg[i][8]+'&status='+msg[i][6]+'"';
        code +='>'
        code +='<img class="picture" src=';
        code +='http://192.168.0.202:8080/File/filebed/'+msg[i][2];
        code +='>';
        code +='\<a>姓名:</a>';
        code +='\<span>';
        code +=msg[i][1];
        code +='\</span>';
        code +='\<a>性别:</a>';
        code +='\<span>';
        code +=msg[i][3];
        code +='\</span>';
        code +='\<br>';
        code +='\<a>症状:</a>';
        code +='\<span>';
        code +=msg[i][10];
        code +='\</span>';
        code +='\<br>';
        code +='\<a>就诊医生:</a>';
        code +='\<span>';
        code +=msg[i][5];
        code +='\</span>';
        code +='\<img class="icon" src="img/btn_more.png">';
        code +='\</div>';
        /* <a class='visit_time'>2016年12月12日  下午4:30分</a>
         <a class="delete_order">删除订单</a>
         <a class='assess'>评价</a>*/
        code +='\<div class="time">';
        code +='\<a class="visit_time">';
        code +=msg[i][7];
        code +='\</a>';
        code +='\<a class="delete_order">删除订单</a>'
        code +='\<a class="assess">评价</a>';
        code +='\ </div>';
        code +='\ </div>';
        code +='\ </div>';
    }
    list.innerHTML = code;
}
//按钮
function btn(thisa){
    var total = document.getElementById('total');
    var unTotal = document.getElementById('unTotal');
    if(thisa==1){
        total.style.borderBottom = '';
        total.style.color = '';
        unTotal.style.borderBottom = '1px solid #2872b7';
        unTotal.style.color = ' #2872b7';
    }else{
        total.style.borderBottom = '1px solid #2872b7';
        total.style.color = '#2872b7';
        unTotal.style.borderBottom = '';
        unTotal.style.color = ' ';
    }
}
window.onload = function(){
    waitList();
}