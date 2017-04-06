//获得检查医院的ID
function getHospitalList(){
    $.ajax({
        url: _serverHome + "manage/HospitalManage_getHospitalList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            parseGetHospitalList(msg);
            parseGetHospitalList1(msg);
            showMatch1()
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//添加检查项目
function addCheck(){
    showMatch();
    var yyid=showMatch()
    var add_check_middle = document.getElementsByClassName('add_check_middle')[0];
    var mc = add_check_middle.getElementsByTagName('input')[2].value;
    var bh = add_check_middle.getElementsByTagName('input')[1].value;
    var jg = add_check_middle.getElementsByTagName('input')[3].value;
    var jcxz = document.getElementById('jcxz').value;
    $.ajax({
        url: _serverHome + "manage/CheckManage_addCheck",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            mc:mc,
            yyid:yyid,
            jg:jg,
            jcxz:jcxz,
            bh:bh
        },
        success: function(res) {
            if(mc==""&&bh==""&&jg==""&&jcxz==""){
                alert('请输入内容哦！')
            }else{
                alert("添加成功！")
            }
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//某医院检查项目列表
function CheckManage_checkList(yyid){
    console.log("你好！"+yyid)
    $.ajax({
        url: _serverHome + "manage/CheckManage_checkList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            yyid:yyid
        },
        success: function(res) {
            var hospitalTableData = JSON.parse(res.msg);
            var t = document.getElementById("content_table").tableObject;
            console.log(t);
            for(var i=0;i<hospitalTableData.length;i++){
                var row = t.add(hospitalTableData[i],true);
                row.id="rowId_"+hospitalTableData[i][0];
                var content_table = document.getElementById('content_table');
                var btn = content_table.getElementsByClassName('button')[i];
                btn.style.fontSize = '12px';
                btn.style.width = '40px';
                btn.style.height = '20px';
                btn.style.lineHeight = "22px";
            }
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}

