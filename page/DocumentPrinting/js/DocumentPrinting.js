function selectMessage(){
    var Num = document.getElementsByClassName('second-left')[0];
    var orderNum = Num.getElementsByTagName('input')[0].value;
    console.log(orderNum);
    var tableTitle = document.getElementById('tableTitle');
    if(orderNum==''){
        tableTitle.style.display = 'none';
        alert("请输入单据编号！")
    }else{
        tableTitle.style.display = 'block';
    $.ajax({
        url: _serverHome + "yuyue/PhysicalSupport_getPhysicalById",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            jcdbh: orderNum
        },
        success: function(res) {
         var msg = JSON.parse(res.msg );
            console.log(msg);
            parseSelectMessage(msg);
            var info = JSON.parse(msg[6]);
            var t = document.getElementById("tableContent").tableObject;
            console.log(t);
            t.clean();
            for(var i=0;i<info.length;i++){
                t.add(info[i],true);
            }
            console.log(info);
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
    }
}
function telephone(){
    var tableTitle = document.getElementsByClassName('tableTitle')[0];
    var telephoneNum = tableTitle.getElementsByClassName('orderNumber')[3];
    telephoneNum.style.border = "0px";
}

