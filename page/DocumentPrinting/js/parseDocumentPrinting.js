function  parseSelectMessage(msg){
    var tableTitle = document.getElementsByClassName('tableTitle')[0];
    var orderNum = tableTitle.getElementsByTagName('span')[0];
    orderNum.innerHTML = msg[1];
    var patientName = tableTitle.getElementsByTagName('span')[1];
    patientName.innerHTML = msg[2];
    var patientSex = tableTitle.getElementsByTagName('span')[2];
    patientSex.innerHTML = msg[3];
    var telephone = tableTitle.getElementsByTagName('span')[3];
    telephone.innerHTML = msg[4];
    var sum = document.getElementById('sum');
    var aa = sum.getElementsByTagName('span')[0];
   aa.innerHTML = "¥"+msg[5];
}