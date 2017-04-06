var drugSum = "";
var drugNumber = ""
function parseBringOrder(result){
    var number = document.getElementById('number');
    number.innerText = result[0];
    var name = document.getElementById('name');
    name.innerText = result[1];
    var sex = document.getElementById('sex');
    sex.innerText = result[2];
    var telephone = document.getElementById('telephone');
    telephone.innerText = result[3];
    var address = document.getElementById('address');
    address.innerText = result[4];
      drugNumber = JSON.parse(result[5]);
    drugSum = drugNumber.length;
    var sum = document.getElementById('sum');
   sum.innerText = drugNumber.length;
}
