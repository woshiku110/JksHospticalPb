
function changeQueryInput(inputElement){
	if(typeof(inputElement)=="string")
		inputElement = document.getElementById(inputElement);
	if(inputElement.tagName!="INPUT")
		return;
	
	inputElement.addEventListener("focus",function(){
		
		var ul = document.createElement("ul");
		ul.style.position = "absolute";
		ul.style.top = tiger.offsetTop + tiger.offsetHeight +"px";
		ul.style.left = tiger.offsetLeft +"px";
		ul.style.width = tiger.offsetWidth + "px";
		
		inputElement.ul = ul;
		inputElement.offsetParent();
	});
	
	
	inputElement.addEventListener("blur",function(){
		console.log("blur");
	});
	
	
	inputElement.addEventListener("input",function(){
		console.log(inputElement.value);
	});
}