//取出订单
var orderId;
function baseMessage(){
    $.ajax({
        url: _serverHome + "yuyue/AppointmentProcess_outOfQueue.action",
        type: 'post',
        dataType:'json',
        async:false,
        data: {
            "username":_token
        },
        success: function(res) {
            var result = res;
            var newMessage = JSON.parse(result.msg);
             orderId = newMessage.id
            if(newMessage==null||newMessage==undefined){
                alert("已经没有要处理的订单")
            }else{
                parsePatientTriage(newMessage);
            }
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}



//医生分配
function doctorAssign(){
    var doctorName = document.getElementById('input_1').value;
    var department = document.getElementById('department').value;
    var ill = document.getElementById('ill').value;
    $.ajax({
        url: _serverHome + "yuyue/AppointmentSupport_getMatchDocterList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "id":orderId,
            "mc":doctorName,
            "ks":department,
            "sc":ill
        },
        success: function(res) {
            if(doctorName==null||department==null||ill==null){
                alert("请输入搜索范围哦！");
            }else if(res.msg=='[]'){
                alert("没有合适的医生进行匹配！")
            }else{
                console.log(res)
                var msg = JSON.parse(res.msg);
                parseDoctorAssign(msg);
            }
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}



//给医生分配任务
function distribute(doctorId,changeDoctorTime){
    var time = changeDoctorTime+"";
    var year = time.substr(0,4);
    var month = time.substr(4,2);
    var day =time.substr(6,8);
    var date = year+"-"+month+"-"+day;
    $.ajax({
        url: _serverHome + "yuyue/AppointmentProcess_distribute",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "orderId":orderId,
            "token ":_token,
            "doctorId":doctorId,
            "appoDate":date
        },
        success: function(res) {
            console.log(res)
            alert("分配成功！");
            baseMessage();
        },
        error:function(res){
            alert("分配失败！")
            console.log("test"+"fail"+res);
        }
    });
}



//暂停分诊
function backToQueue(){
    if(orderId == ""||orderId == null){
        alert("请先取出订单")
    }else{
        $.ajax({
            url: _serverHome + "yuyue/AppointmentProcess_backToQueue",
            type: 'post',
            dataType:'json',
            async:true,
            data: {
                "token":_token,
                "orderId":orderId
            },
            success: function(res) {
                console.log("订单已退回！")
            },
            error:function(res){
                console.log("test"+"fail"+res);
            }
        });
    }
}
//无法分诊
function rejectTriage(){
    $.ajax({
        url: _serverHome + "yuyue/AppointmentProcess_rejectTriage",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "token":_token,
            "orderId":orderId
        },
        success: function(res) {
            console.log("订单已退回！")
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}