window.onload = function(){
    var aa= getParam('id');
    var name = getParam('name');
    searchDoctor();
}
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
            //console.log(msg );
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}

//解析检索医生列表
function parseSearchDoctor(msg){
    var container = document.getElementsByClassName('container')[0];
    //console.log(container);
    var code='';
    for(var i=0;i<msg.length;i++){
        code +='<div class=';
        code +='doctorList ';
        code +='onclick= window.location.href="doctorMessage.html'+'?id='+msg[i][0]+'"';
        code +='>';
        code +='\<img src="img/qq.jpg">';
        code += '\ <div class="message">';
        code += '\<h2>';
        code += msg[i][1];
        code += '\</h2>';
        code += '\<a>';
        code += '['+msg[i][4]+']';
        code += '\</a>';
        code += '\<br>';
        code += '\<h3>';
        code += msg[i][3];
        code += '\</h3>';
        code += '\<br>';
        code += '\<h4>';
        code += '擅长:';
        code += '\</h4>';
        code += '\<span>';
        code += msg[i][2];
        code += '\</span>';
        code += '\</div>';
        code += '\</div>';
    }
    container.innerHTML=code;
}