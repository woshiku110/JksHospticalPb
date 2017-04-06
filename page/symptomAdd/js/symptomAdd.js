//浏览图片
window.onload = function(){
   // console.log( document.getElementById('file'))
    document.getElementById('file').addEventListener('change',function(e){
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
            document.getElementById('preview').style.width="78px";
            document.getElementById('preview').style.height="78px";
            document.getElementById('preview').innerHTML = '';
            document.getElementById('preview').appendChild(img);
        }
    });
}
//添加部位
function add(msg){
    var middle = document.getElementsByClassName('middle')[0];
    $(middle).slideDown (300);
}
//添加选项框
function addOneOption(i){
    var last = document.getElementById("last"+i);
    if(last.value==null||last.value==""){
        return;
    }else{

    var number = last.number || 68;
    if(number==68){
       var br = document.createElement("br");
       $(document.getElementById("br"+i)).append(br);
    }

    if(number>73)
        return;
    last.removeAttribute("id");
    //last.onfocus= function(){};
    var span = document.createElement('span');
    var a = document.createElement('a');
    a.innerHTML = String.fromCharCode(number+1)+":";
    var input = document.createElement('input');
    input.id="last"+i;
    input.onblur = function(){
        addOneOption(i);
    };
    input.number = number+1;
    span.appendChild(a);
    span.appendChild(input);
    document.getElementById("input"+i).appendChild(span);
    var down_content_question_down = document.getElementsByClassName('down_content_question_down')[i];
    var fourthA = down_content_question_down.getElementsByTagName('a')[4];
    fourthA.style.marginLeft = '94px';
    }
}

