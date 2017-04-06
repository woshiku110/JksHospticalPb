function getSecondColumn(){
    $.ajax({
        url: "http://192.168.0.202:8080/jfs1.1/manage/ArticleManage_getSecondColumn",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "pid":2
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            console.log(msg);
            parseGetSecondColumn(msg);
        },
        error:function(res){
            alert("分配失败！")
            console.log("test"+"fail"+res);
        }
    });
}
function  parseGetSecondColumn(msg){
    var code = '';
    var container = document.getElementsByClassName('container')[0];
    for(var i=0;i<msg.length;i++){
        /* <div class="content">
         <img >
         <a>糖尿病</a>
         </div>*/
        code += '\<div class="content"';
        code +='onclick= window.location.href="diabetes.html'+'?pid='+msg[i][0]+'"';
        code +='>';
        code += '\<img src=';
        code += 'http://192.168.0.202:8080/File/filebed/'+msg[i][2];
        code += '>';
        code += '\<a>';
        code += msg[i][1];
        code +='\</a>';
        code +='\</div>';
    }
    container.innerHTML = code;
}
window.onload = function(){
    getSecondColumn();
}