window.onload = function(){
    var rowNum = parseInt((getWindowSize().y-360)/42);
    var t = new Table("columnListContent",0,6);
    document.getElementById("columnListContent").tableObject = t;
    t.setColWidth(["2%","33%","15%","20%","8%","12%"]);
    t.setHead(["","栏目名称","一级栏目","日期","","操作"]);
    t.setTemplate(["","[1]","[4]","[2]",function(data){
        var a= document.createElement('a');
        a.index = data[0];
        a.id = data[4];
        a.setAttribute("class","button");
        a.innerText="编辑";
        a.style.fontSize = 14+"px";
        a.onclick =function(){
            aa();
            var column_editor = document.getElementsByClassName('column_editor')[0];
            var title = document.getElementById('title');
            var column_picture = document.getElementsByClassName('column_picture')[0];
            var picturePosition = document.getElementById('picturePosition');
            addClick(false,data[3]);
            if(data[4] =='自查'){
                document.getElementById('sid').options[1].selected = true;
                if($('#sid  option:selected').text()=='自查'){
                    column_picture.style.display = 'block';
                    picturePosition.style.display = 'block';
                    picturePosition.style.backgroundSize = '100%'+'100%';
                    picturePosition.style.backgroundImage = 'url(http://192.168.0.202:8080/File/filebed/'+data[3]+')';
                }
                column_editor.style.display = 'block';
            }else if(data[4]=='帮助中心'){
                document.getElementById('sid').options[3].selected = true;
                column_picture.style.display = 'none';
            }else if(data[4]=='更多'){
                document.getElementById('sid').options[2].selected = true;
                column_picture.style.display = 'none';
            }
            title.value = data[1];
            column_editor.style.display = 'block';
        }
        return a;
    },function(data){
        var b= document.createElement('a');
        b.index = data[0];
        b.id = data[5];
        b.setAttribute("class","button");
        b.innerText="删除";
        b.style.fontSize = 14+"px";
        b.onclick =function(){
            t.remove("rowId_"+data[0]);
            //删除栏目
            deleteClassify(data[0]);
        }
        return b;
    }]);

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
            document.getElementsByClassName('picture')[0].innerHTML = '';
            document.getElementsByClassName('picture')[0].appendChild(img);
        }
    });
    getAllClassify();
    function uploadFile(id){

    }
};


