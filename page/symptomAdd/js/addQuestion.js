/*var i = 0;
function addQuestion(){
    var down_content = document.getElementsByClassName('down_content')[0];
    var code="";
    code +="\<div class='down_content_question'>";
    code +="\<div class='down_content_question_up'>";
    code +="\<div class='down_content_question_up_img'>";
    code +="\</div>";
    code +="\<div style='float:right;margin-top: 10px;margin-right: 45%'>";
    code +="\<a>";
    code +="问题类型：";
    code +="\</a>";
    code +="<select class='dOm' style='width: 100px;height:30px;'";
    code +=">";
    code +="\<option>";
    code +="单选";
    code +="\</option>";
    code +="\<option>";
    code +="多选";
    code +="\</option>";
    code +="\</select>&nbsp&nbsp&nbsp";
    code +="\<a>";
    code +="题干：";
    code +="\</a>";
    code +="<input type='text' ";
    code +="style='width:272px;height:30px;'";
    code +=">"
    code +="\</div>";
    code +="\</div>";
    code +="<div class='down_content_question_down'";
    code +=">";
    code +="<div id='input"+i+"' style='width:97%;float:left;' ";
    code +=">";
    code +="<span style='margin-left: 32px;'";
    code +=">";
    code +="答案";
    code +="\</span>";
    code +="\<span>";
    code +="\<a>";
    code +="A: ";
    code +="\</a>";
    code +="\<input type='text' >";
    code +="\</span>";
    code +="\<span>";
    code +="\<a>B: </a>";
    code +="\<input type='text'>";
    code +="\</span>";
    code +="\<span>";
    code +="\<a>C: </a>";
    code +="\<input type='text'>";
    code +="\</span>";
    code +="\<span id='br"+i+"'>";
    code +="\<a>D: </a>";
    code +="\<input id ='last"+i+"' type='text' onblur='addOneOption("+i+")'>";
    //code +="\<input id ='last"+i+"' type='text' onblur='alert(123)'>";
    code +=" \</span>";
    code +=" \</div>";
    code +=" \</div>";
    code +="\</div>";
    $( down_content).append(code);
    i++;
}*/
function addQos(){
    var down_content_parent = document.getElementById('down_content_id');
    /*var child = document.createElement('down_content_child');*/
    var child = document.createElement('div');
    var msg = "";
    msg += "\<div class = add_qos_item>";
        msg += "\<div style = display:flex;align-items:center;margin-top:10px >";
            msg += "\<div class = down_content_question_up_img onclick=deleQos(this) ></div>";
            msg += "\<a style = margin-left:5px >问题类型</a>";
            msg += "\<select class=symbol_input style= width:70px;height:30px;margin-left:10px >";
                msg += "\<option>单选</option>";
                msg += "\<option>多选</option>";
            msg += "\</select>";
            msg += "\<a style=margin-left:10px >题干：</a>";
            msg += "\<input class=symbol_input style=width:200px;margin-left:10px; type=text; placeholder='输入问题';  />";
        msg += "\</div>";
        msg += "\<div style=display:flex;width:1000px;flex-direction:row;flex-wrap:wrap >";
            msg += "\<div class=add_qos_item_ans data-id=1 >";
                msg += "\<a>问题1:</a>";
                msg += "\<input class=symbol_input style=width:100px;margin-left:10px; type=text onblur=blurAns(this) onfocus=fousAns(this) onkeydown=keyListener(event,this) />";
                msg += "\<div class=add_qos_item_ans_revise >";
                    /*msg += "\<img style=width:15px;height:15px; src=img/add_pic.png onclick=addAns(this) />";*/
                    msg += "\<img style=width:15px;height:15px; src=img/dele_pic.png onclick=deleAns(this) />";
                msg += "\</div>";
            msg += "\</div>";
        msg += "\</div>";
    msg += "\</div>";
    child.innerHTML = msg;
    down_content_parent.appendChild(child);
}
function deleQos(thisa){
    var parent = thisa.parentNode.parentNode.parentNode.parentNode;
    var child = thisa.parentNode.parentNode.parentNode;
    parent.removeChild(child);
}
function fousAns(thisa){
    var anwers = thisa.parentNode;
    anwers.style.border="1px solid #e2e2e2";
    var answer = anwers.getElementsByClassName('add_qos_item_ans_revise')[0];
    answer.style.display = 'flex';
}
function blurAns(thisa){

}
function hideOperateItems(thisa){
    var anwers = thisa.parentNode.parentNode;
    anwers.style.border="0px solid white";
    var answer = anwers.getElementsByClassName('add_qos_item_ans_revise')[0];
    answer.style.display = 'none';
}
function addAns(thisa){
    hideOperateItems(thisa);
    console.log("add ans");
}
function deleAns(thisa){
    var parent = thisa.parentNode.parentNode.parentNode;
    var child = thisa.parentNode.parentNode;
    if(parent.childNodes.length>1){
        parent.removeChild(child);
        for(var i=0;i<parent.childNodes.length;i++){
            var elementParent = parent.childNodes[i];
            elementParent.setAttribute("data-id",(i+1)+"");
            elementParent.childNodes[0].innerText = "问题"+(i+1)+":";
        }
    }
}
function ansClick(thisa){
    var anwers = thisa;
    anwers.style.border="0px solid white";
    var answer = anwers.getElementsByClassName('add_qos_item_ans_revise')[0];
    answer.style.display = 'none';
}

function keyListener(event,thisa){
    if (event.keyCode == 13 ||event.keyCode == 9 ){
        if(thisa.value.length > 0){
            var parent = thisa.parentNode.parentNode;
            var userIndex = thisa.parentNode.getAttribute("data-id");
            var index = parent.childNodes.length + 1;
            if(index - parseInt(userIndex) == 1){
                var child = document.createElement('div');
                child.setAttribute("class","add_qos_item_ans");
                child.setAttribute("data-id",index);
                var msg = "";
                msg += "\<a>问题"+index+":"+"\</a>";
                msg += "\<input class=symbol_input style=width:100px;margin-left:10px; type=text onblur=blurAns(this) onfocus=fousAns(this) onkeydown=keyListener(event,this) autofocus />";
                msg += "\<div class=add_qos_item_ans_revise >";
                msg += "\<img style=width:15px;height:15px; src=img/dele_pic.png onclick=deleAns(this) />";
                msg += "\</div>";
                child.innerHTML = msg;
                parent.appendChild(child);
            }
        }
    }
}
