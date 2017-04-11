var dz =  _serverHome+"manage/PartManage_partAllList";
var data; // 后台给的数据
var div_ul = document.getElementsByClassName('div_ul'); //用它来表示每个部位的父级
var bigData = []; // 最后提交的数据ID
var bigDt="";//最后提交的数据文字
var xmlhttp;
if (window.XMLHttpRequest)
{
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
}
else
{
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        // console.log(JSON.parse(JSON.parse(xmlhttp.responseText).msg));
        data = JSON.parse(JSON.parse(xmlhttp.responseText).msg);
       // console.log(data);
        for(var s=0;s<2;s++){
            if(s===1){
                for(var i=0; i<data.length;i++){
                    var big_li = document.createElement("li");
                    var add=document.createAttribute("tag");
                    add.value=i;
                    big_li.setAttributeNode(add);
                    big_li.className='big_li';
                    div_ul[s].appendChild(big_li);
                    var div_ul_a = document.createElement("ul");
                    div_ul_a.className='div_ul_a';
                    big_li.appendChild(div_ul_a);
                    if(data[i][1]){
                        var big_li_a = document.createElement("li");
                        big_li_a.setAttribute("data-url",data[i][0]);
                        big_li_a.className='big_li_a';
                        big_li_a.style.fontSize='18px';
                        big_li_a.style.fontWeight="400";
                        big_li_a.style.display="none";
                        big_li_a.innerHTML= data[i][1];
                        div_ul_a.appendChild(big_li_a);
                    }
                    var da = JSON.parse(data[i][2]);
                    for(var f=0; f<da.length;f++){
                        var big_li_a = document.createElement("li");
                        var att=document.createAttribute("tag");
                        att.value=f;
                        big_li_a.setAttribute("data-url",da[f][0]);
                        big_li_a.setAttributeNode(att);
                        big_li_a.className='big_li_b';
                        big_li_a.style.fontSize='18px';
                        big_li_a.style.width='100%';
                        big_li_a.style.display="none";
                        big_li_a.style.textAlign='center';
                        big_li_a.innerHTML= da[f][1];
                        div_ul_a.appendChild(big_li_a);
                    }
                }
            }else{
                for(var i=0; i<data.length;i++){
                    var big_li = document.createElement("li");
                    var add=document.createAttribute("tag");
                    add.value=i;
                    big_li.setAttributeNode(add);
                    big_li.className='big_li';
                    div_ul[s].appendChild(big_li);
                    var div_ul_a = document.createElement("ul");
                    div_ul_a.className='div_ul_a';
                    big_li.appendChild(div_ul_a);
                    if(data[i][1]){
                        var big_li_a = document.createElement("li");
                        big_li_a.setAttribute("data-url",data[i][0]);
                        big_li_a.className='big_li_a';
                        big_li_a.style.fontSize='18px';
                        big_li_a.style.fontWeight="400";
                        big_li_a.innerHTML= data[i][1];
                        div_ul_a.appendChild(big_li_a);
                    }
                    var da = JSON.parse(data[i][2]);
                    for(var f=0; f<da.length;f++){
                        var big_li_a = document.createElement("li");
                        var att=document.createAttribute("tag");
                        att.value=f;
                        big_li_a.setAttribute("data-url",da[f][0]);
                        big_li_a.setAttributeNode(att);
                        big_li_a.className='big_li_b';
                        big_li_a.style.fontSize='18px';
                        big_li_a.style.width='100%';
                        big_li_a.style.textAlign='center';
                        big_li_a.innerHTML= da[f][1];
                        div_ul_a.appendChild(big_li_a);
                    }
                }
            }
        }
        // 点击左侧的 big_li_b
        $(".div_a_a .big_li_b").on('click',function(){
            var this_tag = $(this).attr('tag');//当前的节点
            var p_tag = $(this).parent().parent().attr('tag');//当前的父级的父级节点
            var p_page = $(this).parent().find('.big_li_b').length;//获取当前所处的M_main里有几个M_content
            $(this).hide();
            $('.div_a_c .big_li').eq(p_tag).show();
            $('.div_a_c .big_li').eq(p_tag).find('.big_li_a').show();
            $('.div_a_c .big_li').eq(p_tag).find('.big_li_b').eq(this_tag).show();
            $(this).parent().parent().each(function(){
                var num_legth = $(this).find('li').length-1;
                var hide_legth = $(this).find('li:hidden').length;
                if(hide_legth == num_legth){
                    $(this).hide();
                    $(this).find('.big_li_a').hide();
                }
            });
        });
        // 点击右侧的 big_li_b
        $(".div_a_c .big_li_b").on('click',function(){
            var this_tag = $(this).attr('tag');//当前的节点
            var p_tag = $(this).parent().parent().attr('tag');//当前的父级的父级节点
            var p_page = $(this).parent().find('.big_li_b').length;//获取当前所处的M_main里有几个M_content
            // console.log(this_tag);
            // console.log(p_tag);
            // console.log(p_page);
            $(this).hide();
            $('.div_a_a .big_li').eq(p_tag).show();
            $('.div_a_a .big_li').eq(p_tag).find('.big_li_a').show();
            $('.div_a_a .big_li').eq(p_tag).find('.big_li_b').eq(this_tag).show();
            $(this).parent().parent().each(function(){
                var num_legth = $(this).find('li').length-1;
                // console.log('所在的 big_li 下的 li 节点数：'+num_legth);
                var hide_legth = $(this).find('li:hidden').length;
                // console.log('所在的 big_li 中的有隐藏的子节点数：'+hide_legth);
                if(hide_legth == num_legth){
                    // console.log(true)
                    $(this).hide();
                    $(this).find('.big_li_a').hide();
                }
            });
        });
        // 点击左侧的 big_li_a
        $('.div_a_a .big_li_a').on('click',function(){
            $(this).hide();
            $(this).parent().parent().hide();
            $(this).parent().parent().find('.big_li_b').hide();
            var p_tag = $(this).parent().parent().attr('tag');//当前的父级的节点
            // console.log(p_tag)
            $('.div_a_c .big_li').eq(p_tag).show();
            $('.div_a_c .big_li').eq(p_tag).find('.big_li_a').show();
            $('.div_a_c .big_li').eq(p_tag).find('.big_li_b').show();
        });
        // 点击右侧的 big_li_a
        $('.div_a_c .big_li_a').on('click',function(){
            $(this).hide();
            $(this).parent().parent().hide();
            $(this).parent().parent().find('.big_li_b').hide();
            var p_tag = $(this).parent().parent().attr('tag');//当前的父级的节点
            $('.div_a_a .big_li').eq(p_tag).show();
            $('.div_a_a .big_li').eq(p_tag).find('.big_li_a').show();
            $('.div_a_a .big_li').eq(p_tag).find('.big_li_b').show();
        });
        // 点击大于号的Button
        $('.div_a_b_buta').click(function(){
            $('.div_a_a .big_li').hide();
            $('.div_a_a .big_li_a').hide();
            $('.div_a_a .big_li_b').hide();
            $('.div_a_c .big_li').show();
            $('.div_a_c .big_li_a').show();
            $('.div_a_c .big_li_b').show();
        });
        // 点击小于号的Button
        $('.div_a_b_butb').click(function(){
            $('.div_a_c .big_li').hide();
            $('.div_a_c .big_li_a').hide();
            $('.div_a_c .big_li_b').hide();
            $('.div_a_a .big_li').show();
            $('.div_a_a .big_li_a').show();
            $('.div_a_a .big_li_b').show();
        });
        // 确定按钮  div_b_buta
        var text=document.getElementById('text');
        $('.div_b_buta').click(function(){
            var c_li = $('.div_a_c .big_li').find('.big_li_b:visible');
            text.value="";
                if(c_li.length==1){
                    bigDt =c_li[0].innerText;
                    bigData[0] = c_li[0].getAttribute("data-url");
                    text.value=bigDt;
                }else{
                    bigDt="";
                    for(var i=0; i<c_li.length;i++) {
                        bigData[i] = c_li[i].getAttribute("data-url");
                        bigDt += c_li[i].innerText + ";";
                    }
                    text.value = bigDt;
                }
            $('.middle').slideUp(300);
        });
        // 取消按钮  div_b_butb
        $('.div_b_butb').click(function(){
            $('.middle').slideUp(300);
        });
    }
}
xmlhttp.open("POST",dz,true);
xmlhttp.send();

function finishSubmit(){
    ajaxFileUpload();
    var up_left_1 = document.getElementsByClassName('up_left_1')[0];
    var symptomName = up_left_1.getElementsByTagName('input')[0];
    var symptomNameValue = symptomName.value;
    var bodyLocation = document.getElementById('text').value;
    var down_content_question = document.getElementsByClassName('down_content_question');
    var inputValue="";
    var fixBox="";//多选框
    var AllAnswerList = [];//所有答案集合
    for(var i=0;i<down_content_question.length;i++){
        var answerList = [];//答案集合
        var questionList=[];//问题集合
        if(document.getElementsByClassName('dOm')[i].value.trim()=="单选"){
            fixBox=1;
        }else{
            fixBox=2;
        }
        answerList[0]=fixBox;
        var input = down_content_question[i].getElementsByTagName('input');
        answerList[1] =input[0].value.trim();
        for(var f=1; f<input.length;f++){
            if(input[f].value.trim()!==""){
                questionList[f-1] = input[f].value.trim();
            }
        }
        answerList[2]=JSON.stringify(questionList);
        AllAnswerList[i] = answerList;
    }
    var dataListStr = JSON.stringify(AllAnswerList);
    var partListStr = JSON.stringify(bigData);
    UrlLoad("manage/PartManage_addSymptom",
        {
            "name": symptomNameValue,
            "pic":pictureName,
            "part": partListStr,
            "question":dataListStr
        },
        function(isSucc,result){
            if(isSucc){
                console.log("sucess");
                console.log(result);
            }else{
                console.log("fail");
                console.log(result);
            }
        });
}
function UrlLoad(url,data,callback){
    $.ajax({
       url:_serverHome + url,
        type: 'post',
        dataType:'json',
        async:false,
        data:data,
        success: function(res) {
            callback(true,res);
        },
        error:function(res){
            callback(false,res);
        }
    });
}