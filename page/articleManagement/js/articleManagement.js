var pictureName="";
var fileName="";
//栏目列表
function getAllClassify(){
    $.ajax({
        url: _serverHome + "manage/ArticleManage_getAllClassify",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            // console.log(msg);
            parseGetAllClassify(msg);
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//栏目列表
function parseGetAllClassify(msg){
    var titleHead = document.getElementById('titleHead').value;
    var check = msg[0][1];
    var help = msg[1][1];
    var most = msg[2][1];
    var checkId = msg[0][0];
    var helpId = msg[1][0];
    var mostID = msg[2][0];
    var d="";
     var a = JSON.parse(msg[0][2]);
    var b = JSON.parse(msg[1][2]);
    var c = JSON.parse(msg[2][2]);
    if( a.length!= 0){
        for(var i=0;i< a.length;i++){
            a[i].push(check,checkId);
        }
    }
    if( b.length!= 0){
        for(var j=0;j< b.length;j++){
            b[j].push(help,helpId);
        }
    }
    if(c.length!= 0){
        for(var k=0;k< c.length;k++){
            c[k].push(most,mostID);
        }
    }
    for(var n=0; n<b.length;n++){
        a.push( b[n]);
    }
    for(var m=0; m<c.length;m++){
        a.push( c[m]);
    }
}
// 获得文章列表
function getArticleList(){
    $.ajax({
        url: _serverHome + "manage/ArticleManage_getArticleList",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            title:''
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
           // console.log(msg);
            var t = document.getElementById("middle").tableObject;
            for(var i=0;i<msg.length;i++){
                var row = t.add(msg[i],true);
                row.id="rowId_"+msg[i][0];
            }
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//删除文章
function deleteArticle(data){
    $.ajax({
        url: _serverHome + "manage/ArticleManage_deleteArticle",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            id:data
        },
        success: function(res) {
            alert('删除成功！')
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//提交图片
function ajaxFileUpload() {
    var formData = new FormData($("#uploadForm")[0]);
    var Address = "http://192.168.0.202:8080/File/uploadFile"
    $.ajax({
        url: Address ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data );
             pictureName = data.msg;
            if(pictureName=='提交文件失败'){
                alert('提交图片失败！')
            }else{
                alert('提交成功！')
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    });
}
//提交文件
function saveFile() {
    var formData = new FormData($("#fileSave")[0]);
    var Address = "http://192.168.0.202:8080/File/uploadFile"
    $.ajax({
        url: Address ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data );
             fileName = data.msg;
            if(fileName=='提交文件失败'){
                alert('提交文件失败！')
            }else{
                alert('提交文件成功！')
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    });
}
//保存文章
function createArticle(){
    var title = document.getElementById('title').value;
    var abstract = document.getElementById('abstract').value;
    var articleContent =  document.getElementById('message').contentWindow.document.getElementsByClassName('ke-edit-iframe')[0].contentWindow.document.getElementsByClassName('ke-content')[0].innerHTML;
    var pid = $("#sid option:selected").attr("id");
    $.ajax({
        url: _serverHome + "manage/ArticleManage_createArticle",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            title:title,
            pid:pid,
            body:articleContent,
            cover:pictureName,
            accessory:fileName,
            abstracts:abstract,
            token:_token
        },
        success: function(res) {
            console.log(res);
            alert('hjkmhvjb保存成功！')
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//更改文章内容
function updateArticle(data){
    var pid = $("#sid option:selected").attr("id");
    var author = document.getElementById('author').value;
    var title = document.getElementById('title').value;
    var abstract = document.getElementById('abstract').value;
    var articleContent =  document.getElementById('message').contentWindow.document.getElementsByClassName('ke-edit-iframe')[0].contentWindow.document.getElementsByClassName('ke-content')[0].innerHTML;
    $.ajax({
        url: _serverHome + "manage/ArticleManage_updateArticle",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            title:title,
            author:author,
            pid:pid,
            body:articleContent,
            cover:pictureName,
            accessory:fileName,
            abstracts:abstract,
            token:_token,
            id:data[0]
        },
        success: function(res) {
            if(res.msg =='更新失败'){
                alert('编辑失败！')
            }else{
                alert('编辑成功！')
            }
            console.log(res);
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//获取文件名
function getFile(file){
     var file = document.getElementById('file').value;
     var hint = document.getElementById('hint');
     hint.value = file;
 }
//文章置顶
function topArticle(data){
    $.ajax({
        url: _serverHome + "manage/ArticleManage_topArticle",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            id:data
        },
        success: function(res) {
            console.log(res);
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//获得编辑文章下的栏目分类
function getSecondColumn(msg){
    $.ajax({
        url: _serverHome + "manage/ArticleManage_getSecondColumn",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
        },
        success: function(res) {
            var msg = JSON.parse(res.msg);
            parseGetSecondColumn(msg)
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}

