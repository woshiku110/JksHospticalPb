var photo =""
//取出订单
function parsePatientTriage(newMessage){
    var AllContent = document.getElementsByClassName('content_left_content')[0];
    AllContent.style.display = 'block';
    var name = document.getElementById('p_name');
    var sex = document.getElementById('sex');
    var age= document.getElementById('age');
    var history= document.getElementById('history');
    var body= document.getElementById('body');
    var content= document.getElementById('content');
    var question= document.getElementsByClassName('content_left_content_question_1')[0];
    var bathDate = newMessage.csrq;
    var bathDate_1 = parseInt(bathDate);
    var time = new Date();
    var currentTime = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
    var currentTime_1 = parseInt(currentTime);
    var patientAge = currentTime_1- bathDate_1;
   var patientQuestion = JSON.parse(newMessage.qa);
    photo =  JSON.parse(newMessage.images);
    name.innerText  = newMessage.name;
    sex.innerText  = newMessage.sex;
    age.innerText  = patientAge;
    history.innerText  = newMessage.jwbs;
    body.innerText  = newMessage.partId;
    content.innerText  = newMessage.describe;
    console.log(patientQuestion[0].answers);
    console.log(patientQuestion[1]);
    var code="";
for(var a= 1,i=0;i<patientQuestion.length;i++,a++) {
    var answers = patientQuestion[i].answers;
    code += "\<ul>";
    code += "\<li>";
    code += a+"."+patientQuestion[i].question;
    for(var b=0;b<answers.length;b++){
        code += "\</li>"
        code += "\<a>";
        code += answers[b];
        code += "\</a><br>";
    }
    code += "\</ul>"
};
    //console.log(photo);
    question.innerHTML  = code;
    var picture = document.getElementsByClassName('content_left_content_picture_img')[0];
    var y ="";
    var picture_limit = document.getElementsByClassName('picture_limit')[0];
    var z = "";
    if(newMessage.tpxz==1){

    }else{
        z +="\<a>";
        z +="图片仅医生可见";
        z +="\</a>";
    }

    picture_limit.innerHTML = z;
    for(var b= 0;b<photo.length;b++){
        var pictureUrl ="http://192.168.0.202:8080/File/filebed/"+photo[b];
       // console.log(pictureUrl);
        y +="<div class=";
        y +="content_left_content_picture_img_picture";
        y +=">"
        y += "<img src=";
        y +=pictureUrl;
        y +=">"
        y +="\</div>"
    }
        picture.innerHTML = y;

}
//医生分配
function parseDoctorAssign(msg){
    var code ="";
    var aa = document.getElementsByClassName('content_right_content_message')[0];
    for(var i=0;i<msg.length;i++){
        var doctorTime = msg[i][0];
        //console.log(doctorTime);
        var changeDoctorTime = doctorTime.replace(/[^0-9]/mg, '').match(/.{8}/)+"";
        code += " <div class=";
        code += "content_right_content_message_1_head";
        code += ">";
        code += "\<a>";
        code += msg[i][0];
        code += "\</a>";
        code += "\ </div>";
        var  arr=JSON.parse(msg[i][1]);
        //console.log(arr);
        for(var j=0;j<arr.length;j++){
            var doctorId = arr[j][0];
            var pictureUrl ="http://192.168.0.202:8080/File/filebed/"+photo[j];
            code += " <div class=";
            code += "content_right_content_message_1";
            code += ">";
            code += " <div class=";
            code += "content_right_content_message_img";
            code += ">";
            code += pictureUrl[6];
            code += "\</div>";
            code += " <div class=";
            code += "content_right_content_message_name";
            code += ">";
            code += "<a class=";
            code += "content_right_content_message_name_1";
            code += ">";
            code += arr[j][1];
            code += "\</a>";
            code += "\<p>";
            code += arr[j][4];
            code += arr[j][3];
            code += arr[j][2];
            code += "\</p>";
            code += "\</div>";
            code += " <div class=";
            code += "content_right_content_message_work";
            code += ">";
            code += "\<p>";
            code += arr[j][5];
            code += "\</p>";
            code += "\</div>";
            code += " <div class=";
            code += "content_right_content_message_btn";
            code += ">";
            code += "<a class= private ";
            code += "onclick=";
            code += "distribute("+doctorId+","+changeDoctorTime+")";
            code += ">";
            code += "分配";
            code += "\</a>";
            code += "\</div>";
            code += "\</div>";
        }
    }
    aa.innerHTML = code;
}
//图片放大缩小
function Picture(){
    for(var i=0;i<photo.length;i++){
        var picture =document.getElementsByClassName('content_left_content_picture_img_picture')[i];
        var picture1 = picture.getElementsByTagName('img')[0];
        var imgH="", imgW="";
        picture1.index = 0;
        picture1.onclick =  function(){
            imgH =  this.width;
            imgW =  this.height;
            if(this.offsetWidth == 220){
                this.style.width = '110px';
                this.style.height = '110px';
            }else{
                for(var j=0; j<photo.length; j++){
                    var picture3 =document.getElementsByClassName('content_left_content_picture_img_picture')[j];
                    var picture4 = picture3.getElementsByTagName('img')[0];
                    if(picture4.offsetWidth = 220){
                        picture4.style.width = '110px';
                        picture4.style.height = '110px';
                    }
                }
                this.style.width = imgW*2+"px";
                this.style.height = imgH*2+"px";
            }
        }
    }
}
//重置
function reset(){
    var doctorName = document.getElementById('input_1').value = '';
    var department = document.getElementById('department').value = '';
    var ill = document.getElementById('ill').value = '';

}

