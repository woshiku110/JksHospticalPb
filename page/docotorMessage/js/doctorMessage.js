window.onload = function(){
    var before = getParam('id');
    var id = before.substr(0,before.length-0);
    getDoctorInfo(id);
};
//检索医生列表
function getDoctorInfo(id){
    $.ajax({
        url: _serverHome + "manage/DoctorManage_getDoctorInfo",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            id:id
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            parseGetDoctorInfo(msg)
            console.log(msg );
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//解析
function parseGetDoctorInfo(msg){
    var name = document.getElementById('name');
    name.innerText = msg[0];
    var title = document.getElementById('title');
    title.innerText = msg[4];
    var hospital = document.getElementById('hospital');
    hospital.innerText = msg[2];
    var adept = document.getElementById('adept');
    adept.innerText = msg[5];
    var doctor_profiles = document.getElementById('doctor_profiles');
    doctor_profiles.innerText = msg[10];
    var department = document.getElementById('department');
    department.innerText = msg[1];
    var appointemented = JSON.parse(msg[20]);
    for(var i=0;i<appointemented.length;i++){
        var aaa = appointemented[i][0];
        var yue = aaa.substr(5,6);
        var yuee = yue.substr(0,2);
        var yueee = yue.substr(3,4);
        var yuet = yuee+'/'+yueee;
    }
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    if(month<10){
        month = '0'+month;
    }
    var day = date.getDay();
    var time = document.getElementById('time');
    console.log(appointemented)
    var code ='';
    code+='\<table id="scheduleTime">';
    code+='\<tr>';
    for(var i=0;i<=6;i++){
        code += '\<td>';
        code += month+'/'+((day*1)+i);
        code+= '\</td>';
    }
    code +='\</tr>';
    code +='\<tr>';
    for(var i=0;i<=6;i++){
        code +='\<td>';
        code +='\</td>';
    }
    code +='\ </tr>';
    code +='\</table>';
    time.innerHTML = code;
    for(var i=0;i<=6;i++){
        if(yuet ==((day*1)+i)){
            document.getElementById("scheduleTime").rows[1].cells[i].innerText = '可预约';
            document.getElementById("scheduleTime").rows[1].cells[0].style.color = '#2872b7'
        }
    }
}
