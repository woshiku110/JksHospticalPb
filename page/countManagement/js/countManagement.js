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
function dialog(isShow){
    var countMessage = document.getElementsByClassName('countMessage')[0];
    var a1=window.parent.document.getElementsByTagName('div');
    var dk = document.getElementById('dk');
    var pay =document.getElementsByClassName('pay')[0];
    if(isShow){
        aa();
        countMessage.style.display = 'block';
    }else{
        a1[a1.length-1].style.display = 'none';
        countMessage.style.display = 'none';
        dk.style.display = 'none';
        pay.style.display = 'none';
    }
}
//查看、取消
function btn(res){
    var pay =document.getElementsByClassName('pay')[0];
    if(res==1){
        dialog(true);
    }else if(res==2){
        aa();
        pay.style.display = 'block';
    }else{
        dialog(false)
    }
}