//添加、关闭、保存编辑文章窗口
function Article(res,isCreate,data){
    var file=document.getElementById('file');
    if(res==1){
        if(isCreate){
            dialog(true);
            empty();
            createArticle();
            ajaxFileUpload();
            saveFile();
            document.getElementById('hint').value =  file.value;
        }else{
            updateArticle(data);
            dialog(false);
        }
    }else{
        empty();
        file.value = "";
        dialog(false);

    }
}
//内容为空
function empty(){
    var title = document.getElementById('title');
    var author = document.getElementById('author');
    var abstract = document.getElementById('abstract');
    var hint = document.getElementById('hint');
    var pictureB = document.getElementById('pictureB').getElementsByTagName('img')[0]
    title.value ="";
    author.value = "";
    abstract.value = "";
    hint.value = "";
 //   pictureB.src = "";

}
function addArticle(){
    dialog(true);
    addClick(true);
    document.getElementById('sid').options[0].selected = true;
}
function addClick(isOne,data){
    var save = document.getElementById('save');
    if(isOne){
        save.onclick =function(){
            Article(1,true);
        }
    }else{
        save.onclick =function(){
            Article(1,false,data);
        }
    }
}
//背景阴影显示
function dialog(isShow){
    var editor = document.getElementsByClassName('editor')[0];
    var a1=window.parent.document.getElementsByTagName('div');
    var dk = document.getElementById('dk');
    if(isShow){
        aa();
        editor.style.display = 'block';
    }else{
        a1[a1.length-1].style.display = 'none';
        editor.style.display = 'none';
        dk.style.display = 'none';
    }
}
//虚幻背景
function aa(){
    var a1=window.parent.document.getElementsByTagName('body')[0];
    var bk = document.createElement('div');
    bk.style.background = "#bbbbbb";
    bk.style.opacity = 0.3;
    bk.style.position = "absolute";
    bk.style.width='99%';
    bk.style.height=' 99%';
    bk.style.zIndex='1';
    bk.style.display = 'block';
    a1.appendChild(bk) ;
    var info=window.parent.document.getElementById('content');
    info.style.position = "absolute";
    info.style.zIndex = "2";
    var dk = document.getElementById('dk');
    dk.style.display = 'block';
    var header=window.parent.document.getElementById('header');
    header.style.position = 'absolute';
    header.style.zIndex = '1';
}
// 解析编辑文章下的栏目分类
function parseGetSecondColumn(msg){
    console.log(msg);
    var sid = document.getElementById('sid');
    for(var i=0;i<msg.length;i++){
        var list = document.createElement('option');
        list.setAttribute('id',msg[i][0]);
        list.innerText = msg[i][1];
        sid.append(list);

    }
}
