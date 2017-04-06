//健康信息 'CF40ma6ijfOSSWNBOa6rZvzP1YmUr41zMcbuIYnaSVcdRT/Lmto0lw__'
function listMyFamily(token){
    $.ajax({
        url: _serverHome + "yuyue/PatientPersonalCenter_listMyFamily",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            token:_healthMessage_token
        },
        success: function(res) {
             msg = JSON.parse(res.msg);
            parseListMyFamily(msg);
            console.log(msg );
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
function parseListMyFamily(msg){
    var code ='';
    var container = document.getElementsByClassName('container')[0];
    for(var i=0;i<msg.length;i++){
       var msgTime=msg[i][4];
       var msgTimeY=msgTime.substring(0,4);
       var pcDate=new Date;
       var pcNowYear =pcDate.getFullYear();
       var age =pcNowYear - parseInt(msgTimeY);
            code += '\<div class="message" ';
            code += 'onclick= window.location.href="healthMessage.html'+'?pid='+msg[i][0]+'"';
            code += '>';
            code += ' <img class=';
            code += 'image';
            code +=' src=';
            code +='http://192.168.0.202:8080/File/filebed/'+msg[i][1]
            code += '>';
            code += '<div class=';
            code += 'right';
            code += '>';
            code += ' <a class';
            code += 'name';
            code += '>';
            code += msg[i][2];
            code += '\</a>';
        if(msg[i][3]=='男'){
            code += '<div class=icon style="background:#3d96e2"';
            code += '>';
            code += '\<a>';
            code += age;
            code += '<img src=';
            code += 'img/ico_man.png';
            code += '>';
            }else{
            code += '<div class=icon style="background:#fc8370"';
            code += '>';
            code += '\<a>';
            code += age;
            code += '<img src=';
            code += 'img/ico_woman.png';
            code += '>';
            }
            code += '\</div>';
            code += ' \<p>既往病史:</p>';
            code += '\<span>';
            code +=  msg[i][2];
            code += '\</span>';
            code += '\<img class="more" src="img/btn_more.png">';
            code += '\</div>';
            code += '\</div>';
    }
    container.innerHTML = code;
}


window.onload = function(){
    getParam('healthMessage_token');
    var before = getParam('token');
    _healthMessage_token = before.substr(0,before.length-0);
}

