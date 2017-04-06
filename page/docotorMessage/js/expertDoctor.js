//检索医生列表
function searchDoctor(){
    $.ajax({
        url: _serverHome + "manage/DoctorManage_searchDoctor",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            id:1,
            name:'王'
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            parseSearchDoctor(msg)
            console.log(msg );
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//解析
function parseSearchDoctor(msg){
    var icon ='';
    var list_title = document.getElementsByClassName('list_title')[0];
    icon +='\<div id="title"';
    icon +='onclick= window.location.href="doctorList.html'+'?id='+1+'&name='+'王'+'"';
    icon +='>';
    icon +='\ <div class="tab"></div>';
    icon +='\<a class="h1">西医专家</a>';
    icon +='\ <span>更多</span>';
    icon +='\<img src=img/btn_more_s.png>'
    icon +='\ </div>';
    list_title.innerHTML = icon;

    var code = '';
    var list = document.getElementsByClassName('doctor_list')[0];
    console.log(list);
    for(var i=0;i<3;i++){
        code +='\<div class="doctor">';
        code +='<img src=';
        code +='\img/qq.jpg ';
        code +='onclick= window.location.href="doctorMessage.html'+'?id='+msg[i][0]+'"'
        code +='>'
        code +='\<h1>';
        code +=msg[i][1];
        code +='\</h1>';
        code +='\<h2>';
        code +=msg[i][4];
        code +='\</h2>';
        code +='\<h3>';
        code +=msg[i][3];
        code +='\</h3>';
        code +='\</div>';
        code +='\</div>'
    }
    list.innerHTML=code;
}
window.onload = function(){
    searchDoctor();
}