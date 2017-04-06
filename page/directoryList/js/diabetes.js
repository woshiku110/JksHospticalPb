function getArticleList(t_id){
    $.ajax({
        url: "http://192.168.0.202:8080/jfs1.1/manage/ArticleManage_getArticleList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "pid":t_id
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            console.log(msg);
            parseGetArticleList(msg);
        },
        error:function(res){
            alert("分配失败！")
            console.log("test"+"fail"+res);
        }
    });
}
function parseGetArticleList(msg){
    var code = '';
    var container = document.getElementsByClassName('container')[0];
    for(var i=0;i<msg.length;i++){
        code += '\<div class="contentList"';
        code += 'onclick= window.location.href="articleContent.html'+'?pid='+msg[i][0]+'"';
        code += '>';
        code += '<img src=';
        code += 'http://192.168.0.202:8080/File/filebed/'+msg[i][4];
        code += '>';
        code += '\<div class="font">';
        code += '\<a class="title">';
        code += msg[i][1];
        code += '</a>';
        code += '\<a class="time">';
        code += msg[i][6];
        code += '\</a>';
        code += '\</div>';
        code += '\<div class="right"></div>';
        code += '\</div>';
    }
    container.innerHTML = code;
}
window.onload = function (){
    var t_id = getParam('pid');
    getArticleList(t_id)
}