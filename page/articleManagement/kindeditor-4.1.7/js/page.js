var pic_name='';
window.onload = function(){
      //整个编辑器
      var all = document.getElementsByClassName('ke-toolbar')[0];
      //图片
      var picture_a = document.getElementsByClassName('ke-outline')[14];
      //超链接
      var href_b = document.getElementsByClassName('ke-outline')[15];
      //表情
      var face_c = document.getElementsByClassName('ke-outline')[13];
    //设定文本区域的宽和高
   /* var container = document.getElementsByClassName('ke-container')[0];
    container.style.width=804+'px';
    var widthW =document.getElementsByClassName('ke-edit')[0];
    widthW.style.height = 420+'px';*/
    /*console.log(widthW);
      console.log(container);*/
      picture_a.removeChild(picture_a.firstChild);
      href_b.removeChild(href_b.firstChild);
      face_c.removeChild(face_c.firstChild);
      all.removeChild(all.lastChild);
      all.removeChild(all.lastChild);
      all.removeChild(all.lastChild);
      //新建一个span
      var spanN = document.createElement('span');
      spanN.setAttribute('class', 'image-icon')
      all.append(spanN);
      spanN.onclick = function () {
          closeP(true);
          document.getElementById('picture_address').innerHTML='';
      };
//显示图片
      document.getElementById('picture').addEventListener('change',function(e){
          var files = this.files;
          var img = new Image();
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function(e){
              var mb = (e.total/1024)/1024;
              if(mb>= 2){
                  alert('文件大小大于2M');
                  return;
              }
              img.src = this.result;
              img.style.width = "100%";
              img.style.height= "100%";
              document.getElementById('picture_address').innerHTML = '';
              document.getElementById('picture_address').appendChild(img);
          }
      });
  }
//上传图片
function addPicture() {
    var formData = new FormData($("#addPicture")[0]);
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
            var pictureName = data.msg;
            console.log(data);
            if(pictureName=='提交文件失败'){
                alert('请选择要上传的图片！')
            }else{
                 pic_name = data.msg;
                console.log(pic_name);
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    });
    getPic();
}
//获得服务器图片的名字
function getPic(){
    var iframee = document.getElementsByClassName('ke-edit-iframe')[0].contentWindow.document.getElementsByClassName('ke-content')[0];
    var insert_image = document.createElement('img');
    if(pic_name !=''){
        insert_image.setAttribute('src','http://192.168.0.202:8080/File/filebed/'+pic_name);
        insert_image.style.width = 100+'px';
        insert_image.style.height = 100+'px';
        closeP(false);
        iframee.append(insert_image);
    }else{
        closeP(true);
    }
}
//关闭窗口
function closeP(isAppear){
    var dialog_picture = document.getElementsByClassName('dialog_picture')[0];
    var dk = document.getElementById('dk');
    if(isAppear){
        dk.style.display = 'block';
        dialog_picture.style.display = 'block';
    }else{
        dialog_picture.style.display = 'none';
        dk.style.display = 'none';
    }
}