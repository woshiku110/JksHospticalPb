//图片上传成功
function ajaxFileUpload() {
    //var name = document.getElementById('doc').value;
    var formData = new FormData($("#uploadForm")[0]);
    console.log(formData);
    var Address = "http://192.168.0.202:8080/File/uploadFile";
    $.ajax({
        url: Address ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
           $("#preview").attr("src", "http://192.168.0.200:8080/File/filebed/"+data.msg);
            pictureName = data.msg;
            console.log(data);
        },
        error: function (returndata) {
            console.log(returndata);
        }
    });
}