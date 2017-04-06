var pic = '';
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
//添加栏目
function createClassify(){
    var title = document.getElementById('title').value;
    var sid1 = document.getElementById('sid');
    var sid = sid1.value;
    console.log(sid);
    $.ajax({
        url: _serverHome + "manage/ArticleManage_createClassify",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            title:title,
            pid:sid,
            token :_token,
            pic :pic
        },
        success: function(res) {
            alert('提交成功！')
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
}
//上传图片
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
           var pictureName = data.msg;
            if(pictureName=='提交文件失败'){
                alert('提交图片失败！')
            }else{
                alert('提交图片成功！')
                pic = data.msg;
             //   console.log(pic );
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    });
}
//编辑栏目
function updateClassify(data){
    var title = document.getElementById('title').value;
    var sid = document.getElementById('sid').value;
    $.ajax({
        url: _serverHome + "manage/ArticleManage_updateClassify",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            title:title,
            pid:sid,
            token :_token,
            pic :data
        },
        success: function(res) {
            console.log(res);
            dialog(false);
            alert('编辑成功！')
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
    var column = document.getElementById('test_one_time');
}
//删除栏目
function deleteClassify(deleteD){
    var title = document.getElementById('title').value;
    var sid = document.getElementById('sid').value;
    $.ajax({
        url: _serverHome + "manage/ArticleManage_deleteClassify",
        type: 'post',
        dataType:'json',
        async:true,
        data: {
            id:deleteD,
            token :_token
        },
        success: function(res) {
            alert('已删除！')
        },
        error:function(res){
            console.log("test"+"fail"+res);
        }
    });
};
