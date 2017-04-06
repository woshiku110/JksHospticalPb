var drugOrderId = "";
/*//药品的缺失按钮
function submit(){
    var LoseId = this.id;
    var isLoseN = this.index;
    if(this.index == 0){
        this.index = 1;
        this.style.background = "#ffffff";
        this.innerText  = "缺失";
        this.style.color = "#2872b7";
        var finish = document.getElementById('finish');
        finish.innerText = '提交问题'
    }else if(this.index == 1){
        this.index = 0;
        this.style.background = "#2872b7";
        this.innerText  = "已有";
        this.style.color = "#ffffff";
        var finish = document.getElementById('finish');
        finish.innerText = '提交完成'
    }
    $.ajax({
        url: _serverHome + "yuyue/MedicinalProcess_medicnalStateChange",
        type: 'post',
        dataType:'json',
        async:false,
        data: {
            "token":_token,
            "jlid":LoseId,
            "state":isLoseN
        },
        success: function(res) {
           // console.log(res.msg);
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}*/
//取出订单
function bringOrder(){
    var Sum = [];
    var middle = document.getElementById('middle');
    $.ajax({
        url: _serverHome + "yuyue/MedicinalProcess_getPickList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "username":_token
        },
        success: function(res) {
            console.log(res);
            console.log(res.msg);
            var result = JSON.parse(res.msg);
            if(res.success){
                if(res.msg =="[]"||result[5]=="[]"){
                    middle.style.display = 'none';
                    alert("暂时没有新的订单可取哦！");

                }else {
                    middle.style.display = 'block';
                    console.log(result);
                    drugOrderId = result[0];
                    var drugTableData = JSON.parse(result[5]);
                    parseBringOrder(result);
                    var t = document.getElementById("middle_table_bottom").tableObject;
                    t.clean();
                    for(var i=0;i<drugTableData.length;i++){
                        t.add(drugTableData[i],true);
                    }
                }
            }
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
    return Sum;
}
//暂停分拣
function pauseSorting(){
    var middle = document.getElementById('middle');
    middle.style.display = 'none';
    $.ajax({
        url: _serverHome + "yuyue/MedicinalProcess_pauseSorting",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "orderId":drugOrderId
        },
        success: function(res) {
           console.log("药单已退回");
            alert("药单已退回!")
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//药单分拣完成
function sortingEnd(){
    $.ajax({
        url: _serverHome + "yuyue/MedicinalProcess_sortingEnd",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "orderId":drugOrderId,
            "token":_token
        },
        success: function(res) {
            console.log("提交成功");
            bringOrder();
            alert("提交成功!")
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}

