function getArticleInfo(t_id){
    $.ajax({
        url: "http://192.168.0.202:8080/jfs1.1/manage/ArticleManage_getArticleInfo",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            "id":t_id
        },
        success: function(res) {
            var msg = JSON.parse(res.msg) ;
            console.log(msg);
            parseGetArticleInfo(msg);
        },
        error:function(res){
            // alert("分配失败！")
            console.log("test"+"fail"+res);
        }
    });
}
function parseGetArticleInfo(msg){
    var title = document.getElementById('title');
    title.innerText = msg[1];
    var content = document.getElementsByClassName('content')[0];
    var text_c = msg[4]
    content.innerHTML =text_c ;
}
window.onload = function(){
    var t_id = getParam('pid');
    getArticleInfo(t_id);
}