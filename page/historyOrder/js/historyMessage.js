//获取订单详情
function waitDetails(id,status){
    $.ajax({
        url: _serverHome + "yuyue/PatientPersonalCenter_waitDetails",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            id:id
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            console.log(msg );
            parsewaitDetails(msg,status);
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//基础信息
function message(msg){
    var name = document.getElementById('name');
    name.innerText = msg[0];
    var sex = document.getElementById('sex');
    sex.innerText = msg[1];
    var symptom = document.getElementById('symptom');
    symptom.innerText = msg[2];
    var patient = document.getElementsByClassName('patient')[0];
    patient.innerText = msg[9];
    var picture = JSON.parse(msg[10]);
    var selfPicture = document.getElementsByClassName('img')[0];
    for(var i=0;i<picture.length;i++){
        var img = document.createElement('img');
        img.src='http://192.168.0.202:8080/File/filebed/'+picture[i];
        selfPicture.append(img);
    }
}
//
function bespokeMessage(msg){
    var bespoke = document.getElementById('bespoke');
    var code='';
    code += '\<div class="base">';
    code += '\<div class="border">';
    code += '\<div class="tab"></div>';
    code += '\<a class="h1">预约信息</a>';
    code += '\ </div>';
    code += '\ <div class="appointment">';
    code += '\<a>就诊医院 : </a>';
    code += '\<a>';
    code +=msg[3];
    code +='\</a>';
    code +='\<br>';
    code += '\ <a>就诊时间 : </a>';
    code +='\<a>';
    code +=msg[4];
    code +='\</a><br>';
    code += '\<a>接诊医生 : </a>';
    code +='\<a>';
    code +=msg[5];
    code +='\</a><br>';
    code += '\ <a>接诊地点 : </a>';
    code +='\<a>';
    code +=msg[6];
    code +='\</a><br>';
    code += '\ <a>候诊地点 : </a>';
    code +='\<a>';
    code +=msg[7];
    code +='\</a><br>';
    code += '\<a>医院地址 : </a>';
    code +='\<a>';
    code +=msg[8];
    code +='</a>';
    code += '\</div>';
    code += '\</div>';
    bespoke.innerHTML = code;

}
//解析订单详情
function parsewaitDetails(msg,status){
    var closeReason = document.getElementsByClassName('closeReason')[0];
    var base = document.getElementById('closeReason');
    if(status==01){
        message(msg);
        closeReason.innerText = '患者退单';
    }else if(status==02){
        message(msg);
        closeReason.innerText = '订单有问题';
    }else if(status==03){
        message(msg)
        bespokeMessage(msg);
        closeReason.innerText = '医生退单';
    }else if(status==04){
        message(msg)
        bespokeMessage(msg);
        closeReason.innerText = '患者爽约';
    }else{
        message(msg);
        bespokeMessage(msg);
        base.style.display = 'none'
    }
}

//图片点击
function aa(){
    var bk = document.getElementById('bk');
    console.log(bk);
    bk.style.display = 'block';
    var img = document.getElementsByClassName('img')[0];
    var picture = img.getElementsByTagName('div')[0];
    console.log(picture);
    picture.style.position = 'fixed';
    picture.style.width = "100%";
    picture.style.height = 300+'px';
    picture.style.top = 100+"px";
    picture.style.zIndex = "100000";
    picture.style.backgroundSize="200% 100%";

}


window.onload=function(){
    var id = getParam('id');
    var status  = getParam('status');
    waitDetails(id,status)
}
