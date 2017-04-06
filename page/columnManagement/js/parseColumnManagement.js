//下拉框选项
function selectA(){
    var sid = document.getElementById('sid');
    var sid_value = sid.value;
    var column_picture = document.getElementsByClassName('column_picture')[0];
    if(sid_value=="2"){
        column_picture.style.display ="block";
    }else{
        column_picture.style.display ="none";
    }
}
//添加、保存、取消按钮
function Revise(res,isEdit,data){
    var picturePosition = document.getElementById('picturePosition');
    var title =  document.getElementById('title');
    var sid = document.getElementById('sid').value;
    if(res==1){
        if(isEdit){
            if(title.value != '' && sid !='全部'){
                document.getElementsByClassName('picture')[0].style.backgroundImage="url("+")";
                if(sid==2){
                    ajaxFileUpload();
                    createClassify();
                }else{
                    createClassify();
                }
                dialog(false);
            }else{
                alert('请输入栏目名称或栏目级别！');
            }
        }else{
            updateClassify(data);

        }

    }else if(res==2){
        document.getElementsByClassName('picture')[0].innerHTML="";
        dialog(false);
    }
}

function dialog(isShow){
    var column_picture = document.getElementsByClassName('column_picture')[0];
    var column_editor = document.getElementsByClassName('column_editor')[0];
    var a1=window.parent.document.getElementsByTagName('div');
    var dk = document.getElementById('dk');
    if(isShow){
        aa();
        column_editor.style.display = 'block';
    }else{
        a1[a1.length-1].style.display = 'none';
        column_editor.style.display = 'none';
        dk.style.display = 'none';
    }
}

function addColumn(){
    dialog(true);
    addClick(true);
   var title =  document.getElementById('title');
   title.value = '';
    document.getElementById('sid').options[0].selected = true;
    document.getElementById('picturePosition').style.backgroundImage = '';
}
function addClick(isEdit,data){
    var column = document.getElementById('test_one_time');
    if(isEdit){
        column.onclick = function(){
            Revise(1,true);

        };
    }else{
        column.onclick = function(){
            Revise(1,false,data);
        };
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
//栏目列表
function parseGetAllClassify(msg){
    var arr = [];
    var check = msg[0][1];
    var help = msg[1][1];
    var most = msg[2][1];
    var checkId = msg[0][0];
    var helpId = msg[1][0];
    var mostID = msg[2][0];
    var d="";
    var  a = JSON.parse(msg[0][2]);
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
    var t = document.getElementById("columnListContent").tableObject;
    for(var k=0;k< a.length;k++){
        var row = t.add(a[k],true);
        row.id="rowId_"+a[k][0];
    }
    console.log(a);
    console.log(a[0][0]);
}