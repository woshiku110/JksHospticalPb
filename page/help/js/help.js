function getSecondColumn(){
    $.ajax({
        url: "http://192.168.0.202:8080/jfs1.1/manage/ArticleManage_getSecondColumn",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "pid":4
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
function parseGetSecondColumn(msg){
    var code = '';
    var content = document.getElementsByClassName('content')[0];
    for(var i=0;i<msg.length;i++){
        code += '\<div class="contentList"';
        code += 'onclick= window.location.href="helpArticleTitle.html'+'?pid='+msg[i][0]+'"' ;
        code += '>' ;
        code += '\<a class="font">';
        code += msg[i][1];
        code += '\</a>';
        code += '\<a class="img"></a>';
        code += '\</div>';
    }
    content.innerHTML = code;
}
window.onload = function(){
    getSecondColumn();
}